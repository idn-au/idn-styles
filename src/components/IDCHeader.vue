<script lang="ts" setup>
import { RouterLink } from "vue-router";
import MainNav from "@/components/MainNav.vue";

// const colorMode = useColorMode();

const linkClasses = "bg-transparent hover:bg-black/10 transition-colors";
</script>

<template>
    <header class="top-nav sticky top-0 flex flex-row items-center p-4 gap-2 z-50 transition-colors flex-wrap bg-background">
        <!--		<Alert class="w-full border-none bg-transparent p-0 text-muted-foreground text-sm"> -->
        <!--			<Hammer /> -->
        <!--			<AlertTitle>This website is currently under development</AlertTitle> -->
        <!--		</Alert> -->
        <RouterLink to="/" class="mr-auto">
            <img src="/logos/idc/idc-logo.png" alt="IDC logo" class="w-50 md:w-62 h-auto">
        </RouterLink>
        <MainNav />
        <!--		<SearchCommand icon :class="linkClasses" /> -->
        <!--	        <Button variant="ghost" size="icon" @click="!colorMode.unknown ? colorMode.value === 'dark' ? colorMode.preference = 'light' : colorMode.preference = 'dark' : undefined"> -->
        <!--		        <SunMoon v-show="colorMode.unknown" /> -->
        <!--		        <Sun v-show="colorMode.value === 'dark'" class="size-4" /> -->
        <!--		        <Moon v-show="colorMode.value === 'light'" class="size-4" /> -->
        <!--	        </Button> -->
    </header>
</template>
