<script lang="ts" setup>
import InternalLink from "./InternalLink.vue";
import { NAV_LINKS } from "../utils/consts";

const props = defineProps<{
    internal: boolean;
    title: string;
}>();
</script>

<template>
    <nav id="main-nav">
        <InternalLink v-for="link in NAV_LINKS" class="navbar-link" :internal="props.internal" :to="link.url">{{ link.label }}</InternalLink>
    </nav>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";

nav#main-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 12px;
    position: relative;
    background-color: #eeeeee;

    @media only screen and (max-width: $mdBreakpoint) {
        gap: 12px;
    }

    @media only screen and (max-width: $smBreakpoint) {
        display: none;
    }

    a.navbar-link {
        color: black;
        $padding: 12px;
        $borderBottom: 3px;
        padding: $padding $padding #{$padding - $borderBottom} $padding;
        text-decoration: none;
        // font-weight: bold;
        font-size: 18px;
        border-bottom: $borderBottom solid transparent;
        transition: border-bottom-color 0.2s ease-in-out;

        @media only screen and (max-width: $mdBreakpoint) {
            font-size: 18px;
            $padding: 10px;
            padding: $padding $padding #{$padding - $borderBottom} $padding;
        }

        &:hover {
            border-bottom-color: rgba($color: $primary, $alpha: 0.5);
        }

        &.router-link-exact-active, &.router-link-active, &.active {
            border-bottom-color: $primary;
        }
    }
}
</style>