<script setup>
import aiatsisLogo from "@/assets/images/AIATSIS-WhiteCrest-landscape.png";
import anuLogo from "@/assets/images/ANU-WhiteCrest-landscape.png";
import ardcLogo from "@/assets/images/ARDC-WhiteCrest-stacked.png";
import umLogo from "@/assets/images/UMelb-WhiteCrest-landscape.png";
</script>

<template>
    <footer>
        <div id="footer-content">
            <div id="footer-logos">
                <div>
                    <a href="https://www.unimelb.edu.au/" target="_blank"><img :src="umLogo" alt="Melbourne Uni Logo"></a>
                </div>
                <div>
                    <a href="https://ardc.edu.au/" target="_blank"><img :src="ardcLogo" alt="ARDC Logo"></a>
                </div>
                <div>
                    <a href="https://www.anu.edu.au/" target="_blank"><img :src="anuLogo" alt="ANU Logo"></a>
                </div>
                <div>
                    <a href="https://aiatsis.gov.au/" target="_blank"><img :src="aiatsisLogo" alt="AIATSIS Logo"></a>
                </div>
            </div>
            <div id="footer-bottom">
                <p>The <a href="https://mspgh.unimelb.edu.au/centres-institutes/centre-for-health-equity/research-group/indigenous-data-network" target="_blank">Indigenous Data Network (IDN)</a> is within the <a href="https://www.unimelb.edu.au" target="_blank">University of Melbourne</a>. It was established in 2018 to support and coordinate the governance of Indigenous data for Aboriginal and Torres Strait Islander peoples and empower Aboriginal and Torres Strait Islander communities to decide their own local data priorities.</p>
                <p>This website and content, &copy; Indigenous Data Network, 2022</p>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";
$padding: 20px;

footer {
    display: flex;
    background-color: #eeeeee;

    #footer-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: $maxPageWidth;
        margin: 0 auto;
        
        #footer-logos {
            $padding: 32px;
            
            gap: $padding;
            padding: $padding 60px;
            height: 11vw;
            max-height: 180px;
            display: grid;
            grid-template-rows: minmax(0, 1fr);
            grid-auto-flow: column;
            grid-auto-columns: 1fr;

            div {
                max-height: 100%;
                display: flex;
                background-color: white;
                border-radius: 6px;
                padding: 12px;

                a {
                    display: flex;
                    flex-grow: 1;

                    &::after {
                        content: unset;
                    }

                    img {
                        height: auto;
                        max-width: 100%;
                        max-height: 100%;
                        margin: auto;
                    }
                }
            }
        }

        #footer-bottom {
            padding: $padding;
            background-color: #eeeeee;
        }
    }
}
</style>
