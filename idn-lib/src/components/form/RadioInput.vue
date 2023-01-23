<script setup>
const props = defineProps({
    modelValue: {
        type: String,
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
    clearButton: Boolean,
    disabled: Boolean,
    id: String,
    validationFns: Array,
    required: Boolean,
    invalidMessages: Array,
});

const emit = defineEmits(["update:modelValue", "blur", "validate"]);

function updateValue(e) {
    emit("update:modelValue", e.target.value);
}

function validate() {
    let validationMessages = [];
    if (props.required && props.modelValue === "") {
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