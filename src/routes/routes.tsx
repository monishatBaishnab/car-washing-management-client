import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/ClientView";
import routeGenerator from "../utils/routeGenerator";
import clientViewConfig from "./clientViewRoutes/clientViewRoutes";
import { NotFound } from "../pages/clientView/NotFound";
import Signin from "../pages/clientView/Signin";
import Signup from "../pages/clientView/Signup";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: routeGenerator(clientViewConfig),
    },
    {
        path: "sign-up",
        element: <Signup />,
    },
    {
        path: "sign-in",
        element: <Signin />,
    },
]);

export default routes;
