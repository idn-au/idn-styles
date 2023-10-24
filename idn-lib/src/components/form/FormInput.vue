<script lang="ts" setup>
import { computed, ref, useSlots, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import type { CheckBoxInputProps, TextInputProps, SelectInputProps, RadioInputProps, TextareaInputProps, DateInputProps, FormInputProps } from "../../types";
import SelectInput from "./SelectInput.vue";
import CheckboxInput from "./CheckboxInput.vue";
import RadioInput from "./RadioInput.vue";
import TextareaInput from "./TextareaInput.vue";
import DateInput from "./DateInput.vue";
import TextInput from "./TextInput.vue";
import ToolTip from "../ToolTip.vue";

const props = defineProps<FormInputProps>();

const slots = useSlots();

const emit = defineEmits(["update:modelValue", "blur", "validate"]);

const inFocus = ref(false);
const inputRef = ref<typeof CheckboxInput | typeof SelectInput | typeof RadioInput | typeof TextareaInput | typeof DateInput | typeof TextInput | null>(null);
const labelFloat = ref(props.type.startsWith("date"));
const validationMessages = ref<string[]>([]);

const invalid = computed(() => {
    return validationMessages.value.length > 0;
});

// text-like: text, email, select, textarea, etc.
// list-like: radio, checkbox
const textLike = computed(() => {
    return [
        "button",
        "color",
        "date",
        "datetime-local",
        "date-optional",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "range",
        "reset",
        "search",
        "select",
        "submit",
        "tel",
        "text",
        "textarea",
        "time",
        "url",
        "week"
    ].includes(props.type);
});

const calcPlaceholder = computed(() => {
    if (props.type === "select") {
        if (props.modelValue === "" || props.modelValue.length === 0) {
            return props.placeholder;
        } else {
            return undefined;
        }
    } else { // text
        if (inFocus.value && props.modelValue === '' && textLike) {
            return props.placeholder;
        } else {
            return undefined;
        }
    }
});

function validate(msgs: string[]) {
    validationMessages.value = msgs;
    emit("validate", msgs.length === 0);
}

onMounted(() => {
    if (props.required) {
        switch (typeof props.modelValue) {
            case "string":
                emit("validate", props.modelValue !== "");
                return;
            case "boolean":
                emit("validate", props.modelValue);
                return;
            case "object":
                if (Array.isArray(props.modelValue)) {
                    emit("validate", props.modelValue.length > 0);
                }
                return;
        }
    }
})
</script>

<template>
    <div class="form-input">
        <div :class="`input-row ${textLike ? 'text-like' : 'list-like' }`">
            <slot name="before"></slot>
            <div :class="`form-input-content ${inFocus ? 'focus' : ''} ${invalid ? 'invalid' : ''} ${props.disabled ? 'disabled' : ''}`">
                <div v-if="slots.prepend" class="input-prepend">
                    <slot name="prepend"></slot>
                </div>
                <div :class="`input-item ${!!slots.prepend ? '' : 'radius-left'} ${!!slots.append ? '' : 'radius-right'}`">
                    <label
                        v-if="textLike"
                        :class="`input-label ${labelFloat ? 'float' : ''} ${props.type === 'select' ? 'no-cursor' : ''}`"
                        :for="props.id"
                        @click="(inputRef && !props.disabled) ? inputRef.focus() : null"
                    >
                        {{ props.label }}
                        <span v-if="props.required" class="required">*</span>
                    </label>
                    <SelectInput
                        v-if="props.type === 'select'"
                        class="input-component"
                        v-bind="(props as SelectInputProps)"
                        ref="inputRef"
                        @update:modelValue="emit('update:modelValue', $event)"
                        @blur="inFocus = false"
                        @focus="inFocus = true"
                        @validate="validate($event)"
                        @float="labelFloat = $event"
                        :placeholder="calcPlaceholder"
                    />
                    <CheckboxInput
                        v-else-if="props.type === 'checkbox'"
                        class="input-component"
                        v-bind="(props as CheckBoxInputProps)"
                        ref="inputRef"
                        @update:modelValue="emit('update:modelValue', $event)"
                        @blur="inFocus = false"
                        @focus="inFocus = true"
                        @validate="validate($event)"
                    />
                    <RadioInput
                        v-else-if="props.type === 'radio'"
                        class="input-component"
                        v-bind="(props as RadioInputProps)"
                        ref="inputRef"
                        @update:modelValue="emit('update:modelValue', $event)"
                        @blur="inFocus = false"
                        @focus="inFocus = true"
                        @validate="validate($event)"
                    />
                    <TextareaInput
                        v-else-if="props.type === 'textarea'"
                        class="input-component"
                        v-bind="(props as TextareaInputProps)"
                        ref="inputRef"
                        @update:modelValue="emit('update:modelValue', $event)"
                        @blur="inFocus = false"
                        @focus="inFocus = true"
                        @validate="validate($event)"
                        @float="labelFloat = $event"
                        :placeholder="calcPlaceholder"
                    />
                    <DateInput
                        v-else-if="['date', 'date-optional', 'datetime-local', 'month', 'time', 'week'].includes(props.type)"
                        class="input-component"
                        v-bind="(props as DateInputProps)"
                        ref="inputRef"
                        @update:modelValue="emit('update:modelValue', $event)"
                        @blur="inFocus = false"
                        @focus="inFocus = true"
                        @validate="validate($event)"
                    />
                    <TextInput
                        v-else
                        class="input-component"
                        v-bind="(props as TextInputProps)"
                        ref="inputRef"
                        @update:modelValue="emit('update:modelValue', $event)"
                        @blur="inFocus = false"
                        @focus="inFocus = true"
                        @validate="validate($event)"
                        @float="labelFloat = $event"
                        :placeholder="calcPlaceholder"
                    />
                </div>
                <button
                    v-if="props.clearButton && textLike"
                    class="input-clear-btn"
                    @click="inputRef && inputRef.clearValue()"
                    :disabled="props.disabled"
                >
                <FontAwesomeIcon :icon="faXmark" />
                </button>
                <div v-if="slots.append" class="input-append">
                    <slot name="append"></slot>
                </div>
            </div>
            <slot name="after"></slot>
            <ToolTip v-if="!!props.tooltip || !!slots.tooltip">
                <FontAwesomeIcon :icon="faQuestionCircle" />
                <template #text>
                    <slot name="tooltip">{{ props.tooltip }}</slot>
                </template>
            </ToolTip>
        </div>
        <div class="input-desc" v-if="props.description || slots.description">
            <slot name="description">{{ props.description }}</slot>
        </div>
        <div v-if="validationMessages.length > 0" class="input-validation">
            <div v-for="message in validationMessages">{{ message }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";

$inputBg: #f7f7f7;
$focus: #3780ee;
$pendMinWidth: 36px;
$borderColor: #c4c4c4;
$invalidColor: red;
$disabledColor: #d8d8d8;
$labelColor: #5c5c5c;
$labelFloatColor: rgba($color: $labelColor, $alpha: 0.8);

.form-input {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .input-row {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        gap: 8px;

        .form-input-content {
            display: flex;
            flex-direction: row;
            width: 100%;
            // overflow: hidden;

            .input-prepend {
                display: flex;
                flex-direction: row;
                align-items: stretch;

                & > :deep(*):not(.modal) {
                    min-width: $pendMinWidth;
                    border: none;
                    // border-right: 1px solid grey;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            .input-item {
                flex-grow: 1;
                display: flex;
                position: relative;

                .input-label {
                    .required {
                        color: red;
                    }
                }

                .input-component {
                    border: none;
                    flex-grow: 1;
                    outline: none;
                    // font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
            }
            .input-clear-btn {
                background-color: transparent;
                border: none;
                cursor: pointer;
                padding: 6px 12px;
                color: grey;
                transition: color 0.2s ease-in-out;

                &:hover {
                    color: black;
                }
            }
            .input-append {
                display: flex;
                flex-direction: row;
                align-items: stretch;

                & > :deep(*):not(.modal) {
                    min-width: $pendMinWidth;
                    border: none;
                    // border-left: 1px solid grey;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            :deep(.tooltip) {
                margin: 0 12px;
            }
        }

        &.text-like {
            .form-input-content {
                align-items: stretch;
                border: 1px solid $borderColor;
                border-radius: $borderRadius;
                background-color: $inputBg;
                transition: box-shadow 0.2s ease-in-out;

                &.focus {
                    box-shadow: 0px 0px 6px 2px rgba($color: $focus, $alpha: 0.4);
                }

                &.invalid {
                    border-color: $invalidColor;
                }

                &.disabled {
                    background-color: $disabledColor;

                    :deep(button) {
                        cursor: default !important;
                    }

                    .input-item {
                        cursor: default;

                        label.input-label {
                            cursor: default;
                        }

                        .input-component {
                            background-color: $disabledColor;
                        }
                    }
                    .input-clear-btn:hover {
                        color: grey;
                    }
                }

                .input-prepend {
                    & > :deep(*:first-child) {
                        border-top-left-radius: $borderRadius;
                        border-bottom-left-radius: $borderRadius;
                    }
                }

                .input-item {
                    label.input-label {
                        cursor: text;
                        padding-left: 8px;
                        position: absolute;
                        transform-origin: top left;
                        transform: translate(0, 11px) scale(1);
                        transition: all .1s ease-in-out;
                        color: $labelColor;

                        &.no-cursor {
                            cursor: default;
                        }

                        &.float {
                            color: $labelFloatColor;
                            transform: translate(0, 2px) scale(.75);
                        }
                    }

                    .input-component {
                        padding: 18px 18px 8px 8px;
                        background-color: $inputBg;
                    }

                    &.radius-left {
                        &, label.input-label, .input-component {
                            border-top-left-radius: $borderRadius;
                            border-bottom-left-radius: $borderRadius;
                        }
                    }

                    &.radius-right {
                        &, label.input-label, .input-component {
                            border-top-right-radius: $borderRadius;
                            border-bottom-right-radius: $borderRadius;
                        }
                    }
                }

                .input-append {
                    & > :deep(*:last-child) {
                        border-top-right-radius: $borderRadius;
                        border-bottom-right-radius: $borderRadius;
                    }
                }
            }
        }

        &.list-like {
            
        }
    }
    .input-desc {
        font-size: small;
        color: grey;
    }
    .input-validation {
        font-size: small;
        color: $invalidColor;
    }
}
</style>