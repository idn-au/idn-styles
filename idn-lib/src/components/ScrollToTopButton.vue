<script setup lang="ts">
import { ArrowUp } from "@lucide/vue";
import {useWindowScroll} from "@vueuse/core";
import IDCButton from "@/components/IDCButton.vue";

const { arrivedState } = useWindowScroll();

function scrollToTop() {
	window.scrollTo({top: 0, behavior: "smooth"});
}
</script>

<template>
	<IDCButton v-show="!arrivedState.top" variant="solid" size="lg" icon colour="green" class="rounded-full fixed bottom-4 right-4 z-50" title="Scroll to top" @click="scrollToTop">
		<ArrowUp class="size-5" />
	</IDCButton>
</template>

<style scoped>

</style>