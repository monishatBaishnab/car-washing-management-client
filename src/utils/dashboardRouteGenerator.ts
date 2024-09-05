import { ReactNode } from "react";
import { TConfig } from "../types";

type TRoute = {
    path?: string;
    index?: boolean;
    element: ReactNode;
};

const dashboardRouteGenerator = (config: TConfig[], role?: string): TRoute[] => {
    return config
        .filter((item) => {
            const pathSegments = item.path?.split("/") || [];
            return pathSegments.length === 1 || pathSegments[0] === role;
        })
        .map((item) => {
            const pathSegments = item.path?.split("/") || [];
            const route: TRoute = { element: item.element };
            console.log(pathSegments);
            if (pathSegments.length === 0 || pathSegments[0] === "") {
                route.index = true;
            } else {
                route.path = item.path;
            }

            return route;
        });
};

export default dashboardRouteGenerator;
