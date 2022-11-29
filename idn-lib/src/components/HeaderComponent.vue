<script setup>
import ConditionalLink from "@/components/ConditionalLink.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import NavBar from "@/components/NavBar.vue";
import idnLogo from "@/assets/images/idn-logo-250.png";

const props = defineProps({
    internal: {
        type: Boolean,
        default: false
    },
    title: String,
    banners: Array // [{"type": "dev", "message": "some message", ...}]
});
</script>

<template>
    <BannerComponent v-for="banner in props.banners" :type="banner.type">
        {{ banner.message }}
    </BannerComponent>
    <header>
        <div v-if="props.dev" id="dev-flag">
            <span>Under development</span>
        </div>
        <div id="header-content">
            <div id="header-left">
                <ConditionalLink :internal="props.internal" id="idn-logo" to="/"><img :src="idnLogo" alt="IDN Logo"></ConditionalLink>
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
                        <ConditionalLink :internal="props.internal" to="/">
                            <h2>IDN Catalogue Project</h2>
                        </ConditionalLink>
                    </div>
                </div>
            </div>
            <NavBar :internal="props.internal">
                <slot></slot>
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

            #idn-logo > img {
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
