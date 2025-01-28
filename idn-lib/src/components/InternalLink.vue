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
    <RouterLink v-if="props.internal" :to="props.to">
        <slot></slot>
    </RouterLink>
    <a v-else :href="`${IDN_WEBSITE_URL}${props.to}`">
        <slot></slot>
    </a>
</template>
