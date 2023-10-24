<script lang="ts" setup>
import { ref } from "vue";
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

const selected = ref("value 1");
const checked = ref(true);
const date = ref("2023-10-23");

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
    <HeaderComponent title="IDN Component Library" />
    <MainComponent>
        <FormInput
            type="select"
            v-model="selected"
            :options="options"
            id="id"
        />
        <FormInput
            type="radio"
            v-model="selected"
            :options="options"
            id="id"
        />
        <FormInput
            type="checkbox"
            v-model="checked"
            :options="options"
            id="id"
        />
        <FormInput
            type="text"
            v-model="selected"
            id="id"
        />
        <FormInput
            type="textarea"
            v-model="selected"
            id="id"
        />
        <FormInput
            type="date"
            v-model="date"
            id="id"
        />
    </MainComponent>
    <FooterComponent />
</template>

<style lang="scss" scoped>

</style>
