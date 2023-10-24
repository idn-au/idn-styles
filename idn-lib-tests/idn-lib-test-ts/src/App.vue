<script lang="ts" setup>
import { ref } from "vue";
import { HeaderComponent, MainComponent, FooterComponent, FormInput, type Banner } from "idn-lib";

const banners: Banner[] = [
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

const selected = ref("")
</script>

<template>
    <HeaderComponent title="TS idn lib demo" :banners="banners" />
    <MainComponent>
        <FormInput type="select" :options="options" id="id" v-model="selected" label="label" />
    </MainComponent>
    <FooterComponent />
</template>

<style scoped></style>
