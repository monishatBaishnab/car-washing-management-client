import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import MainLayout from "../layout/ClientView";
import routeGenerator from "../utils/routeGenerator";
import clientViewConfig from "./clientViewRoutes/clientViewRoutes";
import { NotFound } from "../pages/clientView/NotFound";
import Login from "../pages/clientView/Login";
import Register from "../pages/clientView/Register";
import DashboardView from "../layout/DashboardView";
import dashboardViewConfig from "./adminViewRoutes/adminRoutes";
import dashboardRouteGenerator from "../utils/dashboardRouteGenerator";

const CWSRoutes: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <NotFound />,
            children: routeGenerator(clientViewConfig),
        },
        {
            path: "/dashboard",
            element: <DashboardView />,
            errorElement: <NotFound />,
            children: dashboardRouteGenerator(dashboardViewConfig, user?.role),
        },
        {
            path: "register",
            element: <Register />,
        },
        {
            path: "login",
            element: <Login />,
        },
    ]);

    return <RouterProvider router={routes} />;
};

export default CWSRoutes;
