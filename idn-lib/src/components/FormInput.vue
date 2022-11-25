<script setup>
import { computed, ref, useSlots } from "vue";
import ToolTip from "@/components/ToolTip.vue";

const slots = useSlots();

const props = defineProps({
    modelValue: {
        required: true
    },
    label: String,
    placeholder: String,
    description: String,
    type: {
        type: String,
        required: true
    },
    tooltip: String,
    options: Array,
    id: String,
    required: Boolean,
    invalidMessage: Array,
    multiple: Boolean,
    clearButton: Boolean,
    disabled: Boolean,
    // maxlength: Number
});

const emit = defineEmits(["update:modelValue", "onBlur"]);

const inFocus = ref(false);
const inputRef = ref(null);

const isInvalid = computed(() => {
    if (props.invalidMessage === undefined) { // not provided
        return false;
    } else {
        if (props.invalidMessage.length > 0) {
            return true;
        } else {
            return false;
        }
    }
});

const labelIsFloating = computed(() => {
    if (props.modelValue !== "") {
        return true;
    } else if (props.type === "date") {
        return true;
    // } else if (props.type === "date-optional") {
    //     return true;
    } else if (props.type === "select") {
        if (!!props.placeholder) {
            return true;
        } else {
            return false;
        }
    } else if (inFocus.value) {
        return true;
    } else {
        return false;
    }
});

// const propYear = ref(props.modelValue.year)

// const dateModelYearValue = computed({
//     get(){
//         let y = ""
//         if (propYear.value.match(/[0-9]{4}/)) {
//             console.log("year")
//             y = props.modelValue.year;
//             console.log(y);
//          return y;
//          }else {
//             console.log("year return replaced")
//             return propYear.value.split("").filter(x=>x.match(/[0-9]/)).join("")//replace(/\D/,"")
//          }
         
//     },
//     set(newV){
//         console.log(newV)
//         if (!newV.match(/[0-9]{1,4}/)) {
//             console.log("bad year set ")
//             newV = ""
//         }
//         newV = newV.split("").filter(x=>x.match(/[0-9]/)).join("")
//         let d = {...props.modelValue,year:newV}
//         emit("update:modelValue", d);
//     }
// })
// const dateModelValue = computed({
//     get() {
//         if (props.type === "date-optional") {
//             let d = {
//                 day: "",
//                 month: "",
//                 year: ""
//             };

//             if (props.modelValue.day.match(/[0-9]{1,2}/)) {
//                 console.log("day")
//                 let dayNumber = Number(props.modelValue.day);
//                 if (1 <= dayNumber && dayNumber <= 31) {
//                     d.day = props.modelValue.day;
//                 }
//             }

//             if (props.modelValue.month.match(/[0-9]{1,2}/)) {
//                 console.log("month")
//                 let monthNumber = Number(props.modelValue.month);
//                 if (1 <= monthNumber && monthNumber <= 12) {
//                     d.month = props.modelValue.month;
//                 }
//             }

//             // if (props.modelValue.year.match(/[0-9]{4}/)) {
//             //     console.log("year")
//             //     d.year = props.modelValue.year;
//             // }

//             console.log(d);

//             return d;
//         } else {
//             console.log("null")
//             return null;
//         }
//     },
//     set(newValue) {
//         console.log(newValue)
//         if (!newValue.year.match(/[0-9]{1,4}/)) {
//             console.log("bad year set ")
//             return
//         }

//         emit("update:modelValue", newValue);
//     }
// });

function updateValue(e) {
    if (props.type === "select" && props.multiple === true) {
        let selected = Array.from(e.target.selectedOptions).map(option => option.value);
        emit("update:modelValue", selected);
    } else if (props.type === "checkbox") {
        if (props.multiple === true) {
            let value = [...props.modelValue];
            let index = value.indexOf(e.target.value);
            if (e.target.checked) { // add
                if (index === -1) {
                    value.push(e.target.value);
                }
            } else { // remove
                if (index > -1) {
                    value.splice(index, 1);
                }
            }
            emit("update:modelValue", value);
        } else {
            emit("update:modelValue", e.target.checked);
        }
    // } else if (props.type === "date-optional") {
        // do nothing
    } else {
        emit("update:modelValue", e.target.value);
    }
}

function clearValue() {
    if ((props.type === "select" || props.type === "checkbox") && props.multiple === true) {
        emit("update:modelValue", []);
    } else if (props.type === "checkbox" && props.multiple === false) {
        emit("update:modelValue", false);
    // } else if (props.type === "date-optional") {
    //     emit("update:modelValue", {day: "", month: "", year: ""});
    } else {
        emit("update:modelValue", "");
    }
}

// for shifting focus on maxlength
// function customDateChange(e, field) {
//     if ((field === "day" || field === "month") && e.target.value.length === e.target.maxLength) {
//         document.getElementById(`${props.id}-${field === 'day' ? 'month' : 'year'}`).focus();
//     }
// }
</script>
    
<template>
    <div class="form-input">
        <div class="form-input-row">
            <slot name="before"></slot>
            <div :class="`form-input-content ${(props.type === 'checkbox' || props.type === 'radio') ? 'check-radio' : 'text-like'} ${(props.type === 'select' || props.type === 'date') ? 'no-cursor' : ''} ${inFocus ? 'focus' : ''} ${isInvalid ? 'invalid' : ''} ${props.disabled === true ? 'disabled' : ''}`">
                <div class="input-prepend" v-if="!!slots.prepend">
                    <slot name="prepend"></slot>
                </div>
                <div :class="`input-item ${!!slots.prepend ? '' : 'radius-left'} ${!!slots.append ? '' : 'radius-right'}`" @click="inputRef && inputRef.focus()">
                    <label
                        v-if="props.label && !(props.type === 'checkbox' && props.multiple === false)"
                        :class="`input-label ${labelIsFloating ? 'float' : ''}`"
                        :for="props.id"
                    >
                        {{ props.label }} <span v-if="props.required === true" class="required">*</span>
                    </label>
                    <template v-if="props.type === 'checkbox'">
                        <div v-if="props.multiple === true" class="checkbox-list">
                            <div v-for="option in props.options" class="checkbox-item">
                                <input
                                    type="checkbox"
                                    :value="option.value"
                                    :checked="props.modelValue.includes(option.value)"
                                    @change="updateValue($event); $emit('onBlur')"
                                    :name="option.value"
                                    :id="option.value"
                                />
                                <label :for="option.value">{{ option.label }}</label>
                            </div>
                        </div>
                        <div v-else class="checkbox-item">
                            <input
                                type="checkbox"
                                :checked="props.modelValue"
                                @change="updateValue($event); $emit('onBlur')"
                                :name="props.id"
                                :id="props.id"
                            />
                            <label :for="props.id">{{ props.label }}</label>
                        </div>
                    </template>
                    <select
                        v-else-if="type === 'select'"
                        class="input"
                        ref="inputRef"
                        @focus="inFocus = true"
                        @blur="inFocus = false; $emit('onBlur')"
                        :selected="props.modelValue"
                        @change="updateValue"
                        :name="props.id"
                        :id="props.id"
                        :disabled="props.disabled === true"
                        :multiple="props.multiple === true"
                    >
                        <option v-if="props.placeholder" value="" selected disabled hidden>{{ props.placeholder }}</option>
                        <option v-for="option in props.options" :value="option.value">{{ option.label }}</option>
                    </select>
                    <textarea
                        v-else-if="type === 'textarea'"
                        class="input"
                        ref="inputRef"
                        :name="props.id"
                        :id="props.id"
                        rows="3"
                        @focus="inFocus = true"
                        @blur="inFocus = false; $emit('onBlur')"
                        :value="props.modelValue"
                        @input="updateValue"
                        :placeholder="(props.placeholder && inFocus && props.modelValue === '') ? props.placeholder : undefined"
                        :disabled="props.disabled === true"
                    ></textarea>
                    <!-- <div v-else-if="type === 'date-optional'" class="date-optional">
                        <FormInput
                            type="text"
                            label="Day"
                            v-model="dateModelValue.day"
                            placeholder="DD"
                            :maxlength="2"
                            :id="`${props.id}-day`"
                            @input=" customDateChange($event, 'day');"
                        />
                        <span>/</span>
                        <FormInput
                            type="text"
                            label="Month"
                            v-model="dateModelValue.month"
                            placeholder="MM"
                            :maxlength="2"
                            :id="`${props.id}-month`"
                            @input=" customDateChange($event, 'month');"
                        />
                        <span>/</span>
                        <FormInput
                            type="text"
                            label="Year"
                            v-model.number="dateModelYearValue"
                            placeholder="YYYY"
                            :maxlength="4"
                            :id="`${props.id}-year`"
                            @input=" customDateChange($event, 'year');"
                        />
                    </div> -->
                    <input
                        v-else
                        class="input"
                        ref="inputRef"
                        :type="props.type"
                        @focus="inFocus = true"
                        @blur="inFocus = false; $emit('onBlur')"
                        :value="props.modelValue"
                        @input="updateValue"
                        :name="props.id"
                        :id="props.id"
                        :placeholder="(props.placeholder && inFocus && props.modelValue === '') ? props.placeholder : undefined"
                        :disabled="props.disabled === true"
                        :maxlength="props.maxlength"
                    />
                </div>
                <button
                    class="input-clear-btn"
                    v-if="props.clearButton === true"
                    @click="clearValue"
                    title="Clear field"
                    :disabled="props.disabled === true"
                >
                    <i class="fa-regular fa-xmark"></i>
                </button>
                <div class="input-append" v-if="!!slots.append">
                    <slot name="append"></slot>
                </div>
            </div>
            <slot name="after"></slot>
            <ToolTip v-if="!!props.tooltip">
                <i class="fa-regular fa-circle-question"></i>
                <template #text>{{ props.tooltip }}</template>
            </ToolTip>
        </div>
        <div class="form-input-desc" v-if="props.description">{{ props.description }}</div>
        <div class="form-input-invalid" v-if="isInvalid">{{ props.invalidMessage[0] }}</div>
    </div>
</template>
    
<style lang="scss" scoped>
@import "@/assets/sass/_variables.scss";
@import "@/assets/sass/_mixins.scss";

$inputBg: #f7f7f7;
$focus: #3780ee;
$pendMinWidth: 36px;
$borderColor: #c4c4c4;
$invalidColor: red;
$disabledColor: #d8d8d8;
$labelColor: #5c5c5c;
$labelFloatColor: rgba($color: $labelColor, $alpha: 0.8);

.form-input {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .form-input-row {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        gap: 8px;

        .form-input-content {
            display: flex;
            flex-direction: row;
            width: 100%;
            overflow: hidden;

            .input-prepend {
                display: flex;
                flex-direction: row;
                align-items: stretch;

                & > :deep(*):not(.modal) {
                    min-width: $pendMinWidth;
                    border: none;
                    // border-right: 1px solid grey;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }

            .input-item {
                flex-grow: 1;
                display: flex;
                position: relative;
                cursor: text;

                label.input-label {

                    .required {
                        color: red;
                    }
                }

                .input {
                    border: none;
                    flex-grow: 1;
                    outline: none;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
            }

            button.input-clear-btn {
                background-color: transparent;
                border: none;
                cursor: pointer;
                padding: 6px 12px;
                color: grey;
                @include transition(color);

                &:hover {
                    color: black;
                }
            }

            .input-append {
                display: flex;
                flex-direction: row;
                align-items: stretch;

                & > :deep(*):not(.modal) {
                    min-width: $pendMinWidth;
                    border: none;
                    // border-left: 1px solid grey;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }

        :deep(.tooltip) {
            margin: 0 12px;
        }
    }

    .form-input-desc {
        font-size: small;
        color: grey;
    }
    
    .form-input-invalid {
        font-size: small;
        color: $invalidColor;
    }
}

.form-input-content {
    // text, textarea, select, etc.
    &.text-like {
        align-items: stretch;
        border: 1px solid $borderColor;
        border-radius: $borderRadius;
        background-color: $inputBg;
        @include transition(box-shadow);

        &.focus {
            box-shadow: 0px 0px 6px 2px rgba($color: $focus, $alpha: 0.4);
        }

        &.invalid {
            border-color: $invalidColor;
        }

        .input-prepend {
            & > :deep(*:first-child) {
                border-top-left-radius: $borderRadius;
                border-bottom-left-radius: $borderRadius;
            }
        }

        .input-item {
            // padding: 0 8px;

            &.radius-left {
                &, label.input-label, .input {
                    border-top-left-radius: $borderRadius;
                    border-bottom-left-radius: $borderRadius;
                }
            }

            &.radius-right {
                &, label.input-label, .input {
                    border-top-right-radius: $borderRadius;
                    border-bottom-right-radius: $borderRadius;
                }
            }

            label.input-label {
                padding-left: 8px;
                position: absolute;
                transform-origin: top left;
                transform: translate(0, 11px) scale(1);
                @include transitionAll(all .1s ease-in-out);
                color: $labelColor;

                &.float {
                    color: $labelFloatColor;
                    transform: translate(0, 2px) scale(.75);
                }
            }

            .input {
                padding: 18px 18px 8px 8px;
                background-color: $inputBg;
            }
        }

        &:not(.no-cursor) label.input-label {
            cursor: text;
        }

        .input-append {
            & > :deep(*:last-child):not(.modal) {
                border-top-right-radius: $borderRadius;
                border-bottom-right-radius: $borderRadius;
            }
        }

        &.disabled {
            background-color: $disabledColor;

            :deep(button) {
                cursor: default !important;
            }

            .input-item {
                cursor: default;

                label.input-label {
                    cursor: default;
                }

                .input {
                    background-color: $disabledColor;
                }
            }
        }
    }

    // checkbox & radio
    &.check-radio {
        .input-prepend, .input-append {
            height: 44px;
        }

        .input-item {
            cursor: unset !important;
            flex-direction: column;

            label.input-label {
                padding: 12px 0;
            }

            .checkbox-list {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .checkbox-item {
                display: flex;
                flex-direction: row;
                gap: 6px;
                align-items: center;
            }
        }
    }

    &.disabled {
        // buttons
    }
}

textarea.input {
    resize: vertical;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

select.input {
    &[multiple] {
        resize: none;
    }
}

// .date-optional {
//     display: flex;
//     flex-direction: row;
//     gap: 6px;
//     align-items: center;
//     padding: 16px 6px 6px 6px;
//     flex-grow: 1;

//     .form-input {
//         flex: 1;

//         .form-input-content {
//             border-color: #dddddd;
//         }

//         label {
//             font-size: 0.9em;
//             transform: translate(0, 8px) scale(1) !important;

//             &.float {
//                 transform: translate(0, 2px) scale(.75) !important;
//             }
//         }

//         .input {
//             background-color: white !important;
//             font-size: 0.75em;
//             padding: 12px 6px 2px 6px !important;
//         }
//     }
// }
</style>