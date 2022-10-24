<script setup>
import { RouterView } from "vue-router";
import { HeaderComponent, MainComponent, FooterComponent } from "@idn-au/idn-lib";
</script>

<template>
    <HeaderComponent title="IDN Lib Demo" :dev="true" :useRouter="true" />
    <MainComponent>
        <RouterView />
    </MainComponent>
    <FooterComponent />
</template>

<style lang="scss">

</style>
