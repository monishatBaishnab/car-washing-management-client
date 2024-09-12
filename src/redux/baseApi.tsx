/* eslint-disable @typescript-eslint/no-unused-vars */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const tagTypes = [
    "user",
    "services",
    "bookings",
    "featured-bookings",
    "upcoming-bookings",
    "slots",
    "reviews",
    "review-state",
];

const baseQuery = fetchBaseQuery({
    baseUrl: "https://car-washing-system-ten.vercel.app/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: "cws_api",
    tagTypes,
    baseQuery,
    endpoints: (_builder) => ({}),
});
