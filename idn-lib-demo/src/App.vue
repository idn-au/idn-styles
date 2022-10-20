<script setup>
import { RouterView } from "vue-router";
import { HeaderComponent, MainComponent, FooterComponent } from "idn-lib";
</script>

<template>
    <HeaderComponent title="IDN Lib Demo" :dev="true" />
    <MainComponent>
        <RouterView />
    </MainComponent>
    <FooterComponent />
</template>

<style lang="scss">

</style>
