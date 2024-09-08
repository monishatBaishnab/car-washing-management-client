import UserProfile from "../../../components/ui/UserProfile";

const AdminDashboard = () => {
    return (
        <div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <UserProfile />
            </div>
        </div>
    );
};

export default AdminDashboard;
