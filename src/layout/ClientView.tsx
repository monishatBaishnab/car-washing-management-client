import { Outlet } from "react-router-dom";
import PWSNavbar from "../components/module/navbar/PWSNavbar";

const ClientView = () => {
    return (
        <div>
            <PWSNavbar />
            <Outlet />
            <h1>This is footer</h1>
        </div>
    );
};

export default ClientView;
