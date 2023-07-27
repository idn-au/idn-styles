<script lang="ts" setup>
import BannerComponent from "./BannerComponent.vue";
import NavBar from "./NavBar.vue";
import MobileNavBar from "./MobileNavBar.vue";
import InternalLink from "./InternalLink.vue";
import { IDN_WEBSITE_URL } from "../utils/consts";
import idnLogo from "../../../static-assets/images/idn-logo-250.png";

const props = withDefaults(defineProps<{
    internal?: boolean;
    title: string;
    banners?: {
        type: "success" | "info" | "dev" | "warning" | "danger";
        message: string;
    }[];
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
                <a id="idn-logo" :href="IDN_WEBSITE_URL" target="_blank" rel="noopener noreferrer">
                    <img :src="idnLogo" alt="IDN Logo" />
                </a>
                <a class="heading" :href="IDN_WEBSITE_URL" target="_blank">
                    <h1>The Indigenous Data Network</h1>
                </a>
                <div class="sub-heading">
                    <a class="app-title" href="/">
                        <h2>{{ props.title }}</h2>
                    </a>
                    <span class="separator">|</span>
                    <InternalLink class="idc-title" :internal="props.internal" to="/">
                        <h2>IDN Catalogue Project</h2>
                    </InternalLink>
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
            gap: 16px;
            padding: 20px;
            display: grid;
            grid-template: repeat(2, min-content) / min-content 1fr;

            @media only screen and (max-width: $mdBreakpoint) {
                padding: 16px;
            }
            
            @media only screen and (max-width: $smBreakpoint) {
                padding: 12px;
                padding-bottom: 0;
            }

            #idn-logo {
                margin: auto 0;
                grid-row: span 2;

                @media only screen and (max-width: $smBreakpoint) {
                    grid-row: unset;
                }

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

            .heading {
                margin: 0;
            }

            .sub-heading {
                display: flex;
                flex-direction: row;
                gap: 12px;
                align-items: center;
                // margin-bottom: 18px;

                @media only screen and (max-width: $smBreakpoint) {
                    grid-column: span 2;
                    flex-direction: column-reverse;
                    align-items: flex-start;
                }

                .app-title {
                    @media only screen and (max-width: $smBreakpoint) {
                        display: none;
                    }
                }

                .separator {
                    font-size: 1.2rem;
                    font-weight: 100;
                    line-height: 1.1;

                    @media only screen and (max-width: $smBreakpoint) {
                        display: none;
                    }
                }

                .idc-title {
                    
                }
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
