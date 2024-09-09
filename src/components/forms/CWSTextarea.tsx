import {  Label, Textarea } from "keep-react";
import { Controller } from "react-hook-form";

type TCWSTextarea = {
    name: string;
    label?: string;
    placeholder: string;
};

const CWSTextarea = ({ name, label, placeholder }: TCWSTextarea) => {
    return (
        <Controller
            name={name}
            render={({ field: { value = "", ...field }, fieldState: { error } }) => {
                return (
                    <fieldset className="space-y-1">
                        {label ? <Label htmlFor={name}>{label}</Label> : null}
                        <div className="relative">
                            <Textarea
                            className="placeholder:text-metal-200"
                                {...field}
                                value={value}
                                placeholder={placeholder}
                            />
                        </div>
                        {error ? <small className="text-red-500">{error?.message}</small> : null}
                    </fieldset>
                );
            }}
        />
    );
};

export default CWSTextarea;
