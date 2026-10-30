<script setup lang="ts">
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import type { NavigationItem } from "@/types.ts";
import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Newspaper } from "@lucide/vue";
import IDCButton from "@/components/IDCButton.vue";
import { Separator } from "@/components/ui/separator";
import { navLinks } from "@/utils/consts.ts";

const props = withDefaults(defineProps<{
    navigation?: NavigationItem[];
}>(), {
    navigation: () => navLinks,
});

const socials: {
    title: string;
    icon: IconDefinition;
    url: string;
}[] = [
    {
        title: "Facebook",
        icon: faFacebookF,
        url: "https://www.facebook.com/ISU.UniMelb",
    },
    {
        title: "Instagram",
        icon: faInstagram,
        url: "https://www.instagram.com/isu.unimelb/",
    },
    {
        title: "LinkedIn",
        icon: faLinkedinIn,
        url: "https://www.linkedin.com/company/indigenous-data-network/posts/?feedView=all",
    },
    {
        title: "YouTube",
        icon: faYoutube,
        url: "https://www.youtube.com/@IndigenousStudiesUnit",
    },
    {
        title: "X",
        icon: faXTwitter,
        url: "https://x.com/indigenousUoM",
    },
];
</script>

<template>
    <footer class="dark bg-secondary text-secondary-foreground py-12">
        <div class="mx-auto max-w-[1200px] flex flex-col gap-12 px-2">
            <div class="grid lg:grid-cols-2 gap-12">
                <div class="grid sm:grid-cols-2 gap-6">
                    <div v-for="link in props.navigation">
                        <RouterLink v-if="link.path.startsWith('/')" :to="link.path" class="text-isu-yellow! font-bold">
                            {{ link.title }}
                        </RouterLink>
                        <a v-else :href="link.path" class="text-isu-yellow! font-bold">{{ link.title === "Catalogue" ? "Catalogue" : link.title }}</a>
                        <div class="flex flex-col">
                            <template v-for="child in link.children?.filter(c => c.path !== link.path)">
                                <RouterLink v-if="child.path.startsWith('/')" :to="child.path" class="text-foreground!">
                                    {{ child.title }}
                                </RouterLink>
                                <a v-else :href="child.path" class="text-foreground!">{{ child.title }}</a>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-8">
                    <div class="grid grid-cols-[3fr_min-content_2fr] items-center gap-8">
                        <RouterLink to="/" class="">
                            <img src="https://static.idnau.org/logos/idc/UoM_Indig.Data.Com_Brand_Art_RGB_Logo_White.png">
                        </RouterLink>
                        <Separator orientation="vertical" class="!h-3/4 bg-muted-foreground" />
                        <a href="https://mspgh.unimelb.edu.au/centres-institutes/onemda/research-group/indigenous-studies-unit/indigenous-data-network" class="">
                            <img src="https://static.idnau.org/logos/idn/UoM_Indig_Studies_Unit_Brand_ART - (ICON LOCK UP) IDN - WHITE.png">
                        </a>
                    </div>
                    <div class="flex flex-row items-center gap-2 justify-between flex-wrap">
                        <div class="flex flex-row items-center justify-around gap-2 grow">
                            <IDCButton v-for="social in socials" colour="green" icon :title="social.title" asChild>
                                <a :href="social.url">
                                    <FontAwesomeIcon :icon="social.icon" />
                                </a>
                            </IDCButton>
                        </div>
                        <IDCButton colour="red" asChild>
                            <RouterLink to="/news/newsletter">
                                <Newspaper class="size-4" /> Subscribe to our newsletter
                            </RouterLink>
                        </IDCButton>
                    </div>
                </div>
            </div>
            <div class="text-center">
                &copy; Indigenous Data Network 2026
            </div>
        </div>
    </footer>
</template>

<style scoped>
footer {
    background-image: url("https://static.idnau.org/graphics/network/IDC_Network graphic_White_ART-2.svg");
    background-repeat: no-repeat;
    background-size: 40%;
    background-position: 102% 175%;
}
</style>
