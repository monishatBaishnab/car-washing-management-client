import { Outlet } from "react-router-dom";
import CWSNavbar from "../components/module/navbar/CWSNavbar";
import CWSFooter from "../components/module/footer/CWSFooter";

const ClientView = () => {
    return (
        <div>
            <CWSNavbar />
            <Outlet />
            <CWSFooter />
        </div>
    );
};

export default ClientView;
