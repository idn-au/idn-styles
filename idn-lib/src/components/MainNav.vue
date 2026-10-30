<script lang="ts" setup>
import type { NavigationItem } from "@/types.ts";
import { ChevronDown, Menu } from "@lucide/vue";
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks } from "@/utils/consts.ts";

const props = withDefaults(defineProps<{
    navigation?: NavigationItem[];
}>(), {
    navigation: () => navLinks,
});
const router = useRouter();
const route = useRoute();

const linkClasses = "bg-transparent hover:bg-black/10 transition-colors";

const showSidenav = ref(false);

router.beforeEach(() => {
    showSidenav.value = false;
});
</script>

<template>
    <!-- mobile nav -->
    <Sheet v-model:open="showSidenav">
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" class="md:hidden bg-transparent hover:bg-black/10 transition-colors">
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent size="right" class="p-3">
            <RouterLink to="/" class="mr-auto">
                <img src="https://static.idnau.org/logos/idc/idc-logo.png" alt="IDC logo" class="w-48 h-auto">
            </RouterLink>
            <div class="flex flex-col gap-2 overflow-y-auto">
                <div v-for="link of props.navigation">
                    <Collapsible v-if="!!link.children && link.children.length > 1" :defaultOpen="link.active || route.path.startsWith(link.path)">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" :class="`text-sm font-medium bg-transparent hover:bg-black/10 transition-colors w-full data-active:!text-isu-red justify-between ${route.path.startsWith(link.path) ? '!text-isu-red' : ''}`">
                                {{ link.title }}
                                <ChevronDown class="size-4" />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div class="dark bg-secondary text-secondary-foreground p-2 gap-2 flex flex-col rounded-lg">
                                <Button v-for="child in link.children.filter(c => c.path !== link.path)" variant="ghost" :data-active="child.active || route.path === child.path || undefined" class="nav-link hover:!bg-background/30 transition-colors data-active:bg-background/50 hover:data-active:bg-background/50 justify-start text-ellipsis overflow-hidden" asChild>
                                    <RouterLink :to="child.path">
                                        <div class="leading-none font-medium text-sm">
                                            {{ child.title }}
                                        </div>
                                    </RouterLink>
                                </Button>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                    <Button v-else-if="link.button" variant="outline" :active="route.path === link.path" :class="cn('bg-transparent hover:bg-black/10 transition-colors border-isu-red w-full justify-start')" asChild>
                        <RouterLink :to="link.path">
                            {{ link.title }}
                        </RouterLink>
                    </Button>
                    <Button v-else variant="ghost" :active="route.path === link.path" :class="cn('bg-transparent hover:bg-black/10 transition-colors data-active:!text-isu-red w-full justify-start')" asChild>
                        <RouterLink :to="link.path">
                            {{ link.title }}
                        </RouterLink>
                    </Button>
                </div>
            </div>
        </SheetContent>
    </Sheet>
    <!-- desktop nav -->
    <NavigationMenu class="max-md:hidden **:data-[slot=navigation-menu-viewport]:bg-secondary **:data-[slot=navigation-menu-viewport]:border-none">
        <NavigationMenuList>
            <NavigationMenuItem v-for="link of props.navigation">
                <template v-if="!!link.children && link.children.length > 1">
                    <NavigationMenuTrigger :class="cn(linkClasses, 'data-[state=open]:hover:bg-black/20', link.active || route.path.startsWith(link.path) ? '!text-isu-red' : '')">
                        {{ link.title }}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent class="dark bg-secondary text-secondary-foreground p-4 gap-4 grid grid-cols-1 md:w-max rounded-lg">
                        <NavigationMenuLink v-for="child in link.children.filter(c => c.path !== link.path)" :active="child.active || route.path === child.path" class="nav-link hover:not-data-active:bg-background/30 transition-colors p-4 rounded-md data-active:bg-background/50 hover:data-active:bg-background/50" asChild>
                            <RouterLink :to="child.path">
                                <div class="leading-none font-medium text-base">
                                    {{ child.title }}
                                </div>
                            </RouterLink>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </template>
                <Button v-else-if="link.button" variant="outline" class="bg-transparent hover:bg-black/10 transition-colors border border-isu-red" asChild>
                    <RouterLink :to="link.path">
                        {{ link.title }}
                    </RouterLink>
                </Button>
                <NavigationMenuLink v-else :active="route.path === link.path" :class="cn(navigationMenuTriggerStyle(), 'bg-transparent hover:bg-black/10 transition-colors data-active:!text-isu-red')" asChild>
                    <RouterLink :to="link.path">
                        {{ link.title }}
                    </RouterLink>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>

<style scoped>
.nav-link {
    --active-color: hsl(4.55 65% 55%);
    &[data-active] {
        color: var(--active-color);
    }
}
</style>
