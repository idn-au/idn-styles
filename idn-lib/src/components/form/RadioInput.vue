<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    label: String,
    options: Array, // [{label: "", value: ""}, ...]
    clearButton: Boolean,
    disabled: Boolean,
    id: String,
    required: Boolean,
    invalidMessages: Array,
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(e) {
    emit("update:modelValue", e.target.value);
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