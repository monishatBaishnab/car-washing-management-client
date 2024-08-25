// https://i.ibb.co/dPkwXT8/footer-bg.png
import { Link } from "react-router-dom";
import cws_logo from "../../../assets/images/cws-logo.svg";
import { informationLinks, supportLinks } from "../../../constants";
import { Button, Divider } from "keep-react";
import Facebook from "../../../assets/icons/Facebook";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const CWSFooter = () => {
    return (
        <div className="bg-[url(https://i.ibb.co/dPkwXT8/footer-bg.png)] bg-no-repeat bg-bottom bg-cover">
            <div className="bg-cws-primary-dark/80">
                <div className="container min-h-96 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    <div className="lg:border-r border-r-white/10 lg:pr-5 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-5">
                        <div className="w-32">
                            <Link to="/">
                                <img src={cws_logo} alt="PWS Logo" />
                            </Link>
                        </div>
                        <p className="text-white text-justify">
                            At <span className="text-cws-yellow">Wash Suite</span>, we specialize in
                            premium car washing and detailing, using the best products and
                            techniques to ensure your vehicle looks its finest. Our expert team is
                            dedicated to delivering exceptional results and outstanding customer
                            service. Whether it’s a quick wash or a detailed clean, we treat every
                            car with the utmost care. Experience superior car care with us and see
                            the difference for yourself.
                        </p>
                    </div>
                    <div className="col-span-1 md:border-r border-r-white/10 md:pr-5">
                        <h4 className="text-xl font-semibold mb-6 text-white">Information</h4>
                        <div className="space-y-3">
                            {informationLinks?.map((link) => (
                                <Link
                                    className="text-white block transition-all duration-300 hover:text-cws-yellow hover:ml-2"
                                    to={link?.path}
                                >
                                    {link?.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1 md:border-r border-r-white/10 md:pr-5">
                        <h4 className="text-xl font-semibold mb-6 text-white">Our Policy</h4>
                        <div className="space-y-3">
                            {supportLinks?.map((link) => (
                                <Link
                                    className="text-white block transition-all duration-300 hover:text-cws-yellow hover:ml-2"
                                    to={link?.path}
                                >
                                    {link?.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1">
                        <h4 className="text-xl font-semibold mb-6 text-white">Contact Us</h4>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <span className="text-cws-yellow text-nowrap">Address : </span>
                                <span className="text-white">71 Pennington Rockville, CT06066</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-cws-yellow text-nowrap">Mail : </span>
                                <span className="text-white"> info@washsuite.com</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-cws-yellow text-nowrap">Fax : </span>
                                <span className="text-white">+456-123-7890</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-t-white/10">
                    <div className="container !py-5 flex items-center justify-between gap-4 flex-wrap">
                        <p className="text-white">
                            All rights reserved by{" "}
                            <Link className="text-cws-yellow" to="/">
                                Wash Suite
                            </Link>{" "}
                            Copyright © {new Date().getFullYear()}.
                        </p>
                        <div className="flex items-center gap-1">
                            <Button
                                className="bg-cws-primary-light hover:bg-cws-yellow"
                                shape="icon"
                            >
                                <FaFacebook className="text-lg" />
                            </Button>
                            <Button
                                className="bg-cws-primary-light hover:bg-cws-yellow"
                                shape="icon"
                            >
                                <FaInstagram className="text-lg" />
                            </Button>
                            <Button
                                className="bg-cws-primary-light hover:bg-cws-yellow"
                                shape="icon"
                            >
                                <FaYoutube className="text-lg" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CWSFooter;
