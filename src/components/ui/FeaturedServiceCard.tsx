import { FaLongArrowAltRight } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { TbCoinTakaFilled } from "react-icons/tb";
import { TService } from "../../types";
import { useNavigate } from "react-router-dom";

const FeaturedServiceCard = ({ service }: { service: TService }) => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="w-full h-60 sm:h-80 overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={service?.image}
                    alt={service?.name}
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
                            <span>{service?.duration} Min</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium">
                            <TbCoinTakaFilled className="mt-[1.5px] text-lg" />
                            <span>{service?.price}</span>
                        </div>
                    </div>
                </div>
                <h4 className="text-lg font-semibold">{service?.name}</h4>
                <p className="text-slate-700">{service?.description}</p>
                <button
                    onClick={() => navigate(`/services/${service?._id}`)}
                    className="text-cws-yellow flex items-center gap-2"
                >
                    Book Service <FaLongArrowAltRight className="mt-1" />
                </button>
            </div>
        </div>
    );
};

export default FeaturedServiceCard;
