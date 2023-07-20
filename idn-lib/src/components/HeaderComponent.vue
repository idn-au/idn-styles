<script lang="ts" setup>
import BannerComponent from "./BannerComponent.vue";
import NavBar from "./NavBar.vue";
import InternalLink from "./InternalLink.vue";
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
                <slot name="logo-link">
                    <InternalLink to="/" id="idn-logo"><img :src="idnLogo" alt="IDN Logo" /></InternalLink>
                </slot>
                <div id="logo-text">
                    <a class="heading" href="https://mspgh.unimelb.edu.au/centres-institutes/centre-for-health-equity/research-group/indigenous-data-network" target="_blank">
                        <h1>The Indigenous Data Network</h1>
                    </a>
                    <div class="sub-heading">
                        <template v-if="props.title">
                            <a href="/">
                                <h2>{{ props.title }}</h2>
                            </a>
                            <span class="separator">|</span>
                        </template>
                        <slot name="heading-link">
                            <InternalLink :internal="props.internal" to="/">
                                <h2>IDN Catalogue Project</h2>
                            </InternalLink>
                        </slot>
                    </div>
                </div>
            </div>
            <NavBar :internal="props.internal">
                <slot name="links"></slot>
            </NavBar>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";
$padding: 20px;

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
        padding: $padding;
        width: 100%;
        max-width: $maxPageWidth;
        margin: 0 auto;
        flex-wrap: wrap;

        #header-left {
            display: flex;
            flex-direction: row;
            gap: 20px;

            :deep(#idn-logo) > img {
                height: 100px;
            }

            #logo-text {
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .sub-heading {
                    display: flex;
                    flex-direction: row;
                    gap: 12px;
                    align-items: center;
                    margin-bottom: 18px;

                    .separator {
                        font-size: 1.2rem;
                        font-weight: 100;
                        line-height: 1.1;
                    }
                }

                :deep(a) {
                    color: black;
                }

                h1 {
                    margin: 0;
                    font-size: 26px;
                    margin-top: 6px;
                }

                :deep(h2) {
                    margin: 0;
                    font-size: 20px;
                }
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
