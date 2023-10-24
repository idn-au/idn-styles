<script lang="ts" setup>
import { ref } from "vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import MainComponent from "./components/MainComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import FormInput from "./components/form/FormInput.vue";
import { Banner } from "./types";

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
const selectedMultiple = ref<string[]>([]);
const selected = ref("value 1");
const checked = ref(true);
const text = ref("text")
const date = ref("2023-10-23");

const options = [
    {
        label: "label 1",
        value: "value 1"
    },
    {
        label: "label 2",
        value: "value 2"
    },
    {
        label: "label 3",
        value: "value 3"
    }
];
</script>

<template>
    <HeaderComponent title="IDN Component Library" :banners="banners" />
    <MainComponent>
        <FormInput
            label="Select input"
            type="select"
            v-model="selected"
            :options="options"
            id="select"
        />
        <FormInput
            label="Multiselect kitchen sink"
            type="select"
            v-model="selectedMultiple"
            :options="options"
            id="multiselect"
            multiple
            chips
            allowAdd
            searchable
            clearButton
            description="This multiselect field has search enabled, allowing adding custom options, and selected values are displayed as 'chips'"
            tooltip="Test tooltip"
        />
        <FormInput
            label="Radio"
            type="radio"
            v-model="selected"
            :options="options"
            id="radio"
        />
        <FormInput
            label="checkbox"
            type="checkbox"
            v-model="checked"
            :options="options"
            id="checkbox"
        />
        <FormInput
            label="Multiple checkboxes as switches"
            type="checkbox"
            v-model="selectedMultiple"
            :options="options"
            id="switch-group"
            multiple
            switch
        />
        <FormInput
            label="Text input"
            type="text"
            v-model="text"
            id="text"
        />
        <FormInput
            label="Textarea"
            type="textarea"
            v-model="text"
            id="textarea"
            resize="none"
        />
        <FormInput
            label="Date input"
            type="date"
            v-model="date"
            id="date"
        />
    </MainComponent>
    <FooterComponent />
</template>

<style lang="scss" scoped>

</style>
