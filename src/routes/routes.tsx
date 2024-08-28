import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/ClientView";
import routeGenerator from "../utils/routeGenerator";
import clientViewConfig from "./clientViewRoutes/clientViewRoutes";
import { NotFound } from "../pages/clientView/NotFound";
import Login from "../pages/clientView/Login";
import Register from "../pages/clientView/Register";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: routeGenerator(clientViewConfig),
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

export default routes;
