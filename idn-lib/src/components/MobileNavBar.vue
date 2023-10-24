<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import InternalLink from "./InternalLink.vue";
import idnLogo from "../../../static-assets/images/idn-logo-250.png";
import { NAV_LINKS } from "../utils/consts";

const props = defineProps<{
    internal: boolean;
    title: string;
}>();

const collapse = ref(true);
const scrolled = ref(false);
const mobileNavRef = ref<HTMLElement | null>(null);

function onScroll() {
    if (mobileNavRef.value) {
        scrolled.value = mobileNavRef.value.getBoundingClientRect().top <= 0;
    }
}

onMounted(() => {
    document.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
    document.removeEventListener("scroll", onScroll);
});
</script>

<template>
    <nav id="mobile-main-nav" ref="mobileNavRef">
        <div v-show="scrolled" id="idn-logo"><img :src="idnLogo" alt="IDN logo"></div>
        <a class="app-title" href="/"><h5>{{ props.title }}</h5></a>
        <button class="collapse-btn" @click="collapse = !collapse"><FontAwesomeIcon :icon="faBars" /></button>
        <div :class="`mobile-nav ${collapse ? 'collapse' : ''}`">
            <InternalLink v-for="link in NAV_LINKS" class="navbar-link mobile" :internal="props.internal" :to="link.url">{{ link.label }}</InternalLink>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";

nav#mobile-main-nav {
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 12px;
    position: relative;
    background-color: #eeeeee;
    display: none;

    @media only screen and (max-width: $smBreakpoint) {
        display: flex;
        gap: 8px;
        width: 100%;
        top: 0;
        position: sticky;
        z-index: 100;
    }

    button.collapse-btn {
        display: block;
        gap: 8px;
        margin-left: auto;
        padding: 6px 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    #idn-logo {
        margin-right: auto;

        img {
            width: 32px;
        }
    }

    .app-title {
        h5 {
            margin: 0;
        }
    }

    .mobile-nav {
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
        z-index: 900;
        position: absolute;
        top: 100%;
        background-color: #eeeeee;
        width: 100%;
        margin-left: -12px;

        &.collapse {
            height: 0;
        }

        a.navbar-link {
            color: black;
            $padding: 12px;
            $borderBottom: 3px;
            padding: $padding $padding #{$padding - $borderBottom} $padding;
            text-decoration: none;
            // font-weight: bold;
            font-size: 18px;
            border-bottom: $borderBottom solid transparent;
            border-top: 1px solid #d7d7d7;
            transition: border-bottom-color 0.2s ease-in-out;

            @media only screen and (max-width: $smBreakpoint) {
                font-size: 16px;
                $padding: 8px;
                padding: $padding $padding #{$padding - $borderBottom} $padding;
            }

            &:hover {
                border-bottom-color: rgba($color: $primary, $alpha: 0.5);
            }

            &.router-link-exact-active, &.router-link-active, &.active {
                border-bottom-color: $primary;
            }
        }
    }
}
</style>