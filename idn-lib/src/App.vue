<script setup>
import { RouterLink, RouterView } from "vue-router"
import HeaderComponent from "@/components/HeaderComponent.vue";
import MainComponent from "@/components/MainComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { navLinks } from "@/utils/links";
</script>

<template>
    <HeaderComponent title="Metadata Form" :dev="true">
        <RouterLink v-for="link in navLinks" :to="link.url">{{ link.label }}</RouterLink>
    </HeaderComponent>
    <MainComponent>
        <RouterView />
    </MainComponent>
    <FooterComponent />
</template>

<style lang="scss">

</style>
