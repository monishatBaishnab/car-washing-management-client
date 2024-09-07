"use client";
import { Button, Sidebar, SidebarBody, SidebarFooter, SidebarItem, SidebarList } from "keep-react";
import { Link, useNavigate } from "react-router-dom";
import lws_logo from "../../../assets/images/cws-logo.svg";
import dashboardViewConfig from "../../../routes/adminViewRoutes/adminRoutes";
import sidebarLinksGenerator from "../../../utils/sidebarLinksGenerator";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RiProfileFill } from "react-icons/ri";
import { FaHome, FaSignOutAlt, FaThList } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { logOut } from "../../../redux/features/auth/authSlice";

const sidebarIcons: {
    [key: string]: JSX.Element;
} = {
    dashboard: <RiProfileFill className="text-2xl" />,
    bookings: <FaThList className="text-lg" />,
    services: <FaThList className="text-lg" />,
    slots: <FaCheckToSlot className="text-lg" />,
    users: <HiUsers className="text-lg" />,
};

export const CWSSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const navLinks = sidebarLinksGenerator(dashboardViewConfig, user?.role as string);

    return (
        <Sidebar className="shadow-none h-screen rounded-none border-none w-[68px] lg:w-[280px] !p-2">
            <SidebarBody>
                <Link to="/dashboard" className="flex items-center justify-center">
                    <div className="overflow-hidden h-14 w-full rounded-md bg-cws-primary-light text-heading-6 font-semibold text-white">
                        <img
                            className="w-full h-full object-contain p-2 hidden lg:block"
                            src={lws_logo}
                            alt="CWS Logo"
                        />
                        <h3 className="text-xl flex items-center justify-center h-full w-full px-2 font-bold">
                            WC
                        </h3>
                    </div>
                </Link>
                <SidebarList className="hidden lg:block">
                    {navLinks?.map((link) => {
                        const icon = sidebarIcons?.[link?.label?.toLowerCase()];

                        return (
                            <Link key={link?.path} to={link?.path}>
                                <SidebarItem>
                                    {icon}
                                    {link?.label}
                                </SidebarItem>
                            </Link>
                        );
                    })}
                </SidebarList>
                <SidebarList className="block lg:hidden">
                    {navLinks?.map((link) => {
                        const icon = sidebarIcons?.[link?.label?.toLowerCase()];

                        return (
                            <Link key={link?.path} to={link?.path}>
                                <SidebarItem>{icon}</SidebarItem>
                            </Link>
                        );
                    })}
                </SidebarList>
            </SidebarBody>
            <SidebarFooter className="flex-wrap lg:flex-nowrap">
                <Button
                    onClick={() => navigate("/")}
                    shape="icon"
                    className="bg-cws-yellow text-white hover:bg-cws-yellow/80 active:bg-cws-yellow w-full lg:w-auto"
                >
                    <FaHome className="text-lg" />
                </Button>
                <Button
                    onClick={() => {
                        navigate("/login");
                        dispatch(logOut());
                    }}
                    className="bg-cws-yellow text-white w-full hover:bg-cws-yellow/80 active:bg-cws-yellow rounded"
                >
                    <span className="hidden lg:inline-block">Log out</span>
                    <FaSignOutAlt className="inline-block lg:hidden text-lg" />
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
};
