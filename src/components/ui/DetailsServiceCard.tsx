import { FaLongArrowAltRight, FaStar } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { TbCoinTakaFilled } from "react-icons/tb";

const DetailsServiceCard = () => {
    return (
        <div className="bg-white p-4 border border-slate-200">
            <div className="w-full h-60 sm:h-40 overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src="https://i.ibb.co/YjbfkFw/neelabh-raj-r-S9-PBJBY5pc-unsplash.jpg"
                    alt=""
                />
            </div>
            <div className="space-y-2 pt-5">
                <div className="flex items-center gap-3 text-slate-700">
                    <div className="flex items-center gap-1 text-sm font-medium">
                        <FaStar className="text-cws-yellow" />
                        <span>4.5</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm font-medium">
                        <GiDuration className="mt-[1px]" />
                        <span>30 Min</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                    <TbCoinTakaFilled className="mt-[1px]" />
                        <span>30</span>
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

export default DetailsServiceCard;
