<script setup>
import { ref, computed, watch, onMounted } from "vue";

const props = defineProps({
    modelValue: {
        type: [String, Array],
        required: true
    },
    label: {
        type: String,
        required: true
    },
    options: { // [{label: "", value: ""}, ...]
        type: Array,
        required: true
    },
    placeholder: String,
    multiple: Boolean,
    chips: Boolean,
    searchable: Boolean,
    disabled: Boolean,
    id: String,
    required: Boolean,
    validationFns: Array,
    allowAdd: Boolean
});

const emit = defineEmits(["update:modelValue", "blur", "focus", "validate", "float"]);

const searchTerm = ref("");
// const selected = ref(props.multiple ? [] : "");
const inFocus = ref(false);
const componentRef = ref(null);
const searchRef = ref(null);
const customOptions = ref([]);

const optionsArray = computed(() => {
    return props.options.concat(customOptions.value);
});

const labelFloat = computed(() => {
    // cater for placeholder
    if (props.multiple && props.modelValue.length > 0) {
        return true;
    } else if (!props.multiple && props.modelValue !== "") {
        return true;
    } else {
        return false;
    }
});

emit("float", labelFloat.value);

watch(labelFloat, (newValue) => {
    emit("float", newValue);
});

watch(() => props.modelValue, (newValue, oldValue) => {
    if (newValue !== "" && newValue !== oldValue) {
        if (!props.options.map(option => option.value).includes(newValue) && props.allowAdd) {
            addOption(newValue);
        }
    }
});

function updateValue(e) {
    emit("update:modelValue", e);
}

function clearValue() {
    searchTerm.value = "";
    emit("update:modelValue", props.multiple ? [] : "");
    emit("validate", []);
}

function validate() {
    let validationMessages = [];
    if (props.required && (props.multiple ? props.modelValue.length === 0 : props.modelValue === "")) {
        validationMessages.push(`${props.label} must not be empty.`);
    }

    // component-specific validation
    
    // run array of validation functions
    if (props.validationFns) {
        props.validationFns.forEach(func => {
            const [valid, message] = func(props.modelValue);
            if (!valid) {
                validationMessages.push(message);
            }
        });
    }

    emit("validate", validationMessages);
}

const filteredOptions = computed(() => {
    return optionsArray.value.filter(option => option.label.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

const chips = computed(() => {
    if (props.chips && props.multiple) {
        return optionsArray.value.filter(option => props.modelValue.includes(option.value));
    } else {
        return null;
    }
});

const displayValue = computed(() => {
    if (props.multiple) {
        if (props.modelValue.length > 0) {
            return optionsArray.value.filter(option => props.modelValue.includes(option.value)).map(option => option.label).join(", ");
        } else {
            return "";
        }
    } else {
        let selectedOption = optionsArray.value.find(option => option.value === props.modelValue);
        if (selectedOption) {
            return selectedOption.label;
        } else {
            return "";
        }
    }
});

function clickOption(option) {
    if (props.multiple) {
        let selected = [...props.modelValue];
        if (selected.includes(option.value)) {
            const index = selected.indexOf(option.value);
            selected.splice(index, 1);
        } else {
            selected.push(option.value);
        }
        updateValue(selected);
    } else {
        updateValue(option.value);
    }
}

function addOption(val = searchTerm.value) {
    let option = {
        value: val,
        label: val
    };
    customOptions.value.push(option);
    clickOption(option);
}

function isSelected(option) {
    if (props.multiple) {
        return props.modelValue.includes(option.value);
    } else {
        return props.modelValue === option.value;
    }
}

function focus() {
    if (!props.disabled) {
        inFocus.value = true;
        if (props.searchable) {
            searchRef.value.focus();
        } else {
            componentRef.value.focus();
        }
        emit("focus");
    }
}

function blur(e) {
    if (!componentRef.value.contains(e.relatedTarget)) {
        inFocus.value = false;
        validate();
        emit("blur");
    }
}

function removeChip(option) {
    let selected = [...props.modelValue];
    const index = selected.indexOf(option.value);
    selected.splice(index, 1);
    updateValue(selected);
}

onMounted(() => {
    if (!props.options.map(option => option.value).includes(props.modelValue) && props.allowAdd) {
        addOption(props.modelValue);
    }
});

defineExpose({ clearValue, focus });
</script>

<template>
    <div
        class="combobox"
        :tabindex="!props.disabled ? 0 : null"
        @focus="focus"
        @blur="blur"
        @keyup.esc="blur($event, true)"
        :id="props.id"
        ref="componentRef"
    >
        <div class="select-row">
            <div class="select-value">
                <template v-if="props.chips && props.multiple">
                    <div v-for="chip in chips" class="chip">
                        {{ chip.label }}
                        <button class="chip-remove-btn" @click="removeChip(chip)"><i class="fa-regular fa-xmark"></i></button>
                    </div>
                </template>
                <template v-else>{{ displayValue }}</template>
            </div>
            <span class="input-chevron"><i :class="`fa-regular fa-chevron-${inFocus ? 'up' : 'down'}`"></i></span>
        </div>
        <div :class="`select-dropdown ${inFocus ? '' : 'collapse'}`">
            <div v-if="props.searchable" class="search-input">
                <input
                    type="text"
                    v-model="searchTerm"
                    ref="searchRef"
                    placeholder="Search"
                    :disabled="props.disabled"
                    @blur="blur"
                    @keyup.esc="blur"
                    @keypress.enter="filteredOptions.length > 0 ? clickOption(filteredOptions[0]) : (props.allowAdd ? addOption() : null)"
                />
                <button
                    class="search-clear-btn"
                    @click="searchTerm = ''"
                    :disabled="props.disabled"
                    @blur="blur"
                    @keyup.esc="blur($event, true)"
                >
                    <i class="fa-regular fa-xmark"></i>
                </button>
            </div>
            <div class="option-list">
                <template v-if="filteredOptions.length > 0">
                    <div
                        v-for="(option, index) in filteredOptions"
                        :value="option.value"
                        @click="clickOption(option)"
                        @keypress.enter="clickOption(option)"
                        :class="`option ${isSelected(option) ? 'selected' : ''} ${searchTerm && index === 0 ? 'active' : ''}`"
                        tabindex="0"
                        @blur="blur"
                        @keyup.esc="blur($event, true)"
                    >
                        <span v-if="props.multiple" class="option-check">
                            <i :class="`fa-regular fa-square${isSelected(option) ? '-check' : ''}`"></i>
                        </span>
                        {{ option.label }}
                    </div>
                </template>
                <template v-else-if="props.searchable">
                    <div class="no-results">No results found</div>
                    <div
                        v-if="props.allowAdd"
                        @click="addOption"
                        @keypress.enter="addOption"
                        class="option active"
                        tabindex="0"
                        @blur="blur"
                        @keyup.esc="blur($event, true)"
                    >
                        + Add option
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";
@import "@/assets/sass/_mixins.scss";

$inputBg: #f7f7f7;

.combobox {
    display: flex;
    flex-direction: column;
    // position: relative;
    cursor: default;

    .select-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        // position: relative;

        .select-value {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 6px;
            flex-grow: 1;
            font-size: 0.833em;
            min-height: 16px;

            .chip {
                border-radius: $borderRadius;
                background-color: $primary;
                color: white;
                padding: 2px 4px;
                font-size: 0.7rem;

                button.chip-remove-btn {
                    font-size: 0.7rem;
                    background-color: transparent;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
            }
        }

        .input-chevron {
            font-size: 0.833em;
            position: absolute;
            top: 50%;
            right: 6px;
            transform: translateY(-50%);
        }
    }

    .search-input {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: $inputBg;
        border-bottom: 1px solid #c4c4c4;

        input {
            border: none;
            flex-grow: 1;
            outline: none;
            padding: 6px 8px;
            background-color: transparent;
        }

        button.search-clear-btn {
            padding: 6px 8px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            color: grey;
            @include transition(color);

            &:hover {
                color: black;
            }
        }
    }

    .select-dropdown {
        display: flex;
        flex-direction: column;
        max-height: 200px;
        box-shadow: 0px 0px 6px 2px rgba($color: #c1c1c1, $alpha: 0.4);
        position: absolute;
        top: 100%;
        width: 100%;
        z-index: 9999;
        background-color: #f3f3f3;
        // height: auto;
        overflow: hidden;

        &.collapse {
            height: 0;
            box-shadow: none;
        }

        .option-list {
            display: flex;
            flex-direction: column;
            overflow-y: auto;

            .option {
                cursor: pointer;
                padding: 8px;
                display: flex;
                flex-direction: row;
                gap: 8px;
                align-items: center;
                border: 1px solid transparent;
                @include transition(background-color, color);

                &.selected {
                    background-color: $primary;
                    color: white;
                }

                &:not(.selected):hover {
                    background-color: #e3e3e3;
                }

                &.active, &:focus {
                    border-color: $primary;
                    outline: none;
                }

                .option-check {
                    padding: 4px;

                    & > i {
                        pointer-events: none; // fixes Fontawesome icons breaking click events on parent (uses ::before)
                    }
                }
            }

            .no-results {
                padding: 8px;
                color: grey;
                background-color: #f9f9f9;
            }
        }
    }
}
</style>