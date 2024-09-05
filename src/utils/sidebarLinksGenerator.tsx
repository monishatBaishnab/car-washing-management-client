import { TConfig } from "../types";

type TLink = {
    label: string;
    path: string;
};

const sidebarLinksGenerator = (config: TConfig[], role: string): TLink[] => {
    const links = config
        ?.filter((item) => {
            const pathSegments = item?.path?.split("/");
            const requiredRole = pathSegments?.[0];

            return requiredRole === role;
        })
        ?.reduce((arr, item) => {
            if (item?.label && item?.path) {
                arr.push({
                    path: item.path,
                    label: item.label,
                });
            }
            return arr;
        }, [] as TLink[]);

    return links;
};

export default sidebarLinksGenerator;
