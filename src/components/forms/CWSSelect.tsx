import { Label } from "keep-react";
import { Controller } from "react-hook-form";
import Select from "react-select";
type TOption = { label: string; value: string };

type TCWSSelect = {
    name: string;
    label?: string;
    options: TOption[];
};

const CWSSelect = ({ name, label, options }: TCWSSelect) => {
    return (
        <Controller
            name={name}
            render={({ field: { value, onChange, ...field }, fieldState: { error } }) => {
                const defaultValue = options?.find((option) => option.value == value);
                return (
                    <fieldset className="space-y-1">
                        {label ? <Label htmlFor={name}>{label}</Label> : null}
                        <div className="relative">
                            <Select
                                classNames={{
                                    input: () => "border-slat-200",
                                }}
                                options={options}
                                defaultValue={defaultValue}
                                onChange={(item) => onChange(item?.value)}
                                {...field}
                            />
                        </div>
                        {error ? <small className="text-red-500">{error?.message}</small> : null}
                    </fieldset>
                );
            }}
        />
    );
};

export default CWSSelect;
