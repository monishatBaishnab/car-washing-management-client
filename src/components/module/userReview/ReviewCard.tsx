import { FaQuoteLeft, FaQuoteRight, FaRegStar, FaStar } from "react-icons/fa6";
import { TReview, TUserResponse } from "../../../types";

const ReviewCard = ({ review }: { review: TReview }) => {
    return (
        <div className="bg-white p-5 shadow-sm relative border border-slate-200">
            <div className="space-y-3">
                <p className="text-slate-600 text-center">{review?.review}</p>
                <div className="flex items-center gap-1 justify-center">
                    {Array.from({ length: review?.rating })?.map((_, id) => {
                        return <FaStar key={id} className="text-cws-yellow" />;
                    })}
                    {Array.from({ length: 5 - review?.rating })?.map((_, id) => {
                        return <FaRegStar key={id} className="text-cws-yellow" />;
                    })}
                </div>
                <div className="text-center">
                    <h5 className="-mb-1 font-medium">{(review?.user as TUserResponse)?.name}</h5>
                    <small className="text-slate-500">
                        {(review?.user as TUserResponse)?.email}
                    </small>
                </div>
            </div>
            <div className="absolute  left-5 top-5 text-6xl text-cws-yellow/20">
                <FaQuoteLeft />
            </div>
            <div className="absolute  right-5 bottom-5 text-6xl text-cws-yellow/20">
                <FaQuoteRight />
            </div>
        </div>
    );
};

export default ReviewCard;
