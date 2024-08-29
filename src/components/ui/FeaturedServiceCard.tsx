import { FaLongArrowAltRight } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { TbCoinTakaFilled } from "react-icons/tb";

const FeaturedServiceCard = () => {
    return (
        <div>
            <div className="w-full h-60 sm:h-80 overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src="https://i.ibb.co/YjbfkFw/neelabh-raj-r-S9-PBJBY5pc-unsplash.jpg"
                    alt=""
                />
            </div>
            <div className="bg-white relative sm:ml-5 sm:-mt-20 p-5 space-y-2 sm:shadow-lg">
                <div className="flex items-center gap-1 text-slate-700">
                <div className="flex items-center gap-3 text-slate-700">
                    {/* <div className="flex items-center gap-1 text-sm font-medium">
                        <FaStar className="text-cws-yellow" />
                        <span>4.5</span>
                    </div> */}
                    <div className="flex items-center gap-1 text-sm font-medium">
                        <GiDuration className="mt-[1.5px] text-lg" />
                        <span>12 Min</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                        <TbCoinTakaFilled className="mt-[1.5px] text-lg" />
                        <span>15</span>
                    </div>
                </div>
                </div>
                <h4 className="text-lg font-semibold">Full-Service Detailing Package</h4>
                <p className="text-slate-700">
                    Comprehensive detailing package that covers both interior and exterior cleaning,
                    including waxing and polishing.
                </p>
                <button className="text-cws-yellow flex items-center gap-2">
                    Book Service <FaLongArrowAltRight className="mt-1" />
                </button>
            </div>
        </div>
    );
};

export default FeaturedServiceCard;
