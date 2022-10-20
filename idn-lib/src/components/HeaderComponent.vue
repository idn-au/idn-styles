<script setup>
import ConditionalLink from "@/components/ConditionalLink.vue";
import NavBar from "@/components/NavBar.vue";
import idnLogo from "@/assets/idn-logo-250.png";

const props = defineProps({
    useRouter: {
        type: Boolean,
        default: false
    },
    title: String,
    dev: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <header>
        <div v-if="props.dev" id="dev-flag">
            <span>Under development</span>
        </div>
        <div id="header-content">
            <div id="header-left">
                <ConditionalLink :useRouter="props.useRouter" id="idn-logo" to="/"><img :src="idnLogo" alt="IDN Logo"></ConditionalLink>
                <div id="logo-text">
                    <a href="https://mspgh.unimelb.edu.au/centres-institutes/centre-for-health-equity/research-group/indigenous-data-network" target="_blank">
                        <h1>The Indigenous Data Network</h1>
                    </a>
                    <ConditionalLink :useRouter="props.useRouter" to="/">
                        <h2><template v-if="props.title">{{ props.title }} | </template>IDN Catalogue Project</h2>
                    </ConditionalLink>
                </div>
            </div>
            <NavBar :useRouter="props.useRouter" />
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import "@/sass/_variables.scss";
$padding: 20px;

header {
    display: flex;
    background-color: #eeeeee;

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
                    margin-bottom: 18px;
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
