<script setup>
import { ref, computed } from "vue";
import FormField from "@/components/form/FormField.vue";
import FormInput from "@/components/form/FormInput.vue";

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

const validation = ref({}); // { key: isValid, ... }

const isValid = computed(() => {
    return Object.values(validation.value).every(Boolean);
});

function validateText(s) {
    if (s !== "" && !s.startsWith("s")) {
        return [false, "Field must start with 's'."];
    } else {
        return [true, ""];
    }
}

function handleValidate(key, isValid) {
    validation.value[key] = isValid;
    
}
</script>

<template>
    <div>
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

        <FormField label="Spatial">
            <!-- <FormInput
                type="checkbox"
                v-model="checked"
                leftLabel="Left"
                rightLabel="Right"
                id="checkbox-field"
                switch
            /> -->
            <FormInput
                type="text"
                v-model="text"
                label="Text Label"
                :clearButton="true"
                placeholder="Placeholder"
                description="Description"
                id="text-field"
                :validationFns="[validateText]"
                required
                @validate="handleValidate('text', $event)"
            >
                <!-- <template #prepend>
                    <button>P</button>
                </template>
                <template #append>
                    <button>A</button>
                </template>
                <template #tooltip><b>HTML content</b></template> -->
            </FormInput>
        </FormField>

        <!-- <FormField label="Temporal" direction="row" description="Description">
            <FormInput
                type="date"
                v-model="startDate"
                label="Start"
                :clearButton="true"
                id="date-start-field"
                required
                @validate="handleValidate('date', $event)"
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
        </FormField> -->
        <!-- <FormInput
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

        <!-- <button @click="dateOptional='2022-07-14'">set date</button>
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
        </FormInput> -->

        <!-- <FormInput
            type="select"
            v-model="selected"
            :options="comboOptions"
            label="Select Label"
            :clearButton="true"
            description="Description"
            id="select-field"
            required
            @validate="handleValidate('select', $event)"
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
        </FormInput> -->

        <!-- <FormInput
            type="textarea"
            v-model="textarea"
            label="Textarea Label"
            :clearButton="true"
            placeholder="Placeholder"
            description="Description"
            id="textarea-field"
            required
            @validate="handleValidate('textarea', $event)"
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
        </FormInput> -->

        <!-- <FormInput
            type="date-optional"
            v-model="date"
            label="Date Label"
            :clearButton="true"
            placeholder="Placeholder"
            description="Description"
            id="date-field"
            required
            @validate="handleValidate('date', $event)"
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
        </FormInput> -->

        <!-- <FormInput
            type="radio"
            v-model="radio"
            label="Radio Label"
            id="radio-field"
            :options="comboOptions"
            clearButton
            required
            @validate="handleValidate('radio', $event)"
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
            required
            @validate="handleValidate('checkbox', $event)"
        /> -->

        <pre>{{ JSON.stringify(validation, undefined, 2) }}</pre>
        <pre>valid: {{ isValid }}</pre>
    </div>
</template>

<style lang="scss" scoped>
.bar { 
    height: 2000px;
    background-color: grey;
    width: 75%;
}
</style>