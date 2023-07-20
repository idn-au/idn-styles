<script lang="ts" setup>
import { CheckBoxInputProps } from "../../types";
import CheckboxSwitch from "./CheckboxSwitch.vue";

const props = defineProps<CheckBoxInputProps>();

const emit = defineEmits(["update:modelValue", "blur", "validate"]);

function updateValue(e: Event) {
    const target = e.target as HTMLInputElement;
    if (props.multiple && Array.isArray(props.modelValue)) {
        let selected = [...props.modelValue];
        if (selected.includes(target.value)) {
            const index = selected.indexOf(target.value);
            selected.splice(index, 1);
        } else {
            selected.push(target.value);
        }
        emit("update:modelValue", selected);
    } else {
        emit("update:modelValue", target.checked);
    }
}

function checkAll() {
    if (props.multiple && Array.isArray(props.modelValue) && props.options) {
        if (props.modelValue.length < props.options.length) {
            emit("update:modelValue", props.options.map(option => option.value));
        } else {
            emit("update:modelValue", []);
        }
    }
}

async function validate() {
    let validationMessages = [];
    if (props.required && (props.multiple && Array.isArray(props.modelValue) ? props.modelValue.length === 0 : !props.modelValue)) {
        validationMessages.push(`${props.label} must not be empty.`);
    }

    // component-specific validation
    
    // run array of validation functions
    if (props.validationFns) {
        for (const func of props.validationFns) {
            // validation functions are now always async
            const result = await func(props.modelValue);
            if (!result.valid) {
                validationMessages.push(result.invalidMessage);
            }
        }
    }

    emit("validate", validationMessages);
}
</script>

<template>
    <div v-if="props.multiple && Array.isArray(props.modelValue) && props.options" class="check-multiple">
        <label>{{ props.label }} <span v-if="props.required === true" class="required">*</span></label>
        <div v-if="props.clearButton" class="check-all check-row">
            <CheckboxSwitch
                v-if="props.switch"
                :id="props.id + '-clear'"
                :checked="props.modelValue.length === props.options.length"
                :disabled="props.disabled"
                @change="checkAll"
                @blur="validate(); emit('blur')"
            />
            <input
                v-else
                type="checkbox"
                :id="props.id + '-clear'"
                :name="props.id + '-clear'"
                :checked="props.modelValue.length === props.options.length"
                :disabled="props.disabled"
                @change="checkAll"
                @blur="validate(); emit('blur')"
            />
            <label :for="props.id + '-clear'">Check all</label>
        </div>
        <div :class="`check-group direction-${props.direction}`">
            <div v-for="(option, index) in props.options" class="check-row">
                <label v-if="props.switch && option.leftLabel" :for="props.id + index">{{ option.leftLabel }}</label>
                <CheckboxSwitch
                    v-if="props.switch"
                    :id="props.id + index"
                    :value="option.value"
                    :checked="props.modelValue.includes(option.value)"
                    :disabled="props.disabled"
                    @change="updateValue"
                    @blur="validate(); emit('blur')"
                />
                <input
                    v-else
                    type="checkbox"
                    :id="props.id + index"
                    :name="props.id + index"
                    :value="option.value"
                    :checked="props.modelValue.includes(option.value)"
                    :disabled="props.disabled"
                    @change="updateValue"
                    @blur="validate(); emit('blur')"
                />
                <label v-if="props.switch && option.rightLabel" :for="props.id + index">{{ option.rightLabel }}</label>
                <label v-else :for="props.id + index">{{ option.label }}</label>
            </div>
        </div>
    </div>
    <div v-else class="check-row">
        <label v-if="props.switch && props.leftLabel" :for="props.id">{{ props.leftLabel }}</label>
        <CheckboxSwitch
            v-if="props.switch"
            :id="props.id"
            :checked="(props.modelValue as boolean)"
            :disabled="props.disabled"
            @change="updateValue"
            @blur="validate(); emit('blur')"
        />
        <input
            v-else
            type="checkbox"
            :checked="props.modelValue"
            @change="updateValue"
            :disabled="props.disabled"
            :id="props.id"
            :name="props.id"
            :required="props.required"
            @blur="validate(); emit('blur')"
        />
        <label v-if="props.switch && props.rightLabel" :for="props.id">{{ props.rightLabel }} <span v-if="props.required === true" class="required">*</span></label>
        <label v-else :for="props.id">{{ props.label }} <span v-if="props.required === true" class="required">*</span></label>
    </div>
</template>

<style lang="scss" scoped>
// .check-all {
//     margin-bottom: 4px;
// }

.check-row {
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
}

.check-multiple {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .check-group {
        margin-left: 8px;

        &.direction-column {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        &.direction-row {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 12px;

            // justify-content: flex-start;

            // & > .check-row {
            //     flex: 1;
            // }

            // display: grid;
            // gap: 6px;
            // grid-template-columns: repeat(auto-fit, minmax(100px, auto));
            // grid-template-columns: repeat(auto-fit, minmax(min-content, auto));
        }
    }
}

.required {
    color: red;
}
</style>