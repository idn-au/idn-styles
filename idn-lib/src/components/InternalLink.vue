<script lang="ts" setup>
import { IDN_WEBSITE_URL } from "../utils/consts";

const props = withDefaults(defineProps<{
    to: string;
    internal?: boolean;
}>(), {
    internal: false
});
</script>

<template>
    <a :href="`${props.internal ? '' : IDN_WEBSITE_URL}${props.to}`">
        <slot></slot>
    </a>
</template>

<style lang="scss" scoped>

</style>
