<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { DateInputProps } from "../../types";

const DEFAULT_MIN_YEAR = 1900;

type dateObj = {
    day: string;
    month: string;
    year: string;
};

const props = defineProps<DateInputProps>();

const emit = defineEmits(["update:modelValue", "blur", "focus", "validate"]);

const inFocus = ref(false);
const componentRef = ref<HTMLElement | null>(null);

const optionalDate = ref(stringToDateObj(props.modelValue));

const minimumYear = computed(() => {
    return props.minYear || DEFAULT_MIN_YEAR;
})

watch(() => props.modelValue, (newValue) => {
    optionalDate.value = stringToDateObj(newValue);
});

watch(optionalDate, (newValue) => {
    const newDate = dateObjToString(newValue);
    emit("update:modelValue", newDate);
    
}, { deep: true });

function dateObjToString(dateObj: dateObj) {
    let optionalValue = "";
    if (dateObj.year) {
        optionalValue += dateObj.year;

        if (dateObj.month) {
            optionalValue += `-${dateObj.month}`;

            if (dateObj.day) {
                optionalValue += `-${dateObj.day}`;
            }
        }
    }
    return optionalValue;
}

function stringToDateObj(s: string): dateObj {
    return {
        day: s.split("-")[2] || "",
        month: s.split("-")[1] || "",
        year: s.split("-")[0] || ""
    };
}

function updateValue(e: Event) {
    emit("update:modelValue", (e.target as HTMLInputElement).value); // for normal date type
}

function clearValue() {
    emit("update:modelValue", "");
    if (props.type === "date-optional") {
        optionalDate.value = {
            day: "",
            month: "",
            year: ""
        };
    }
    emit("validate", []);
}

async function validate() {
    let validationMessages = [];
    if (props.required && props.modelValue === "") {
        validationMessages.push(`${props.label} must not be empty.`);
    }

    if (props.modelValue.split("-").length === 3) {
        const [year, month, day] = props.modelValue.split("-");
        if (["02", "04", "06", "09", "11"].includes(month)) { // 30 days (or less for Feb)
            if (day === "31") {
                validationMessages.push("Invalid day for month");
            } else if (month === "02") {
                if (day === "30") {
                    validationMessages.push("Invalid day for month");
                } else if (day === "29" && Number(year) % 4 !== 0) { // not leap years
                    validationMessages.push("Invalid day for month");
                }
            }
        }
    }
    
    // run array of validation functions
    if (props.validationFns) {
        for (const func of props.validationFns) {
            // validation functions are now always async
            const result = await func(props.modelValue);
            if (!result.valid) {
                validationMessages.push(result.invalidMessage);
            }
        }
    }

    emit("validate", validationMessages);
}

function focus(e: Event) {
    if (componentRef.value) {
        inFocus.value = true;
        if (!e) { // clicking label (done with JS)
            componentRef.value.focus();
        }
        emit("focus");
    }
    
}

function blur(e: FocusEvent) {
    if (!(e.currentTarget as Node)!.parentElement!.contains(e.relatedTarget as Node)) {
        inFocus.value = false;
        validate();
        emit("blur");
    }
}

defineExpose({ clearValue, focus });
</script>

<template>
    <div v-if="props.type === 'date-optional'">
        <select
            :name="props.id + '-day'"
            :id="props.id + '-day'"
            class="optional-select"
            v-model="optionalDate.day"
            :disabled="props.disabled"
            ref="componentRef"
            @focus="focus"
            @blur="blur"
        >
            <option value="" hidden>dd</option>
            <option
                v-for="d in [...Array(31).keys()].map(d => `${d + 1 < 10 ? '0' : ''}${d + 1}`)"
                :value="d"
                :checked="optionalDate.day === d"
            >{{ d }}</option>
        </select>
        <span class="date-separator">/</span>
        <select
            :name="props.id + '-month'"
            :id="props.id + '-month'"
            class="optional-select"
            v-model="optionalDate.month"
            :disabled="props.disabled"
            @focus="focus"
            @blur="blur"
        >
            <option value="" hidden>mm</option>
            <option
                v-for="m in [...Array(12).keys()].map(m => `${m + 1 < 10 ? '0' : ''}${m + 1}`)"
                :value="m"
                :checked="optionalDate.month === m"
            >{{ m }}</option>
        </select>
        <span class="date-separator">/</span>
        <select
            :name="props.id + '-year'"
            :id="props.id + '-year'"
            class="optional-select"
            v-model="optionalDate.year"
            :disabled="props.disabled"
            @focus="focus"
            @blur="blur"
        >
            <option value="" hidden>yyyy</option>
            <option
                v-for="y in [...Array(new Date().getFullYear() - minimumYear + 1).keys()].map(y => y + minimumYear).sort((a, b) => b - a)"
                :value="y"
                :checked="optionalDate.year === y.toString()"
            >{{ y }}</option>
        </select>
    </div>
    <input
        v-else
        :type="props.type"
        :value="props.modelValue"
        @input="updateValue"
        :disabled="props.disabled"
        :id="props.id"
        :name="props.id"
        :required="props.required"
        @blur="blur"
        @focus="focus"
        ref="componentRef"
    />
</template>

<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";

select.optional-select {
    background-color: #fcfcfc;
    border: 1px solid #d4d4d4;
    border-radius: 4px;
}
.date-separator {
    margin: 0 4px;
    color: grey;
}
</style>