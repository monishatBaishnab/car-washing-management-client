import { TConfig } from "../types";

const navLinksGenerator = (config: TConfig[]) => {
    const links = config?.map((item) => ({
        path: item?.path,
        label: item?.label,
    }));
    return links;
};
export default navLinksGenerator;
