<script setup>
import { ref } from "vue";
import FormInput from "@/components/FormInput.vue";

// const customDate = ref({
//     day: "",
//     month: "",
//     year: "" 
// });
const date = ref("");
</script>

<template>
    <div>
        <!-- <FormInput
            type="date-optional"
            v-model="customDate"
            label="Start date"
            :clearButton="true"
            tooltip="This is a tooltip"
            description="This is a description"
        >
            <template #before>before</template>
            <template #prepend>
                <button>a</button>
            </template>
            <template #append>
                <button>a</button>
            </template>
            <template #after>after</template>
        </FormInput>
        <br/> -->
        <FormInput
            type="date"
            v-model="date"
            label="Default date"
            :clearButton="true"
            tooltip="This is a tooltip"
            description="This is a description"
        >
            <template #before>before</template>
            <template #prepend>
                <button>a</button>
            </template>
            <template #append>
                <button>a</button>
            </template>
            <template #after>after</template>
        </FormInput>
    </div>
    <div class="bar">

    </div>
</template>

<style lang="scss" scoped>
.bar { 
    height: 2000px;
    background-color: grey;
    width: 75%;
}
</style>