<script setup>
import { onMounted, onUnmounted, useSlots } from "vue";

const emit = defineEmits(["modalClosed"]);

const slots = useSlots();

const onEscape = (e) => {
    if (e.key === "Escape") {
        emit("modalClosed");
    }
}

onMounted(() => {
    window.addEventListener("keyup", onEscape);
});

onUnmounted(() => {
    window.removeEventListener("keyup", onEscape);
});
</script>

<template>
    <div class="modal" @click.self="$emit('modalClosed')">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-header-third">
                    <slot name="headerLeft"></slot>
                </div>
                <div class="modal-header-third middle">
                    <slot name="headerMiddle"></slot>
                </div>
                <div class="modal-header-third">
                    <slot name="headerRight"></slot>
                    <span @click="$emit('modalClosed')" class="modal-close" title="Close"><i class="fa-light fa-xmark"></i></span>
                </div>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer" v-if="!!slots.footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/sass/_variables.scss";

.modal {
    // display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 9999; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: hidden; /* Enable scroll if needed */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

    .modal-content {
        background-color: white;
        margin: 15% auto; /* 15% from the top and centered */
        // padding: 20px;
        // border: 1px solid #888;
        width: 60%; /* Could be more or less, depending on screen size */
        display: flex;
        flex-direction: column;
        border-radius: $borderRadius;
        max-height: 90%;

        .modal-header {
            display: flex;
            flex-direction: row;
            // justify-content: space-between;
            align-items: center;
            padding: 8px;
            gap: 8px;

            .modal-header-third {
                display: flex;
                flex-direction: row;
                gap: 8px;
                align-items: center;
                
                &:not(.middle) {
                    flex-basis: 0;
                    flex-grow: 1;
                }

                :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
                    margin-top: 0;
                    margin-bottom: 0;
                }
            }

            .modal-close {
                padding: 8px;
                color: #929292;
                cursor: pointer;
                margin-left: auto;

                &:hover {
                    color: #afafaf;
                }
            }
        }

        .modal-body {
            display: flex;
            flex-direction: column;
            padding: 8px;
            gap: 8px;
            overflow-y: auto;
        }

        .modal-footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            // flex-flow: row-reverse;
        }
    }
}
</style>
