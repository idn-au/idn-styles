<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { cn } from "@/lib/utils";
import { IDC_URL } from "@/utils/consts";

const props = withDefaults(defineProps<{
    external?: boolean;
    to: string;
    class?: HTMLAttributes["class"];
}>(), {
    external: true,
});

const isExternalLink = computed(() => props.external || !props.to.startsWith("/"));
const url = computed(() => props.to.startsWith("/") && isExternalLink.value
    ? `${IDC_URL}${props.to}`
    : props.to);
</script>

<template>
    <a
        v-if="isExternalLink"
        :href="url"
        :class="cn('', props.class)"
    >
        <slot />
    </a>
    <RouterLink
        v-else
        :to="url"
        :class="cn('', props.class)"
    >
        <slot />
    </RouterLink>
</template>

<style scoped>

</style>
