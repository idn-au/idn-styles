<script lang="ts" setup>
import BannerComponent from "./BannerComponent.vue";
import NavBar from "./NavBar.vue";
import MobileNavBar from "./MobileNavBar.vue";
import { Banner } from "../types";
import idnLogo from "../../../static-assets/images/idn-logo-250.png";
import InternalLink from "./InternalLink.vue";

const props = withDefaults(defineProps<{
    internal?: boolean;
    title?: string;
    banners?: Banner[];
}>(), {
    internal: false
});
</script>

<template>
    <BannerComponent v-for="banner in props.banners" :type="banner.type">
        {{ banner.message }}
    </BannerComponent>
    <header>
        <div id="header-content">
            <div id="header-left">
                <InternalLink id="idn-logo" to="/" :internal="props.internal">
                    <img :src="idnLogo" alt="IDN Logo" />
                </InternalLink>
                <div id="idn-logo-text">
                    <InternalLink to="/" class="heading" :internal="props.internal">
                        <h1>The Indigenous Data Network</h1>
                    </InternalLink>
                    <a v-if="props.title" class="sub-heading" href="/">
                        <h2>{{ props.title }}</h2>
                    </a>
                </div>
            </div>
            <NavBar :internal="props.internal" :title="title" />
        </div>
    </header>
    <MobileNavBar :internal="props.internal" :title="title" />
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";

header {
    display: flex;
    background-color: #eeeeee;

    a::after {
        content: unset;
    }

    #header-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        // padding: 20px;
        width: 100%;
        max-width: $maxPageWidth;
        margin: 0 auto;
        flex-wrap: wrap;

        #header-left {
            display: flex;
            flex-direction: row;
            gap: 20px;
            padding: 20px;

            @media only screen and (max-width: $mdBreakpoint) {
                padding: 16px;
            }
            
            @media only screen and (max-width: $smBreakpoint) {
                padding: 12px;
                padding-bottom: 0;
            }

            #idn-logo {
                margin: auto 0;

                img {
                    width: 100px;

                    @media only screen and (max-width: $mdBreakpoint) {
                        width: 80px;
                    }

                    @media only screen and (max-width: $smBreakpoint) {
                        width: 60px;
                    }
                }
            }

            #idn-logo-text {
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .sub-heading {
                    margin-bottom: 18px;

                    @media only screen and (max-width: $smBreakpoint) {
                        display: none;
                    }
                }
            }

            .heading {
                margin: 0;
            }

            a {
                color: black;
            }

            h1 {
                margin: 0;
                font-size: 26px;
                margin-top: 6px;
            }

            h2 {
                margin: 0;
                font-size: 20px;
            }
        }
    }

    #dev-flag {
        $size: 100px;
        $position: -50px;
        
        position: absolute;
        height: $size;
        left: $position;
        top: $position;
        width: $size;
        background-color: rgba($color: #ff9500, $alpha: 0.8);
        color: white;
        transform: rotate(-45deg);
        text-align: center;

        span {
            position: absolute;
            left: 10px;
            top: 70px;
            width: 80px;
            font-weight: bold;
            font-size: 0.75rem;
        }
    }
}
</style>
