<script setup lang="ts">
import IDCLogo from "@/components/IDCLogo.vue";

const props = withDefaults(defineProps<{
    image?: string;
}>(), {
    image: "https://static.idnau.org/images/Milky_Way_IDN_Logo_75percent-fpng.webp",
});
</script>

<template>
    <div class="min-h-[400px] py-0 px-2 flex flex-col justify-end bg-cover bg-no-repeat bg-center bg-blend-multiply relative -z-1 isolate" :style="{ background: `linear-gradient(transparent 75%, hsl(156 7.25% 13.53% / 50%)), url(${props.image})` }">
        <div class="mx-auto max-w-[1200px] w-full">
            <h1 class="text-white text-5xl mt-6">
                <slot name="title" />
            </h1>
            <p class="text-white font-bold">
                <slot name="description" />
            </p>
        </div>
        <IDCLogo class="fill-white absolute h-[750px] w-auto -top-[50px] right-0 opacity-30 saturate-10 brightness-140 -z-1" />
    </div>
</template>

<style scoped>

</style>
