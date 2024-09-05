import AdminProfile from "../../pages/dashboardView/admin/AdminProfile";
import UserDashboard from "../../pages/dashboardView/user/UserDashboard";

const dashboardViewConfig = [
    {
        path: "user/",
        label: "Dashboard",
        element: <UserDashboard />,
    },
    {
        path: "admin/",
        label: "Dashboard",
        element: <AdminProfile />,
    },
];
export default dashboardViewConfig;
