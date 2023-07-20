<script lang="ts" setup>

</script>

<template>
    <main>
        <div id="main-content">
            <slot></slot>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";
$padding: 20px;

main {
    display: flex;
    flex-grow: 1;

    #main-content {
        width: 100%;
        max-width: $maxPageWidth;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: $padding;
        gap: 12px;
    }
}
</style>
