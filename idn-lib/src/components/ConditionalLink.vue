<script setup>
const publicBaseUrl = "https://idn-au.github.io/dev.idnau.org";

const props = defineProps({
    to: {
        type: String,
        required: true
    },
    internal: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <a :href="`${props.internal ? '' : publicBaseUrl}${props.to}`">
        <slot></slot>
    </a>
</template>

<style lang="scss" scoped>

</style>
