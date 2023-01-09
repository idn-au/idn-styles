<script setup>
import { useSlots } from "vue";
import ToolTip from "@/components/ToolTip.vue";

const props = defineProps({
    label: String,
    span: {
        type: Number,
        default: 1
    },
    direction: {
        type: String,
        default: "column"
    },
    required: Boolean,
    tooltip: String,
    description: String
});

const slots = useSlots();
</script>

<template>
    <div :class="`form-field span-${props.span}`">
        <label v-if="props.label" class="field-label">{{ props.label }} <span v-if="props.required === true">*</span></label>
        <div class="form-field-row">
            <div :class="`input-container direction-${props.direction}`">
                <slot></slot>
            </div>
            <ToolTip v-if="!!props.tooltip || !!slots.tooltip">
                <i class="fa-regular fa-circle-question"></i>
                <template #text>
                    <slot name="tooltip">{{ props.tooltip }}</slot>
                </template>
            </ToolTip>
        </div>
        <div class="form-field-desc" v-if="props.description || slots.description">
            <slot name="description">{{ props.description }}</slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;

    @for $i from 1 through 3 {
        &.span-#{$i} {
            grid-column: span #{$i};
        }
    }

    label.field-label {
        font-weight: bold;
    }

    .form-field-row {
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;

        .input-container {
            display: flex;
            flex-grow: 1;
            gap: 8px;

            &.direction-column {
                flex-direction: column;
            }

            &.direction-row {
                flex-direction: row;

                & > :deep(.form-input) {
                    flex: 1;
                }
            }
        }
    }

    .form-field-desc {
        font-size: small;
        color: grey;
    }
}
</style>