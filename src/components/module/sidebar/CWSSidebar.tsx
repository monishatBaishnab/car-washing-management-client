"use client";
import {
    Sidebar,
    SidebarBody,
    SidebarItem,
    SidebarList,
} from "keep-react";
import { Link } from "react-router-dom";
import lws_logo from "../../../assets/images/cws-logo.svg";
import dashboardViewConfig from "../../../routes/adminViewRoutes/adminRoutes";
import sidebarLinksGenerator from "../../../utils/sidebarLinksGenerator";
import { useAppSelector } from "../../../redux/hooks";
import { RiProfileFill } from "react-icons/ri";
import { FaThList } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";

const sidebarIcons: {
    [key: string]: JSX.Element;
    dashboard: JSX.Element;
    services: JSX.Element;
    slots: JSX.Element;
    users: JSX.Element;
} = {
    dashboard: <RiProfileFill className="text-2xl" />,
    services: <FaThList className="text-lg" />,
    slots: <FaCheckToSlot className="text-lg" />,
    users: <HiUsers className="text-lg" />,
};

export const CWSSidebar = () => {
    const user = useAppSelector((state) => state.auth.user);
    const navLinks = sidebarLinksGenerator(dashboardViewConfig, user?.role as string);

    return (
        <Sidebar className="shadow-none h-screen rounded-none border-none w-[68] lg:w-[280px]">
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
            {/* <SidebarFooter>
                <Avatar>
                    <AvatarImage src="/images/avatar/avatar-1.png" alt="avatar" />
                </Avatar>
                <div>
                    <p className="text-body-4 font-medium text-metal-400 dark:text-white">
                        Enzo Farnandez
                    </p>
                    <p className="text-body-4 font-normal text-metal-300 dark:text-metal-400">
                        enzo123@gmail.com
                    </p>
                </div>
            </SidebarFooter> */}
        </Sidebar>
    );
};
