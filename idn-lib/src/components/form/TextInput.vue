<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { TextInputProps } from "../../types";

const props = defineProps<TextInputProps>();

const emit = defineEmits(["update:modelValue", "blur", "focus", "validate", "float"]);

const inFocus = ref(false);
const componentRef = ref<HTMLElement | null>(null);

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

function updateValue(e: Event) {
    emit("update:modelValue", (e.target as HTMLInputElement).value);
}

function clearValue() {
    emit("update:modelValue", "");
    emit("validate", []);
}

async function validate() {
    let validationMessages = [];
    if (props.required && props.modelValue === "") {
        validationMessages.push(`${props.label} must not be empty.`);
    }

    // component-specific validation (e.g. email, url)
    
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

function focus() {
    if (componentRef.value) {
        inFocus.value = true;
        componentRef.value.focus();
        emit("focus");
    }
}

defineExpose({ clearValue, focus });
</script>

<template>
    <input
        :type="props.type"
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
    />
</template>

<style lang="scss" scoped>

</style>