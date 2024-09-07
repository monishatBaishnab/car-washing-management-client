import { TBooking } from "../../../types";
import { baseApi } from "../../baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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

export const { useCreateBookingMutation, useFetchUpcomingBookingsQuery, useFetchMyBookingsQuery } =
    bookingApi;
