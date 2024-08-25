import Home from "../../pages/clientView/Home";

const clientViewConfig = [
    {
        path: "/",
        label: "Home",
        element: <Home />,
    },
    {
        path: "/services",
        label: "Services",
        element: <div>Service</div>,
    },
    {
        path: "/bookings",
        label: "Bookings",
        element: <div>Service</div>,
    },
];
export default clientViewConfig;
