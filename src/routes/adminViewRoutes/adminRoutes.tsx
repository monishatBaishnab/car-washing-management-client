import AdminDashboard from "../../pages/dashboardView/admin/AdminDashboard";
import Bookings from "../../pages/dashboardView/admin/Bookings";
import Services from "../../pages/dashboardView/admin/Services";
import Slots from "../../pages/dashboardView/admin/Slots";
import Users from "../../pages/dashboardView/admin/Users";
import UserBookings from "../../pages/dashboardView/user/UserBookings";
import UserDashboard from "../../pages/dashboardView/user/UserDashboard";

const dashboardViewConfig = [
    {
        path: "user/",
        label: "Dashboard",
        element: <UserDashboard />,
    },
    {
        path: "user/bookings",
        label: "Bookings",
        element: <UserBookings />,
    },
    {
        path: "admin/",
        label: "Dashboard",
        element: <AdminDashboard />,
    },
    {
        path: "admin/services",
        label: "Services",
        element: <Services />,
    },
    {
        path: "admin/slots",
        label: "Slots",
        element: <Slots />,
    },
    {
        path: "admin/bookings",
        label: "Bookings",
        element: <Bookings />,
    },
    {
        path: "admin/users",
        label: "Users",
        element: <Users />,
    },
];
export default dashboardViewConfig;
