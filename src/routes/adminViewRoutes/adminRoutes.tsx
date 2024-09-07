import AdminProfile from "../../pages/dashboardView/admin/AdminProfile";
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
        element: <AdminProfile />,
    },
];
export default dashboardViewConfig;
