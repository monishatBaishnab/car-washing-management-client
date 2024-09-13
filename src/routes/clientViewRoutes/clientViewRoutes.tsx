import ProtectedRoute from "../../layout/ProtectedRoute";
import Booking from "../../pages/clientView/Booking";
import Home from "../../pages/clientView/Home";
import Services from "../../pages/clientView/Services";
import ServicesDetails from "../../pages/clientView/ServicesDetails";
import UserReviews from "../../pages/clientView/UserReviews";

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
        element: (
            <ProtectedRoute>
                <ServicesDetails />
            </ProtectedRoute>
        ),
    },
    {
        path: "bookings",
        element: (
            <ProtectedRoute>
                <Booking />
            </ProtectedRoute>
        ),
    },
    {
        path: "user-reviews",
        element: <UserReviews />,
    },
];
export default clientViewConfig;
