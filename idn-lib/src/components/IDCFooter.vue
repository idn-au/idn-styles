<script setup lang="ts">
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import type { NavigationItem } from "@/types";
import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Newspaper } from "@lucide/vue";
import IDCButton from "@/components/IDCButton.vue";
import IDCLink from "@/components/IDCLink.vue";
import { Separator } from "@/components/ui/separator";
import { navLinks } from "@/utils/consts";

const props = withDefaults(defineProps<{
    navigation?: NavigationItem[];
    external?: boolean;
}>(), {
    navigation: () => navLinks,
    external: true,
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
                        <IDCLink :to="link.path" :external="props.external" class="text-isu-yellow! font-bold">
                            {{ link.title }}
                        </IDCLink>
                        <div class="flex flex-col">
                            <template v-for="child in link.children?.filter(c => c.path !== link.path)">
                                <IDCLink :to="child.path" :external="props.external" class="text-foreground!">
                                    {{ child.title }}
                                </IDCLink>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-8">
                    <div class="grid grid-cols-[3fr_min-content_2fr] items-center gap-8">
                        <IDCLink to="/" :external="props.external">
                            <img src="https://static.idnau.org/logos/idc/UoM_Indig.Data.Com_Brand_Art_RGB_Logo_White.png">
                        </IDCLink>
                        <Separator orientation="vertical" class="!h-3/4 bg-muted-foreground" />
                        <a href="https://mspgh.unimelb.edu.au/centres-institutes/onemda/research-group/indigenous-studies-unit/indigenous-data-network">
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
                            <IDCLink to="/news/newsletter" :external="props.external">
                                <Newspaper class="size-4" /> Subscribe to our newsletter
                            </IDCLink>
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
    background:
        linear-gradient(var(--secondary), transparent),
        url("https://static.idnau.org/graphics/network/IDC_Network graphic_White_ART-2.svg"), var(--secondary);
    /* background-image: url("https://static.idnau.org/graphics/network/IDC_Network graphic_White_ART-2.svg"); */
    background-repeat: no-repeat;
    background-size: 40%;
    background-position: 102% 175%;
}
</style>
