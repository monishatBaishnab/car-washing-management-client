import Booking from "../../pages/clientView/Booking";
import Home from "../../pages/clientView/Home";
import Services from "../../pages/clientView/Services";
import ServicesDetails from "../../pages/clientView/ServicesDetails";

const clientViewConfig = [
    {
        path: "/",
        label: "Home",
        element: <Home />,
    },
    {
        path: "services",
        label: "Services",
        element: <Services />,
    },
    {
        path: "services/:serviceId",
        element: <ServicesDetails />,
    },
    {
        path: "bookings",
        element: <Booking />,
    },
];
export default clientViewConfig;
