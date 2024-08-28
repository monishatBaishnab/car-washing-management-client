import { Input, InputIcon, Label } from "keep-react";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

type TCWSInput = {
    name: string;
    label?: string;
    type: string;
    placeholder: string;
    icon?: ReactNode;
};

const CWSInput = ({ name, label, type, placeholder, icon }: TCWSInput) => {
    return (
        <Controller
            name={name}
            render={({ field: { value='', ...field }, fieldState: { error } }) => (
                <fieldset className="space-y-1">
                    {label ? <Label htmlFor={name}>{label}</Label> : null}
                    <div className="relative">
                        <Input
                            {...field}
                            value={value}
                            type={type}
                            placeholder={placeholder}
                            className={`${icon ? "ps-11" : ""}`}
                        />
                        {icon ? <InputIcon>{icon}</InputIcon> : null}
                    </div>
                    {error ? <small>{error?.message}</small> : null}
                </fieldset>
            )}
        />
    );
};

export default CWSInput;
