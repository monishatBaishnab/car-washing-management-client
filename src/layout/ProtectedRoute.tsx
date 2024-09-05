import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";
import { toast } from "keep-react";

const ProtectedRoute = ({ children }: { children: ReactNode }): JSX.Element => {
    const token = useAppSelector((state) => state?.auth.token);

    if (!token) {
        toast.error('You are not authorized.');
        console.log('Token not found');
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
