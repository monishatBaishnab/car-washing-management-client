import { TBooking } from "../../../types";
import { baseApi } from "../../baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllBookings: builder.query({
            providesTags: ["bookings"],
            query: (data: Record<string, unknown>[] | undefined) => {
                const params = new URLSearchParams();
                if (data && data?.length > 0) {
                    data.forEach((item) => params.append(String(item?.name), String(item?.value)));
                }
                return {
                    url: "/bookings",
                    method: "GET",
                    params,
                };
            },
        }),
        createBooking: builder.mutation({
            query: (data: TBooking) => ({
                url: "/bookings",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (_result, _error, data) => [
                { type: "services", id: data?.service?._id },
            ],
        }),
        fetchUpcomingBookings: builder.query({
            query: () => ({
                url: "/bookings/upcoming",
                method: "GET",
            }),
        }),
        fetchMyBookings: builder.query({
            query: () => ({
                url: "/bookings/my-bookings",
                method: "GET",
            }),
        }),
    }),
});

export const { useCreateBookingMutation, useFetchUpcomingBookingsQuery, useFetchMyBookingsQuery, useFetchAllBookingsQuery } =
    bookingApi;
