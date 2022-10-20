<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import MainComponent from "@/components/MainComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
    <HeaderComponent title="Metadata Form" :dev="true" />
    <MainComponent>
        <div class="bar">

        </div>
    </MainComponent>
    <FooterComponent />
</template>

<style lang="scss">
.bar { 
    height: 2000px;
    background-color: grey;
    width: 75%;
}
</style>
