import { Breadcrumb, BreadcrumbItem } from "keep-react";
import { CaretRight } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useFetchAllReviewsQuery } from "../../redux/features/review/review.api";
import ReviewCard from "../../components/module/userReview/ReviewCard";
import { TReview } from "../../types";

const UserReviews = () => {
    const navigate = useNavigate();
    const { data: reviews, isLoading: fetchingReviews } = useFetchAllReviewsQuery(undefined);

    return (
        <>
            <section className="bg-slate-100">
                <div className="container flex flex-col items-center">
                    <h2 className="text-4xl font-bold">User Reviews</h2>
                    <Breadcrumb>
                        <BreadcrumbItem onClick={() => navigate("/")}>Home</BreadcrumbItem>
                        <BreadcrumbItem className="cursor-auto hover:text-black">
                            <CaretRight size={18} color="#455468" />
                            User Reviews
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </section>
            <section>
                <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {!reviews?.data?.length || fetchingReviews ? (
                        <div className="bg-white border border-slate-200 animate-pulse p-5 space-y-3">
                            <div className="h-20 w-full bg-gray-100"></div>
                            <div className="h-5 w-full bg-gray-100"></div>
                            <div className="h-10 w-full bg-gray-100"></div>
                        </div>
                    ) : (
                        reviews?.data?.map((review: TReview) => (
                            <ReviewCard key={review?._id} review={review} />
                        ))
                    )}
                </div>
            </section>
        </>
    );
};

export default UserReviews;
