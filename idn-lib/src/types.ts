export type Option = {
    label: string;
    value: string;
};

export type Banner = {
    type: "success" | "info" | "dev" | "warning" | "danger";
    message: string;
};

export interface FormInputBaseProps {
    type: "button" | "checkbox" | "color" | "date" | "datetime-local" | "date-optional" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "select" | "submit" | "tel" | "text" | "textarea" | "time" | "url" | "week";
    modelValue: any;
    id: string;
    label?: string;
    disabled?: boolean;
    description?: string;
    required?: boolean;
    validationFns?: ((modelValue?: any) => Promise<{ valid: boolean, invalidMessage: string }>)[]; // array of async functions
    tooltip?: string;
    clearButton?: boolean;
    placeholder?: string;
};

export interface CheckBoxInputProps extends FormInputBaseProps {
    type: "checkbox";
    modelValue: boolean | string[];
    multiple?: boolean;
    switch?: boolean;
    leftLabel?: string; // for switch
    rightLabel?: string; // for switch
    direction?: "row" | "column";
    options?: { // for multiple
        label?: string;
        leftLabel?: string; // for switch
        rightLabel?: string; // for switch
        value: string;
    }[];
};

export interface TextInputProps extends FormInputBaseProps {
    type: "button" | "color" | "email" | "file" | "hidden" | "image" | "number" | "password" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "url";
    modelValue: string;
};

export interface SelectInputProps extends FormInputBaseProps {
    type: "select";
    modelValue: string | string[];
    multiple?: boolean;
    options: Option[];
    allowAdd?: boolean;
    searchable?: boolean;
    chips?: boolean;
};

export interface RadioInputProps extends FormInputBaseProps {
    type: "radio";
    modelValue: string;
    options: Option[];
};

export interface TextareaInputProps extends FormInputBaseProps {
    type: "textarea";
    modelValue: string;
    resize?: "both" | "horizontal" | "vertical" | "none";
};

export interface DateInputProps extends FormInputBaseProps {
    type: "date" | "date-optional" | "datetime-local" | "month" | "time" | "week";
    modelValue: string;
    minYear?: number;
};

export interface FormInputProps extends FormInputBaseProps {
    multiple?: boolean;
    switch?: boolean;
    leftLabel?: string; // for switch
    rightLabel?: string; // for switch
    direction?: "row" | "column";
    options?: Option[] | { // for multiple
        label?: string;
        leftLabel?: string; // for switch
        rightLabel?: string; // for switch
        value: string;
    }[];
    allowAdd?: boolean;
    searchable?: boolean;
    chips?: boolean;
    resize?: "both" | "horizontal" | "vertical" | "none";
    minYear?: number;
};
