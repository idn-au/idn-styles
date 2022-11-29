<script setup>
import { ref } from "vue";
import FormInput from "@/components/FormInput.vue";

// const customDate = ref({
//     day: "",
//     month: "",
//     year: "" 
// });
const date = ref("");
const selected = ref("")
</script>

<template>
    <div>
        <h1>This is a h1</h1>
        <h2>This is a h2</h2>
        <h3>This is a h3</h3>
        <h4>This is a h4</h4>
        <h5>This is a h5</h5>
        <h6>This is a h6</h6>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, molestiae. Tempore deleniti iusto reprehenderit aut laudantium ad quos velit quidem. Totam iste quis libero quas incidunt tempora fuga, reiciendis impedit.</p>
        <a href="/something">This is a link</a>
        <br/>
        <a href="/something" target="_blank">This is an external link</a> some text after
        <!-- <FormInput label="Select" type="select" v-model="selected" :options="[{'label': 'option 1', 'value': '1'}, {'label': 'option 2', 'value': '2'},]" :clearButton="true" />
        <FormInput label="Select" placeholder="placeholder" type="select" v-model="selected" :options="[{'label': 'option 3', 'value': '3'}, {'label': 'option 4', 'value': '4'},]" /> -->
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
        <!-- <FormInput
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
        </FormInput> -->
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