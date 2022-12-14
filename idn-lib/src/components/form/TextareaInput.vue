<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    label: String,
    placeholder: String,
    disabled: Boolean,
    id: String,
    required: Boolean,
    validation: Array
});

const emit = defineEmits(["update:modelValue", "blur", "focus", "validate", "float"]);

const inFocus = ref(false);
const componentRef = ref(null);

const labelFloat = computed(() => {
    if (inFocus.value) {
        return true;
    } else if (props.modelValue !== "") {
        return true;
    } else {
        return false;
    }
});

emit("float", labelFloat.value);

watch(labelFloat, (newValue) => {
    emit("float", newValue);
});

function updateValue(e) {
    emit("update:modelValue", e.target.value);
}

function clearValue() {
    emit("update:modelValue", "");
    emit("validate", []);
}

function validate() {
    let validationMessages = [];
    if (props.required && props.modelValue === "") {
        validationMessages.push(`${props.label} must not be empty.`);
    }

    // component-specific validation
    
    // run array of validation functions
    if (props.validation) {
        props.validation.forEach(func => {
            const [valid, message] = func(props.modelValue);
            if (!valid) {
                validationMessages.push(message);
            }
        });
    }

    emit("validate", validationMessages);
}

function focus() {
    inFocus.value = true;
    componentRef.value.focus();
    emit("focus");
}

defineExpose({ clearValue, focus });
</script>

<template>
    <textarea
        :value="props.modelValue"
        @input="updateValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :id="props.id"
        :name="props.id"
        :required="props.required"
        @blur="inFocus = false; validate(); emit('blur')"
        @focus="inFocus = true; emit('focus')"
        ref="componentRef"
    ></textarea>
</template>

<style lang="scss" scoped>
textarea {
    resize: vertical;
}
</style>