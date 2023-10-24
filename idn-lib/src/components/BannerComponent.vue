<script lang="ts" setup>
import { ref } from "vue";
import { FontAwesomeIcon, FontAwesomeLayers } from "@fortawesome/vue-fontawesome";
import { faXmark, faInfo, faScrewdriverWrench, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faCircle as faCircleRegular, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

const show = ref(true);

const props = withDefaults(defineProps<{
    type: "success" | "info" | "dev" | "warning" | "danger";
    dismissable?: boolean;
}>(), {
    type: "info",
    dismissable: false
});
</script>

<template>
    <div :class="`banner ${props.type}`" v-show="show">
        <div class="banner-icon">
            <FontAwesomeIcon v-if="props.type === 'success'" :icon="faCheckCircle" />
            <FontAwesomeIcon v-else-if="props.type === 'dev'" :icon="faScrewdriverWrench" />
            <FontAwesomeLayers v-else-if="props.type === 'info'" fixed-width>
                <FontAwesomeIcon :icon="faCircleRegular" />
                <FontAwesomeIcon :icon="faInfo" transform="shrink-6" />
            </FontAwesomeLayers>
            <FontAwesomeIcon v-else-if="props.type === 'warning'" :icon="faExclamationTriangle" />
            <FontAwesomeIcon v-else-if="props.type === 'danger'" :icon="faXmarkCircle" />
        </div>
        <div class="banner-content">
            <slot></slot>
        </div>
        <button v-if="props.dismissable" class="banner-close-btn" @click="show = false"><font-awesome-icon :icon="faXmark" /></button>
    </div>
</template>

<style lang="scss" scoped>
.banner {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1em;

    &.success {
        background-color: #13a613;
        color: white;
    }

    &.dev {
        background-color: #ffa347;
        color: black;
    }

    &.info {
        background-color: #9ee1e0;
        color: black;
    }

    &.warning {
        background-color: #fff12c;
        color: black;
    }

    &.danger {
        background-color: #f24b4b;
        color: white;
    }

    .banner-icon {
        padding: 4px 8px;
    }

    .banner-content {
        padding: 6px;
        flex-grow: 1;
        font-size: 0.9rem;
    }

    button.banner-close-btn {
        padding: 4px 8px;
        background-color: transparent;
        border: none;
        opacity: 0.7;
        cursor: pointer;
        color: unset;
        transition: opacity 0.2s ease-in-out;

        &:hover {
            opacity: 1;
        }
    }
}
</style>