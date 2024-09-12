import { Button, toast } from "keep-react";
import SectionTItle from "../../ui/SectionTItle";
import { FaLongArrowAltRight, FaRegStar } from "react-icons/fa";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import {
    useCreateReviewMutation,
    useFetchAllReviewsQuery,
    useFetchReviewStateQuery,
} from "../../../redux/features/review/review.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CWSForm from "../../forms/CWSForm";
import CWSTextarea from "../../forms/CWSTextarea";
import CWSRating from "../../forms/CWSRating";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TReview, TUserResponse } from "../../../types";
import { CgSpinnerTwo } from "react-icons/cg";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";
const UserReview = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const [createReview, { isLoading: reviewCreating }] = useCreateReviewMutation();
    const { data: userReviews, isLoading: fetchingUserReviews } = useFetchAllReviewsQuery([
        { name: "limit", value: 2 },
    ]);
    const { data: reviewState } = useFetchReviewStateQuery(undefined);
    const { totalCompletedWashes, totalPositiveReviews, averageRating, yearsOfService } =
        reviewState?.data ?? {};

    const statistics = [
        {
            label: "Completed Washes",
            value: totalCompletedWashes,
        },
        {
            label: "Positive Reviews",
            value: totalPositiveReviews,
        },
        {
            label: "Average Review Rating",
            value: averageRating,
        },
        {
            label: "Years of Service",
            value: yearsOfService,
        },
    ];
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!user?.userId) {
            toast.error("Please login first.");
            return;
        }
        const reviewData = {
            ...data,
            user: user?.userId,
        };

        try {
            const result = await createReview(reviewData as TReview);
            if (result?.error) {
                toast.error("Sorry, Failed to send your review.");
            }
            if (result?.data) {
                toast.success("Thank you for sending us your review.");
            }
        } catch (error) {
            toast.error("Sorry, Failed to send your review.");
            console.log(error);
        }
    };

    const reviewSchema = z.object({
        review: z.string({ required_error: "Please write a review about us." }),
        rating: z.number({ required_error: "Please rate us." }),
    });

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

                    <SectionTItle
                        title="User Reviews"
                        rightContent={
                            <Button className="gap-1 hover:gap-4 bg-white outline outline-cws-yellow text-cws-yellow hover:bg-cws-yellow hover:text-white">
                                See all reviews <FaLongArrowAltRight />
                            </Button>
                        }
                    />

                    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div className="sm:col-span-2 space-y-4">
                            {userReviews?.data && !fetchingUserReviews
                                ? userReviews?.data?.map((review: TReview) => (
                                      <div className="bg-white p-5 shadow-sm relative border border-slate-200">
                                          <div className="space-y-3">
                                              <p className="text-slate-600 text-center">
                                                  {review?.review}
                                              </p>
                                              <div className="flex items-center gap-1 justify-center">
                                                  {Array.from({ length: review?.rating })?.map(
                                                      (_, id) => {
                                                          return (
                                                              <FaStar
                                                                  key={id}
                                                                  className="text-cws-yellow"
                                                              />
                                                          );
                                                      }
                                                  )}
                                                  {Array.from({ length: 5 - review?.rating })?.map(
                                                      (_, id) => {
                                                          return (
                                                              <FaRegStar
                                                                  key={id}
                                                                  className="text-cws-yellow"
                                                              />
                                                          );
                                                      }
                                                  )}
                                              </div>
                                              <div className="text-center">
                                                  <h5 className="-mb-1 font-medium">
                                                      {(review?.user as TUserResponse)?.name}
                                                  </h5>
                                                  <small className="text-slate-500">
                                                      {(review?.user as TUserResponse)?.email}
                                                  </small>
                                              </div>
                                          </div>
                                          <div className="absolute  left-5 top-5 text-6xl text-cws-yellow/20">
                                              <FaQuoteLeft />
                                          </div>
                                      </div>
                                  ))
                                : null}
                        </div>
                        <div className="sm:col-span-2 relative">
                            <div className="bg-white w-full p-5 border border-slate-200 space-y-5">
                                <h4 className="text-xl font-semibold text-cws-yellow">
                                    Share Your Feedback
                                </h4>
                                <CWSForm
                                    onSubmit={handleSubmit}
                                    resolver={zodResolver(reviewSchema)}
                                >
                                    <div className="space-y-4">
                                        <CWSTextarea
                                            name="review"
                                            placeholder="Write your review about us."
                                        />
                                        <CWSRating name="rating" />
                                        <Button
                                            type="submit"
                                            className={`bg-cws-yellow hover:bg-cws-yellow/90 w-1/2 ${
                                                reviewCreating
                                                    ? "bg-cws-yellow/65 hover:bg-cws-yellow/65"
                                                    : "bg-cws-yellow"
                                            }`}
                                        >
                                            {reviewCreating ? (
                                                <CgSpinnerTwo className="animate-spin text-white text-2xl" />
                                            ) : (
                                                "Send us"
                                            )}
                                        </Button>
                                    </div>
                                </CWSForm>
                            </div>
                            <div
                                className={`${
                                    !user ? "block" : "hidden"
                                } absolute left-0 right-0 top-0 bottom-0 bg-cws-primary-light/40 flex items-center justify-center`}
                            >
                                <Button
                                    onClick={() => navigate("/login", { state: { from: "/" } })}
                                    className="bg-cws-yellow hover:bg-cws-yellow/95"
                                >
                                    Log in
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
