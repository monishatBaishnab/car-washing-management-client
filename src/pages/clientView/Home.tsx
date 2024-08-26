import { Button, Input, InputIcon } from "keep-react";
import { FaAngleRight, FaLongArrowAltRight } from "react-icons/fa";
import SectionTItle from "../../components/ui/SectionTItle";
import { ourDetails } from "../../constants";
import { useNavigate } from "react-router-dom";
import FeaturedServiceCard from "../../components/ui/FeaturedServiceCard";
import { Parallax } from "react-parallax";
import { Envelope } from "phosphor-react";
import UserReview from "../../components/module/userReciew/UserReview";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* Hero Section */}
            <section className="bg-[url(https://i.ibb.co/vJ5DRw7/erik-mclean-Bxj-ZKXKC2-JA-unsplash-min-2.jpg)] bg-no-repeat bg-left">
                <div className="max-w-full h-full overflow-hidden bg-gradient-to-l to-cws-primary-dark/80 from-cws-primary-dark/40">
                    <div className="container flex h-full text-white flex-col space-y-4 lg:space-y-6 items-left justify-center min-h-[600px]">
                        <h3 className="text-xl font-medium">
                            Transform Your Car Today - Act Fast!!
                        </h3>
                        <h1 className="text-3xl lg:text-5xl font-bold md:w-1/2">
                            Best car wash & cleaning service
                        </h1>
                        <p className="w-full md:w-1/2">
                            A car wash is a facility used to clean the exterior and, in some cases,
                            the motor vehicles. Car washes can be self-service.
                        </p>
                        <div>
                            <Button className="bg-cws-yellow hover:bg-cws-primary-light w-auto gap-2">
                                Book your service <FaAngleRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature section */}
            <section className="bg-yellow">
                <div className="container">
                    <SectionTItle
                        title="Our Capabilities Feature"
                        rightContent={
                            <Button
                                onClick={() => navigate("/services")}
                                className="gap-1 hover:gap-4 bg-white outline outline-cws-yellow text-cws-yellow hover:bg-cws-yellow hover:text-white"
                            >
                                Book service for you <FaLongArrowAltRight />
                            </Button>
                        }
                    />
                    <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                        {ourDetails?.map((data) => (
                            <div key={data?.title} className="p-6 bg-slate-100 space-y-3 transition-all outline-slate-200 shadow-slate-200 hover:outline hover:shadow-lg">
                                <div className="p-3 bg-cws-yellow inline-block">
                                    <img src={data.image} alt={data.title} />
                                </div>
                                <h4 className="text-lg sm:text-2xl font-semibold">{data?.title}</h4>
                                <p className="text-slate-800">{data?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service section */}
            <section className="bg-slate-50">
                <div className="container">
                    <SectionTItle
                        title="Our Service Offerings"
                        rightContent={
                            <Button
                                onClick={() => navigate("/services")}
                                className="gap-1 hover:gap-4 bg-white outline outline-cws-yellow text-cws-yellow hover:bg-cws-yellow hover:text-white"
                            >
                                See all services <FaLongArrowAltRight />
                            </Button>
                        }
                    />
                    <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                        <FeaturedServiceCard />
                    </div>
                </div>
            </section>

            {/* Connect us section */}
            <Parallax
                strength={200}
                bgImage="https://i.ibb.co/3h2jpQ1/gaith-shalan-Spz-Mdqip-AGs-unsplash.jpg"
                bgImageAlt="Connect with us."
            >
                <section className="bg-[url()] bg-no-repeat bg-cover bg-center">
                    <div className="bg-cws-primary-light/80 backdrop-blur-sm">
                        <div className="container min-h-96 text-center md:w-1/2 space-y-5">
                            <h2 className="text-5xl text-white font-semibold">
                                Subscribe to Our Newsletter
                            </h2>
                            <p className="text-white">
                                Stay informed with our latest promotions, updates, and product
                                announcements. Subscribe to our newsletter to be the first to access
                                exclusive offers and important news. Sign up today!
                            </p>
                            <div className="flex items-center justify-center">
                                <fieldset className="relative max-w-md w-full">
                                    <Input
                                        required
                                        placeholder="Enter email"
                                        className="ps-11 rounded-l-md rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                    />
                                    <InputIcon>
                                        <Envelope size={19} color="#AFBACA" />
                                    </InputIcon>
                                </fieldset>
                                <Button className="bg-cws-yellow hover:bg-cws-yellow/95 rounded-none h-11 rounded-r-md">
                                    Subscribe Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </Parallax>

            {/* Review section */}
            <UserReview />
        </>
    );
};

export default Home;
