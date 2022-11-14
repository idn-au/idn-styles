<script setup>
import { ref } from "vue";

const show = ref(true);

const typeIcons = {
    "success": "circle-check",
    "dev": "screwdriver-wrench",
    "info": "circle-info",
    "warning": "triangle-exclamation",
    "danger": "circle-xmark"
};

const props = defineProps({
    type: {
        type: String,
        default: "info"
    },
    dismissable: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div :class="`banner ${props.type}`" v-show="show">
        <div class="banner-icon">
            <i :class="`fa-regular fa-${typeIcons[props.type]}`"></i>
        </div>
        <div class="banner-content">
            <slot></slot>
        </div>
        <button v-if="props.dismissable" class="banner-close-btn" @click="show = false"><i class="fa-regular fa-xmark"></i></button>
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
        background-color: #ff9d26;
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
        padding: 4px;
        flex-grow: 1;
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