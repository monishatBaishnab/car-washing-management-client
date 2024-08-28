import { ReactNode } from "react";
import { FieldValues, FormProvider, Resolver, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
    defaultValues?: Record<string, unknown>;
    resolver?: Resolver<FieldValues>;
};

type TFormProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const CWSForm = ({ children, onSubmit, defaultValues, resolver }: TFormProps) => {
    const formConfig: TFormConfig = {};

    if (defaultValues) {
        formConfig["defaultValues"] = defaultValues;
    }

    if (resolver) {
        formConfig["resolver"] = resolver;
    }

    const methods = useForm(formConfig);

    const submit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
        </FormProvider>
    );
};

export default CWSForm;
