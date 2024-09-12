import { Link, NavLink, useNavigate } from "react-router-dom";
import cws_logo from "../../../assets/images/cws-logo.svg";
import navLinksGenerator from "../../../utils/navLinksGenerator";
import clientViewConfig from "../../../routes/clientViewRoutes/clientViewRoutes";
import { LuShoppingCart } from "react-icons/lu";
import { Button } from "keep-react";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { GoDot } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logOut } from "../../../redux/features/auth/authSlice";
import { MdSpaceDashboard } from "react-icons/md";
import { ArrowUp } from "phosphor-react";

const navLinks = navLinksGenerator(clientViewConfig);

const CWSNavbar = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [scroll, setScroll] = useState(false);
    const navigate = useNavigate();
    const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

    const handleLoginOut = () => {
        if (user === null) {
            return navigate("/login");
        } else if (user) {
            // Then, log out the user after invalidating the cache
            dispatch(logOut());

            // Optionally, redirect to another page after logout
            navigate("/login");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 500);
        });
    });

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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                setIsScrollTopVisible(true);
            } else {
                setIsScrollTopVisible(false);
            }
        });

        return () =>
            window.removeEventListener("scroll", () => {
                if (window.scrollY > 300) {
                    setIsScrollTopVisible(true);
                } else {
                    setIsScrollTopVisible(false);
                }
            });
    }, []);

    return (
        <>
            <div
                className={`top-0 left-0 right-0 ${scroll ? "sticky animate-fadeInDown z-50" : ""}`}
            >
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
                                    <Button
                                        onClick={handleLoginOut}
                                        className="px-5 bg-cws-primary-dark transition-all hover:bg-cws-yellow hidden sm:flex"
                                    >
                                        {user ? "Log out" : "Log in"}
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
                                    onClick={() => setIsNavbarVisible((prev) => !prev)}
                                    shape="icon"
                                    className="px-5 bg-cws-primary-light transition-all hover:bg-cws-yellow md:hidden"
                                >
                                    <FaBars />
                                </Button>
                                <Button
                                    shape="icon"
                                    onClick={() => navigate(`/dashboard/${user?.role}`)}
                                    className={`px-5 bg-cws-primary-light transition-all hover:bg-cws-yellow hidden sm:flex ${
                                        !user?.role ? "!hidden" : "flex"
                                    }`}
                                >
                                    <MdSpaceDashboard className="text-xl" />
                                </Button>
                                <Button
                                    onClick={handleLoginOut}
                                    className="px-5 bg-cws-primary-light transition-all hover:bg-cws-yellow hidden sm:flex"
                                >
                                    {user ? "Log out" : "Log in"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`fixed right-10 z-50 transition-all duration-300 ${
                    isScrollTopVisible
                        ? "bottom-10 visible opacity-100"
                        : "bottom-14 invisible opacity-0"
                }`}
            >
                <Button
                    onClick={scrollToTop}
                    shape="icon"
                    className="bg-cws-yellow hover:bg-cws-yellow/90 active:bg-cws-yellow"
                >
                    <ArrowUp />
                </Button>
            </div>
        </>
    );
};

export default CWSNavbar;
