<script setup>
import { RouterLink } from "vue-router";

const publicBaseUrl = "https://idn-au.github.io/dev.idnau.org";

const props = defineProps({
    to: {
        type: String,
        required: true
    },
    useRouter: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <RouterLink v-if="props.useRouter" :to="props.to">
        <slot></slot>
    </RouterLink>
    <a v-else :href="publicBaseUrl + props.to">
        <slot></slot>
    </a>
</template>

<style lang="scss" scoped>

</style>
