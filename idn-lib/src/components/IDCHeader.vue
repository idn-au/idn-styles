<script lang="ts" setup>
import type { NavigationItem } from "@/types";
import IDCLink from "@/components/IDCLink.vue";
import MainNav from "@/components/MainNav.vue";
import { navLinks } from "@/utils/consts";

const props = withDefaults(defineProps<{
    navigation?: NavigationItem[];
    external?: boolean;
    baseUrl?: string;
}>(), {
    navigation: () => navLinks,
    external: true,
});
</script>

<template>
    <header class="top-nav sticky top-0 flex flex-row items-center p-4 gap-2 z-50 transition-colors flex-wrap bg-background">
        <slot name="banner" />
        <IDCLink to="/" :external="props.external" class="mr-auto">
            <img src="https://static.idnau.org/logos/idc/idc-logo.png" alt="IDC logo" class="w-50 md:w-62 h-auto">
        </IDCLink>
        <MainNav :navigation="props.navigation" :external="props.external" :baseUrl="props.baseUrl" />
        <slot name="buttons" />
    </header>
</template>
