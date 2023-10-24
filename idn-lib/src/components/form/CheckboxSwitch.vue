<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
    checked: boolean;
    disabled?: boolean;
    value?: string;
    id: string;
}>();

const emit = defineEmits(["change", "focus", "blur"]);

const checkboxRef = ref<HTMLElement | null>(null);
</script>

<template>
    <input
        type="checkbox"
        :id="props.id"
        :name="props.id"
        :value="props.value || null"
        :checked="props.checked"
        :disabled="props.disabled"
        @change="emit('change', $event)"
        hidden
        ref="checkboxRef"
    />
    <div
        :class="`switch ${props.checked ? 'checked' : ''} ${props.disabled ? 'disabled' : ''}`"
        @click="(checkboxRef && !props.disabled) ? checkboxRef.click() : undefined"
        :tabindex="!props.disabled ? '0' : undefined"
        @focus="emit('focus')"
        @blur="emit('blur')"
    >
        <div class="switch-circle"></div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";

$radius: 16px;
$width: 42px;
$height: 22px;
$padding: 4px;
$bgUnchecked: #cacaca;
$bgChecked: $primary;
$circleUnchecked: lighten($bgUnchecked, 17%);
$circleChecked: white;

$transitionDuration: 0.1s;
$transitionTiming: ease-in-out;

.switch {
    background-color: $bgUnchecked;
    border-radius: $radius;
    width: $width;
    height: $height;
    padding: $padding;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    transition: background-color $transitionDuration $transitionTiming;

    .switch-circle {
        height: 100%;
        aspect-ratio: 1;
        background-color: $circleUnchecked;
        border-radius: 50%;
        margin-left: 0;
        transition: background-color $transitionDuration $transitionTiming, margin-left $transitionDuration $transitionTiming;
    }

    &.checked {
        background-color: $bgChecked;

        .switch-circle {
            background-color: $circleChecked;
            margin-left: calc(100% - #{$height} + 2 * #{$padding});
        }
    }

    &.disabled {
        cursor: default;
        opacity: 0.6;
    }    
}
</style>