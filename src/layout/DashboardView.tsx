import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { CWSSidebar } from "../components/module/sidebar/CWSSidebar";

const DashboardView = () => {
    return (
        <ProtectedRoute>
            <div className="flex items-center">
                <div className="fixed left-0 top-0 bottom-0 shadow-sm">
                    <CWSSidebar />
                </div>
                <div className="w-[calc(100vw_-_68px)] lg:w-[calc(100vw_-_280px)] ml-[68px] lg:ml-[280px] min-h-screen bg-slate-100 p-10">
                    <div className="bg-white p-7 rounded border-slate-300 shadow-sm">
                        <Outlet />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default DashboardView;
