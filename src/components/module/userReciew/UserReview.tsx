import { Button, Input, Rating, RatingStar, Textarea } from "keep-react";
import { statistics } from "../../../constants";
import SectionTItle from "../../ui/SectionTItle";
import { Star } from "phosphor-react";
import { FaStar } from "react-icons/fa";

const UserReview = () => {
    return (
        <section className={`bg-[url(./process-bg.svg)] bg-no-repeat bg-cover bg-top`}>
            <div className="bg-white/60">
                <div className="container space-y-10">
                    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {statistics?.map((statistic) => (
                            <div key={statistic.label} className="text-center space-y-3">
                                <h1 className="text-5xl font-bold text-cws-yellow">
                                    {statistic.value}
                                </h1>
                                <h4 className="text-xl font-medium">{statistic.label}</h4>
                            </div>
                        ))}
                    </div>

                    <SectionTItle title="User Reviews" />

                    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div className="sm:col-span-2 grid gap-5 grid-cols-1 sm:grid-cols-2">
                            <div className="space-y-3">
                                <div className="h-48 w-full overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        src="https://i.ibb.co/YjbfkFw/neelabh-raj-r-S9-PBJBY5pc-unsplash.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="space-y-3">
                                    <p className="text-slate-800">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                                        error saepe sint unde quibusdam fuga. Lorem ipsum, dolor sit
                                        amet consectetur adipisicing elit. Nulla, officiis iusto
                                        dicta
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <img
                                                className="h-full w-full object-cover"
                                                src="https://i.ibb.co/5G1XTfb/customer.webp"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h5 className="-mb-1 font-medium">Monishat Baishanb</h5>
                                            <small className="text-slate-700">
                                                CEO. Baishnab Group
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-48 w-full overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        src="https://i.ibb.co/YjbfkFw/neelabh-raj-r-S9-PBJBY5pc-unsplash.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="space-y-3">
                                    <p className="text-slate-800">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                                        error saepe sint unde quibusdam fuga. Lorem ipsum, dolor sit
                                        amet consectetur adipisicing elit. Nulla, officiis iusto
                                        dicta
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <img
                                                className="h-full w-full object-cover"
                                                src="https://i.ibb.co/5G1XTfb/customer.webp"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h5 className="-mb-1 font-medium">Monishat Baishanb</h5>
                                            <small className="text-slate-700">
                                                CEO. Baishnab Group
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2 relative">
                            <div className="bg-white w-full p-5 border border-slate-200 space-y-5">
                                <h4 className="text-xl font-semibold text-cws-yellow">
                                    Share Your Feedback
                                </h4>
                                <Textarea
                                    aria-label="message"
                                    placeholder="Write your review about us."
                                />
                                <Input name="Name" placeholder="Write your email address." />
                                <Rating>
                                    <RatingStar value={1}>
                                        <FaStar size={20} />
                                    </RatingStar>
                                    <RatingStar value={2}>
                                        <FaStar size={20} />
                                    </RatingStar>
                                    <RatingStar value={3}>
                                        <FaStar size={20} />
                                    </RatingStar>
                                    <RatingStar value={4}>
                                        <FaStar size={20} />
                                    </RatingStar>
                                    <RatingStar value={5}>
                                        <FaStar size={20} />
                                    </RatingStar>
                                </Rating>
                                <Button className="bg-cws-yellow hover:bg-cws-yellow/90 px-7">
                                    Share
                                </Button>
                            </div>
                            <div className="absolute left-0 right-0 top-0 bottom-0 bg-cws-primary-light/40 flex items-center justify-center">
                                <Button className="bg-cws-yellow hover:bg-cws-yellow/95">
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserReview;
