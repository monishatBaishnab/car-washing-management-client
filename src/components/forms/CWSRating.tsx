import {Label, Rating, RatingStar } from "keep-react";
import { Controller } from "react-hook-form";

type TCWSRating = {
    name: string;
    label?: string;
};

const CWSRating = ({ name, label }: TCWSRating) => {
    return (
        <Controller
            name={name}
            render={({ field: { onChange, ...field }, fieldState: { error } }) => {
                return (
                    <fieldset className="space-y-1">
                        {label ? <Label htmlFor={name}>{label}</Label> : null}
                        <div className="relative">
                            <Rating handleRating={(value) => onChange(value as number)} {...field}>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <RatingStar value={rating} key={rating}></RatingStar>
                                ))}
                            </Rating>
                        </div>
                        {error ? <small className="text-red-500">{error?.message}</small> : null}
                    </fieldset>
                );
            }}
        />
    );
};

export default CWSRating;
