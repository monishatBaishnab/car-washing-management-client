"use client";
import { HouseLine } from "phosphor-react";
import {
    Avatar,
    AvatarImage,
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarItem,
    SidebarList,
} from "keep-react";
import { Link } from "react-router-dom";
import lws_logo from "../../../assets/images/cws-logo.svg";
import dashboardViewConfig from "../../../routes/adminViewRoutes/adminRoutes";
import sidebarLinksGenerator from "../../../utils/sidebarLinksGenerator";
import { useAppSelector } from "../../../redux/hooks";

export const CWSSidebar = () => {
    const user = useAppSelector((state) => state.auth.user);
    const navLinks = sidebarLinksGenerator(dashboardViewConfig, user?.role as string);

    return (
        <Sidebar className="shadow-none h-screen rounded-none border-none">
            <SidebarBody>
                <Link to="/dashboard" className="flex items-center justify-center">
                    <div className="overflow-hidden h-14 w-full rounded-md bg-cws-primary-light text-heading-6 font-semibold text-white">
                        <img
                            className="w-full h-full object-contain p-2 hidden md:block"
                            src={lws_logo}
                            alt="CWS Logo"
                        />
                        <h3 className="text-3xl flex items-center justify-center h-full w-full md:hidden">CWS</h3>
                    </div>
                </Link>
                <SidebarList>
                    {navLinks?.map((link) => (
                        <Link key={link?.path} to={link?.path}>
                            <SidebarItem>
                                <HouseLine size={20} />
                                {link?.label}
                            </SidebarItem>
                        </Link>
                    ))}
                </SidebarList>
            </SidebarBody>
            <SidebarFooter>
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
            </SidebarFooter>
        </Sidebar>
    );
};
