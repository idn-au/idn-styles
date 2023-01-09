<script setup>
import CheckboxSwitch from "@/components/form/CheckboxSwitch.vue";

const props = defineProps({
    modelValue: { // Boolean or ["value1", "value2"]
        required: true
    },
    options: Array, // [{label: "", value: ""}, ...] or [{leftLabel: "", rightLabel: "", value: ""}, ...] for switch multiple
    multiple: Boolean,
    switch: Boolean,
    label: String,
    leftLabel: String, // for switch
    rightLabel: String, // for switch
    disabled: Boolean,
    clearButton: Boolean, // multiple only - check all
    id: String,
    required: Boolean,
    invalidMessages: Array,
    direction: { // for multiple
        type: String,
        default: "column"
    }
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(e) {
    if (props.multiple) {
        let selected = [...props.modelValue];
        if (selected.includes(e.target.value)) {
            const index = selected.indexOf(e.target.value);
            selected.splice(index, 1);
        } else {
            selected.push(e.target.value);
        }
        emit("update:modelValue", selected);
    } else {
        emit("update:modelValue", e.target.checked);
    }
}

function checkAll() {
    if (props.modelValue.length < props.options.length) {
        emit("update:modelValue", props.options.map(option => option.value));
    } else {
        emit("update:modelValue", []);
    }
}
</script>

<template>
    <div v-if="props.multiple" class="check-multiple">
        <label>{{ props.label }} <span v-if="props.required === true" class="required">*</span></label>
        <div v-if="props.clearButton" class="check-all check-row">
            <CheckboxSwitch
                v-if="props.switch"
                :id="props.id + '-clear'"
                :checked="props.modelValue.length === props.options.length"
                :disabled="props.disabled"
                @change="checkAll"
            />
            <input
                v-else
                type="checkbox"
                :id="props.id + '-clear'"
                :name="props.id + '-clear'"
                :checked="props.modelValue.length === props.options.length"
                :disabled="props.disabled"
                @change="checkAll"
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
            :checked="props.modelValue"
            :disabled="props.disabled"
            @change="updateValue"
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
            :hidden="props.switch"
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