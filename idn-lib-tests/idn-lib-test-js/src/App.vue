<script setup>
import { ref } from "vue";
import { HeaderComponent, MainComponent, FooterComponent, FormInput } from "idn-lib";

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

const selected = ref("");
</script>

<template>
    <HeaderComponent title="JS idn lib demo" :banners="banners" />
    <MainComponent>
        <FormInput type="select" id="selected" v-model="selected" :options="options" />
    </MainComponent>
    <FooterComponent />
</template>

<style scoped></style>
