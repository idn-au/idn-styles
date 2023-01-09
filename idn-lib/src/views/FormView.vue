<script setup>
import { ref } from "vue";
import FormField from "@/components/form/FormField.vue";
import FormInput from "@/components/form/FormInput.vue";

// const customDate = ref({
//     day: "",
//     month: "",
//     year: "" 
// });
const date = ref("");
const startDate = ref("");
const endDate = ref("");
const textarea = ref("");
const selected = ref("")
const combo = ref([]);
const text = ref("");
const checked = ref(false);
const checkedMultiple = ref([]);
const radio = ref("");
const dateOptional = ref("2020-02-02");

const comboOptions = [
    {
        label: "Label 1",
        value: "value1"
    },
    {
        label: "Label 2sadasdasasd",
        value: "value2"
    },
    {
        label: "Label 3",
        value: "value3"
    },
    {
        label: "Label 4",
        value: "value4"
    },
    {
        label: "Label 5",
        value: "value5"
    },
    {
        label: "Label 6",
        value: "value6"
    },
    {
        label: "Label 7",
        value: "value7"
    },
    {
        label: "Label 8",
        value: "value8"
    },
    {
        label: "Label 9",
        value: "value9"
    },
];

function validateText(s) {
    if (s !== "" && !s.startsWith("s")) {
        return [false, "Field must start with 's'."];
    } else {
        return [true, ""];
    }
}
</script>

<template>
    <div>
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
        <br/>
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
        </FormInput> -->
        <!-- <div :style="{ width: '300px' }">
            <ComboBox :options="comboOptions" :multiple="true" />
        </div> -->
        <!-- <FormField label="Spatial">
            <FormInput
                type="checkbox"
                v-model="checked"
                leftLabel="Left"
                rightLabel="Right"
                id="checkbox-field"
                switch
            />
            <FormInput
                type="text"
                v-model="text"
                label="Text Label"
                :clearButton="true"
                placeholder="Placeholder"
                description="Description"
                id="text-field"
                :validation="[validateText]"
                required
            >
                <template #prepend>
                    <button>P</button>
                </template>
                <template #append>
                    <button>A</button>
                </template>
                <template #tooltip><b>HTML content</b></template>
            </FormInput>
        </FormField>
        <FormField label="Temporal" direction="row" description="Description">
            <FormInput
                type="date"
                v-model="startDate"
                label="Start"
                :clearButton="true"
                id="date-start-field"
            >
            </FormInput>
            <FormInput
                type="date"
                v-model="endDate"
                label="End"
                :clearButton="true"
                id="date-end-field"
            >
            </FormInput>
            <template #tooltip><b>HTML content</b></template>
        </FormField>
        <FormInput
            type="date-optional"
            v-model="dateOptional"
            label="Date optional"
            :clearButton="true"
            id="date-optional"
            :minYear="1850"
        >
            <template #tooltip><b>HTML content</b></template>
        </FormInput> -->
        <!-- <FormInput
            type="select"
            v-model="combo"
            :options="comboOptions"
            label="Combo Label"
            :clearButton="true"
            description="Description"
            id="combo-field"
            multiple
            searchable
            allowAdd
        /> -->
        <button @click="dateOptional='2022-07-14'">set date</button>
        <FormInput
            type="date-optional"
            v-model="dateOptional"
            label="Date optional"
            :clearButton="true"
            id="date-optional"
            :minYear="1850"
        >
            <template #tooltip><b>HTML content</b></template>
        </FormInput>
        <!-- <Input
            type="select"
            v-model="combo"
            :options="comboOptions"
            label="Combo Label"
            :clearButton="true"
            description="Description"
            id="combo-field"
            multiple
            searchable
            chips
        >
            <template #before>Before</template>
            <template #prepend>
                <button>P</button>
            </template>
            <template #append>
                <button>A</button>
            </template>
            <template #after>After</template>
            <template #tooltip><b>HTML content</b></template>
        </Input>
        <Input
            type="select"
            v-model="selected"
            :options="comboOptions"
            label="Select Label"
            :clearButton="true"
            description="Description"
            id="select-field"
            disabled
        >
            <template #before>Before</template>
            <template #prepend>
                <button>P</button>
            </template>
            <template #append>
                <button>A</button>
            </template>
            <template #after>After</template>
            <template #tooltip><b>HTML content</b></template>
        </Input>
        <Input
            type="textarea"
            v-model="textarea"
            label="Textarea Label"
            :clearButton="true"
            placeholder="Placeholder"
            description="Description"
            id="textarea-field"
        >
            <template #before>Before</template>
            <template #prepend>
                <button>P</button>
            </template>
            <template #append>
                <button>A</button>
            </template>
            <template #after>After</template>
            <template #tooltip><b>HTML content</b></template>
        </Input>
        <Input
            type="date"
            v-model="date"
            label="Date Label"
            :clearButton="true"
            placeholder="Placeholder"
            description="Description"
            id="date-field"
        >
            <template #before>Before</template>
            <template #prepend>
                <button>P</button>
            </template>
            <template #append>
                <button>A</button>
            </template>
            <template #after>After</template>
            <template #tooltip><b>HTML content</b></template>
        </Input>
        
        
        <Input
            type="radio"
            v-model="radio"
            label="Radio Label"
            id="radio-field"
            :options="comboOptions"
            clearButton
        /> -->
        <!-- <FormInput
            type="checkbox"
            v-model="checkedMultiple"
            label="Checkbox multiple Label"
            id="checkbox-multiple-field"
            :options="comboOptions"
            multiple
            clearButton
            switch
            direction="row"
        /> -->
    </div>
</template>

<style lang="scss" scoped>
.bar { 
    height: 2000px;
    background-color: grey;
    width: 75%;
}
</style>