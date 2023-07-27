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
    <HeaderComponent title="IDN Component Library" />
    <MainComponent>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem sapiente nemo iusto, voluptates cum porro tempore, beatae odit doloribus harum repudiandae cumque iure fuga ullam deleniti, sed maxime. Autem, doloribus!</p>
        <FormInput type="select" id="selected" v-model="selected" :options="options" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque soluta labore eius voluptate suscipit earum dolorum non, molestiae alias quisquam impedit eveniet distinctio odio praesentium dolores voluptas iste modi recusandae.</p>
    </MainComponent>
    <FooterComponent />
</template>

<style lang="scss" scoped>

</style>
