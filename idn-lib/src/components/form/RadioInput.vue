<script lang="ts" setup>
import { RadioInputProps } from "../../types";

const props = defineProps<RadioInputProps>();

const emit = defineEmits(["update:modelValue", "blur", "validate"]);

function updateValue(e: Event) {
    emit("update:modelValue", (e.target as HTMLInputElement).value);
}

async function validate() {
    let validationMessages = [];
    if (props.required && props.modelValue === "") {
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
    <div>
        <label>{{ props.label }} <span v-if="props.required === true" class="required">*</span></label>
        <button v-if="props.clearButton" class="clear-btn" @click="emit('update:modelValue', '')">Clear</button>
        <div v-for="(option, index) in props.options">
            <input
                type="radio"
                :id="props.id + index"
                :name="props.id"
                :value="option.value"
                :checked="props.modelValue === option.value"
                :disabled="props.disabled"
                @change="updateValue"
                @blur="validate(); emit('blur')"
            />
            <label :for="props.id + index">{{ option.label }}</label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
button.clear-btn {
    margin-bottom: 8px;
}

.required {
    color: red;
}
</style>