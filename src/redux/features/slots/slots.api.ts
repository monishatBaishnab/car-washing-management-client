import { baseApi } from "../../baseApi";

const slotApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllSlots: builder.query({
            providesTags: ["slots"],
            query: (data: Record<string, unknown>[] | undefined) => {
                const params = new URLSearchParams();
                if (data && data?.length > 0) {
                    data.forEach((item) => params.append(String(item?.name), String(item?.value)));
                }
                return {
                    url: "/slots",
                    method: "GET",
                    params,
                };
            },
        }),
        createSlot: builder.mutation({
            query: (data) => {
                return {
                    url: "/slots",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["slots"],
        }),
        updateSlot: builder.mutation({
            query: ({ id, isBooked }) => {
                return {
                    url: `/slots/${id}`,
                    method: "PATCH",
                    body: { isBooked },
                };
            },
            invalidatesTags: ["slots"],
        }),
    }),
});

export const { useFetchAllSlotsQuery, useCreateSlotMutation, useUpdateSlotMutation } = slotApi;
