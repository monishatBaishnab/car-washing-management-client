import { Link, NavLink } from "react-router-dom";
import cws_logo from "../../../assets/images/cws-logo.svg";
import navLinksGenerator from "../../../utils/navLinksGenerator";
import clientViewConfig from "../../../routes/clientViewRoutes/clientViewRoutes";
import { LuShoppingCart } from "react-icons/lu";
import { Button } from "keep-react";
import { FaBars, FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { GoDot } from "react-icons/go";

const navLinks = navLinksGenerator(clientViewConfig);

const PWSNavbar = () => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        if (mediaQuery.matches) {
            setIsNavbarVisible(false);
        }

        mediaQuery.addEventListener("change", (e) => {
            if (e.matches) {
                setIsNavbarVisible(false);
            }
        });
        return () =>
            mediaQuery.removeEventListener("change", (e) => {
                if (e.matches) {
                    setIsNavbarVisible(false);
                }
            });
    }, []);

    return (
        <div>
            <div className="bg-cws-primary-dark relative">
                <div className="container !py-5 flex items-center justify-between h-24 gap-7">
                    <div className="w-32">
                        <Link to="/">
                            <img src={cws_logo} alt="PWS Logo" />
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <div
                            className={`flex gap-4 flex-col md:flex-row md:items-center absolute bg-cws-primary-light w-60 p-5 right-10 rounded-b-md ${
                                isNavbarVisible
                                    ? "top-full visible opacity-100 transition-all"
                                    : "top-20 invisible opacity-0"
                            } md:static md:bg-transparent md:rounded-b-none md:w-auto md:opacity-100 md:visible`}
                        >
                            {navLinks?.map((link) => (
                                <NavLink
                                    onClick={() => setIsNavbarVisible(false)}
                                    key={link?.path}
                                    to={link?.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-cws-yellow font-semibold"
                                            : "text-white font-semibold transition-colors hover:text-cws-yellow"
                                    }
                                >
                                    <div className="flex items-center gap-1">
                                        <GoDot className="block md:hidden" />
                                        {link?.label}
                                    </div>
                                </NavLink>
                            ))}
                            <div className="flex items-center gap-2 sm:hidden">
                                <Button className="px-5 w-full bg-cws-primary-dark transition-all hover:bg-cws-yellow">
                                    Sign In
                                </Button>
                                <Button
                                    shape="icon"
                                    className="px-5 bg-cws-primary-dark transition-all hover:bg-cws-yellow  text-2xl"
                                >
                                    <LuShoppingCart />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                shape="icon"
                                className="px-5 bg-cws-primary-light transition-all hover:bg-cws-yellow  text-2xl hidden sm:flex"
                            >
                                <LuShoppingCart />
                            </Button>
                            <Button
                                shape="icon"
                                className="px-5 bg-cws-primary-light transition-all hover:bg-cws-yellow"
                            >
                                <FaRegUser />
                            </Button>
                            <Button
                                onClick={() => setIsNavbarVisible((prev) => !prev)}
                                shape="icon"
                                className="px-5 bg-cws-primary-light transition-all hover:bg-cws-yellow md:hidden"
                            >
                                <FaBars />
                            </Button>
                            <Button className="px-5 bg-cws-primary-light transition-all hover:bg-cws-yellow hidden sm:flex">
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PWSNavbar;
