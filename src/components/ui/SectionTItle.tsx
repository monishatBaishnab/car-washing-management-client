import { ReactNode } from "react";
const SectionTItle = ({ title, rightContent }: { title: string; rightContent?: ReactNode }) => {
    return (
        <div className="relative block w-full mb-4 after:absolute after:left-0 after:-bottom-4 after:h-1 after:w-40 after:bg-cws-yellow after:rounded-l before:absolute before:left-0 before:right-0 before:-bottom-4 before:h-1 before:bg-slate-200">
            <div className="flex items-center gap-5 justify-between">
                <h3 className="text-2xl sm:text-3xl font-semibold capitalize">{title}</h3>
                <div className="hidden sm:block">{rightContent}</div>
            </div>
        </div>
    );
};

export default SectionTItle;
