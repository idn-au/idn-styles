<script setup>
import ConditionalLink from "@/components/ConditionalLink.vue";

const props = defineProps({
    useRouter: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <nav id="main-nav">
        <ConditionalLink :useRouter="props.useRouter" to="/">Home</ConditionalLink>
        <ConditionalLink :useRouter="props.useRouter" to="/about">About Us</ConditionalLink>
        <ConditionalLink :useRouter="props.useRouter" to="/resources">Project Resources</ConditionalLink>
        <ConditionalLink :useRouter="props.useRouter" to="/contact">Contact Us</ConditionalLink>
    </nav>
</template>

<style lang="scss" scoped>
@import "@/sass/_variables.scss";

nav#main-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    & > a {
        color: black;
        padding: 12px 12px 9px 12px;
        text-decoration: none;
        font-weight: bold;
        font-size: 18px;
        border-bottom: 3px solid transparent;
        transition: border-bottom-color 0.2s ease-in-out;

        &:hover {
            border-bottom-color: rgba($color: $primary, $alpha: 0.5);
        }

        &.router-link-exact-active {
            border-bottom-color: $primary;
        }
    }
}
</style>