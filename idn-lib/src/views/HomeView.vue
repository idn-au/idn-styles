<script setup>
import { ref } from "vue";
import FormInput from "@/components/FormInput.vue";

const text = ref("");
</script>

<template>
    <div>
        <FormInput type="text" label="Label" v-model="text" />
    </div>
    <div class="bar">

    </div>
</template>

<style lang="scss" scoped>
.bar { 
    height: 2000px;
    background-color: grey;
    width: 75%;
}
</style>