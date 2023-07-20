<script lang="ts" setup>
import { useSlots } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import ToolTip from "../ToolTip.vue";

const props = withDefaults(defineProps<{
    label?: string;
    span?: number;
    direction?: "row" | "column";
    required?: boolean;
    tooltip?: string;
    description?: string;
}>(), {
    span: 1,
    direction: "column"
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
                <font-awesome-icon :icon="faQuestionCircle" />
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

                & > :deep(.form-field), & > :deep(.form-input) {
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