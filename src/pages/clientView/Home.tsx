import { Button } from "keep-react";
import { FaAngleRight } from "react-icons/fa";

const Home = () => {
    return (
        <div className="bg-[url(https://i.ibb.co/HKW2wZT/slide10.jpg)] bg-no-repeat bg-left">
            <div className="max-w-full h-full overflow-hidden bg-gradient-to-l to-cws-primary-dark/80 from-cws-primary-dark/40">
                <div className="container flex h-full text-white flex-col space-y-4 lg:space-y-6 items-left justify-center min-h-[500px]">
                    <h3 className="text-xl">Transform Your Car Today - Act Fast!!</h3>
                    <h1 className="text-3xl lg:text-5xl">Premium Car Care Starts Here</h1>
                    <p className="w-full md:w-1/2">
                        Get your car expertly cleaned and detailed with our limited-time offer.
                        Don't miss out – book now and drive away in style!
                    </p>
                    <div>
                        <Button className="bg-cws-yellow hover:bg-cws-primary-light w-auto gap-2">
                            Book your service <FaAngleRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
