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
            invalidatesTags: (_result, _error, data) => [{ type: "services", id: data.serviceId }],
        }),
    }),
});

export const { useCreateBookingMutation } = bookingApi;
