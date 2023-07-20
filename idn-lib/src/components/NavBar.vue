<script lang="ts" setup>
import InternalLink from "./InternalLink.vue";

const navLinks = [
    {
        "label": "Home",
        "url": "/"
    },
    {
        "label": "About Us",
        "url": "/about"
    },
    {
        "label": "Project Resources",
        "url": "/resources"
    },
    {
        "label": "Contact Us",
        "url": "/contact"
    }
];
</script>

<template>
    <nav id="main-nav">
        <slot>
            <InternalLink v-for="link in navLinks" :to="link.url">{{ link.label }}</InternalLink>
        </slot>
    </nav>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";

nav#main-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    & > :deep(a) {
        color: black;
        padding: 12px 12px 9px 12px;
        text-decoration: none;
        // font-weight: bold;
        font-size: 18px;
        border-bottom: 3px solid transparent;
        transition: border-bottom-color 0.2s ease-in-out;

        &:hover {
            border-bottom-color: rgba($color: $primary, $alpha: 0.5);
        }

        &.router-link-exact-active, &.router-link-active, &.active {
            border-bottom-color: $primary;
        }
    }
}
</style>