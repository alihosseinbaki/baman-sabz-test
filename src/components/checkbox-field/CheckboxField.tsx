import { ReactNode } from "react";
import { Field, Checkbox, Label } from "@headlessui/react";

type CheckboxFieldProps = {
    checked: boolean;
    onChange: (value: boolean) => void;
    label: ReactNode;
    className?: string;
};

export function CheckboxField(
    {
        checked,
        onChange,
        label,
        className,
    }: CheckboxFieldProps) {

    return (
        <Field className={`flex items-center gap-2 ${className ?? ""}`}>
            <Checkbox
                checked={checked}
                onChange={onChange}
                className="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-white data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
            >
                <svg
                    className="hidden size-4 fill-black group-data-checked:block"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd"></path>
                </svg>
            </Checkbox>
            <Label>{label}</Label>
        </Field>
    );
}
