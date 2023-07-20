<script lang="ts" setup>
import { ref } from "vue";
// imports will display an error in VScode, doesn't affect anything
import HeaderComponent from "./components/HeaderComponent.vue";
import MainComponent from "./components/MainComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import FormInput from "./components/form/FormInput.vue";

const banners = [
    {
        type: "success",
        message: "success banner"
    },
    {
        type: "info",
        message: "info banner"
    },
    {
        type: "dev",
        message: "dev banner"
    },
    {
        type: "warning",
        message: "warning banner"
    },
    {
        type: "danger",
        message: "danger banner"
    }
];

const selected = ref("");

const options = [
    {
        label: "label 1",
        value: "value 1"
    },
    {
        label: "label 2",
        value: "value 2"
    }
];
</script>

<template>
    <HeaderComponent title="IDN Component Library" :banners="banners" />
    <MainComponent>
        <FormInput type="select" id="selected" v-model="selected" :options="options" />
    </MainComponent>
    <FooterComponent />
</template>

<style lang="scss" scoped>

</style>
