<script lang="ts" setup>
import { Menu } from "@lucide/vue";
import IDCButton from "@/components/IDCButton.vue";
import IDCFooter from "@/components/IDCFooter.vue";
import IDCHeader from "@/components/IDCHeader.vue";
import IDCPageHeader from "@/components/IDCPageHeader.vue";
</script>

<template>
    <div class="min-h-dvh">
        <IDCHeader />
        <IDCPageHeader>
            <template #title>
                Title
            </template>
            <template #description>
                Description
            </template>
        </IDCPageHeader>
        <div class="max-w-[1200px] mx-auto p-2">
            <h1 class="text-5xl">
                Title h1
            </h1>
            <h2 class="text-3xl">
                Subtitle h2
            </h2>
            <h3 class="text-2xl">
                Subtitle h3
            </h3>
            <h4 class="text-xl">
                Subtitle h4
            </h4>
            <h5 class="text-lg font-bold">
                Subtitle h5
            </h5>
            <h6 class="font-bold">
                Subtitle h6
            </h6>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <a href="">Link</a>
            <div class="grid grid-cols-4">
                <div class="grid grid-cols-2">
                    <div class="bg-isu-red text-isu-red-foreground">
                        red
                    </div>
                    <div class="dark bg-isu-red text-isu-red-foreground">
                        dark
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="bg-isu-yellow text-isu-yellow-foreground">
                        yellow
                    </div>
                    <div class="dark bg-isu-yellow text-isu-yellow-foreground">
                        dark
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="bg-isu-green text-isu-green-foreground">
                        green
                    </div>
                    <div class="dark bg-isu-green text-isu-green-foreground">
                        dark
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="bg-isu-blue text-isu-blue-foreground">
                        blue (primary)
                    </div>
                    <div class="dark bg-isu-blue text-isu-blue-foreground">
                        dark
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="bg-tan-100 text-tan-100-foreground">
                        tan (100%)
                    </div>
                    <div class="dark bg-tan-100 text-tan-100-foreground">
                        dark
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="bg-tan-75 text-tan-75-foreground">
                        tan (75%)
                    </div>
                    <div class="dark bg-tan-75 text-tan-75-foreground">
                        dark
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="bg-tan-50 text-tan-50-foreground">
                        tan (50%)
                    </div>
                    <div class="dark bg-tan-50 text-tan-50-foreground">
                        dark
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="bg-tan-25 text-tan-25-foreground">
                        blue (25%, background)
                    </div>
                    <div class="dark bg-tan-25 text-tan-25-foreground">
                        dark
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="bg-isu-black text-isu-black-foreground">
                        blue (background)
                    </div>
                    <div class="dark bg-isu-black text-isu-black-foreground">
                        dark
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-4 max-w-[600px]">
                <template v-for="colour in ['primary', 'secondary', 'destructive', 'red', 'yellow', 'green', 'blue', 'black', 'tan']">
                    <template v-for="variant in ['solid', 'outline']">
                        <IDCButton :colour="colour" :variant="variant">
                            {{ colour }}
                            {{ variant }}
                        </IDCButton>
                    </template>
                </template>
                <template v-for="size in ['xs', 'sm', 'md', 'lg']">
                    <template v-for="icon in [false, true]">
                        <IDCButton :size="size" :icon="icon">
                            <Menu v-if="icon" />
                            <template v-else>
                                {{ size }}
                            </template>
                        </IDCButton>
                    </template>
                </template>
            </div>
        </div>
        <IDCFooter />
    </div>
</template>
