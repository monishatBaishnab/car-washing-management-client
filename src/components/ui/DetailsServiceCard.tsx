import { FaLongArrowAltRight } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { TbCoinTakaFilled } from "react-icons/tb";
import { TService } from "../../types";

const DetailsServiceCard = ({ service }: { service: TService }) => {
    return (
        <div className="bg-white p-4 border border-slate-200">
            <div className="w-full h-60 sm:h-40 overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={service?.image}
                    alt={service?.name}
                />
            </div>
            <div className="space-y-2 pt-5">
                <div className="flex items-center gap-3 text-slate-700">
                    {/* <div className="flex items-center gap-1 text-sm font-medium">
                        <FaStar className="text-cws-yellow" />
                        <span>{service?.rating}</span>
                    </div> */}

                    <div className="flex items-center gap-1 text-sm font-medium">
                        <GiDuration className="mt-[1.5px] text-lg" />
                        <span>{service?.duration} Min</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                        <TbCoinTakaFilled className="mt-[1.5px] text-lg" />
                        <span>{service?.price}</span>
                    </div>
                </div>
                <h4 className="text-lg font-semibold">{service?.name}</h4>
                <p className="text-slate-700">{service?.description}</p>
                <button className="text-cws-yellow flex items-center gap-2">
                    Book Service <FaLongArrowAltRight className="mt-1" />
                </button>
            </div>
        </div>
    );
};

export default DetailsServiceCard;
