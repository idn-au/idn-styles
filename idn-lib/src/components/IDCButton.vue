<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { ButtonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const props = withDefaults(defineProps<{
    colour?: "primary" | "secondary" | "destructive" | "red" | "yellow" | "green" | "blue" | "black" | "tan";
    variant?: "ghost" | "solid" | "outline" | "text";
    size?: "xs" | "sm" | "md" | "lg";
    icon?: boolean;
    asChild?: boolean;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}>(), {
    variant: "solid",
    size: "md",
    colour: "primary",
});

const colourClasses: Record<typeof props.colour, Record<typeof props.variant, HTMLAttributes["class"]>> = {
    primary: {
        solid: "",
        outline: "border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
        ghost: "",
        text: "text-primary",
    },
    secondary: {
        solid: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        ghost: "",
        text: "text-secondary",
    },
    destructive: {
        solid: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-destructive text-destructive bg-transparent hover:bg-destructive hover:text-destructive-foreground",
        ghost: "",
        text: "text-destructive",
    },
    red: {
        solid: "bg-isu-red text-isu-red-foreground hover:bg-isu-red/90",
        outline: "border border-isu-red text-isu-red bg-transparent hover:bg-isu-red hover:text-isu-red-foreground",
        ghost: "",
        text: "text-isu-red",
    },
    yellow: {
        solid: "bg-isu-yellow text-isu-yellow-foreground hover:bg-isu-yellow/90",
        outline: "border border-isu-yellow text-isu-yellow bg-transparent hover:bg-isu-yellow hover:text-isu-yellow-foreground",
        ghost: "",
        text: "text-isu-yellow",
    },
    green: {
        solid: "bg-isu-green text-isu-green-foreground hover:bg-isu-green/90",
        outline: "border border-isu-green text-isu-green bg-transparent hover:bg-isu-green hover:text-isu-green-foreground",
        ghost: "",
        text: "text-isu-green",
    },
    blue: {
        solid: "bg-isu-blue text-isu-blue-foreground hover:bg-isu-blue/90",
        outline: "border border-isu-blue text-isu-blue bg-transparent hover:bg-isu-blue hover:text-isu-blue-foreground",
        ghost: "",
        text: "text-isu-blue",
    },
    black: {
        solid: "bg-isu-black text-isu-black-foreground hover:bg-isu-black/90",
        outline: "border border-isu-black text-isu-black bg-transparent hover:bg-isu-black hover:text-isu-black-foreground",
        ghost: "",
        text: "text-isu-black",
    },
    tan: {
        solid: "bg-tan-100 text-tan-100-foreground hover:bg-tan-100/90",
        outline: "border border-tan-100 text-tan-100 bg-transparent hover:bg-tan-100 hover:text-tan-100-foreground",
        ghost: "",
        text: "text-tan-100",
    },
};

const sizeClasses: Record<typeof props.size, Record<"default" | "icon", HTMLAttributes["class"]>> = {
    xs: {
        default: "text-xs h-6 px-2 py-1",
        icon: "text-xs size-6 p-1",
    },
    sm: {
        default: "",
        icon: "size-8",
    },
    md: {
        default: "",
        icon: "size-9",
    },
    lg: {
        default: "",
        icon: "size-10",
    },
};

const shadVariants: Record<typeof props.variant, ButtonVariants["variant"]> = {
    ghost: "ghost",
    solid: "default",
    outline: "default",
    text: "link",
};

const shadSizes: Record<typeof props.size, ButtonVariants["size"]> = {
    xs: "sm",
    sm: "sm",
    md: "default",
    lg: "lg",
};
</script>

<template>
    <Button
        :variant="shadVariants[props.variant]"
        :size="shadSizes[props.size]"
        :class="cn(colourClasses[props.colour][props.variant], sizeClasses[props.size][props.icon ? 'icon' : 'default'], props.class)"
        :disabled="props.disabled"
        :asChild="props.asChild"
    >
        <slot />
    </Button>
</template>
