<script lang="ts" setup>
import type { NavigationItem } from "@/types.ts";
import { RouterLink } from "vue-router";
import MainNav from "@/components/MainNav.vue";

const props = defineProps<{
    navigation?: NavigationItem[];
}>();
</script>

<template>
    <header class="top-nav sticky top-0 flex flex-row items-center p-4 gap-2 z-50 transition-colors flex-wrap bg-background">
        <slot name="banner" />
        <RouterLink to="/" class="mr-auto">
            <!--            <img src="/logos/idc/idc-logo.png" alt="IDC logo" class="w-50 md:w-62 h-auto"> -->
            <img src="https://static.idnau.org/logos/idc/idc-logo.png" alt="IDC logo" class="w-50 md:w-62 h-auto">
        </RouterLink>
        <MainNav :navigation="props.navigation" />
        <slot name="buttons" />
    </header>
</template>
