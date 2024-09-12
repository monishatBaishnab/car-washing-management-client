import { TReview } from "../../../types";
import { baseApi } from "../../baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllReviews: builder.query({
            providesTags: ["reviews"],
            query: (data: Record<string, unknown>[] | undefined) => {
                const params = new URLSearchParams();
                if (data && data?.length > 0) {
                    data.forEach((item) => params.append(String(item?.name), String(item?.value)));
                }
                return {
                    url: "/reviews",
                    method: "GET",
                    params,
                };
            },
        }),
        fetchReviewState: builder.query({
            query: () => {
                return {
                    url: "/reviews/review-state",
                    method: "GET",
                };
            },
        }),
        createReview: builder.mutation({
            query: (data: TReview) => ({
                url: "/reviews",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["reviews", "review-state"],
        }),
    }),
});

export const { useFetchAllReviewsQuery, useCreateReviewMutation, useFetchReviewStateQuery } =
    reviewApi;
