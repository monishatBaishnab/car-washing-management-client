import AdminProfile from "../../pages/dashboardView/admin/AdminProfile";
import UserProfile from "../../pages/dashboardView/user/UserProfile";

const dashboardViewConfig = [
    {
        path: "user/profile",
        label: "Profile",
        element: <UserProfile />,
    },
    {
        path: "admin/profile",
        label: "Profile",
        element: <AdminProfile />,
    },
];
export default dashboardViewConfig;
