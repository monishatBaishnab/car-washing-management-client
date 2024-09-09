import { Label } from "keep-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaFolderOpen } from "react-icons/fa6";

type TCWSTextarea = {
    name: string;
    label?: string;
};

const CWSUpload = ({ name, label }: TCWSTextarea) => {
    const [fileTypeError, setFileTypeError] = useState<string | null>(null);
    return (
        <Controller
            name={name}
            render={({ field: { value, onChange, ...field }, fieldState: { error } }) => {
                const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const validTypes = ["image/jpeg", "image/png"];
                        if (!validTypes.includes(file.type)) {
                            setFileTypeError("File format must be JPG or PNG");
                            e.target.value = ""; // Clear the input
                            onChange(null); // Reset form value
                        } else {
                            setFileTypeError(null);
                            onChange(file); // Set the file in form
                        }
                    }
                };
                return (
                    <fieldset className="space-y-2">
                        {label ? <Label htmlFor={name}>{label}</Label> : null}
                        <div className="relative">
                            <label htmlFor={name} className="cursor-pointer">
                                <div className="flex items-center gap-2 p-3 border border-dashed border-slate-200 rounded-md hover:bg-gray-50">
                                    <div className="w-14 h-14 flex items-center justify-center bg-cws-yellow/20 rounded-full">
                                        <FaFolderOpen className="text-cws-yellow text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg text-slate-500 font-semibold">
                                            {value?.name ?? "Choose file to upload"}
                                        </h4>
                                        <p className="text-slate-400">JPG/PNG Format</p>
                                    </div>
                                </div>
                            </label>
                            <input
                                onChange={(e) => handleFileChange(e)}
                                value={value?.fileName}
                                className="hidden"
                                id={name}
                                type="file"
                                {...field}
                            />
                        </div>
                        {fileTypeError && <small className="text-red-500 block">{fileTypeError}</small>}
                        {error ? <small className="text-red-500 block">{error?.message}</small> : null}
                    </fieldset>
                );
            }}
        />
    );
};

export default CWSUpload;
