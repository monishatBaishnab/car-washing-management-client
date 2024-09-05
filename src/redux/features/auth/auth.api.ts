import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchUserInfo: builder.query({
            query: (email) => ({
                url: `auth/${email}`,
                method: "GET",
            }),
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: "/auth/register",
                method: "POST",
                body: payload,
            }),
        }),
        login: builder.mutation({
            query: (payload) => ({
                url: "/auth/login",
                method: "POST",
                body: payload,
            }),
        }),
        createAdmin: builder.mutation({
            query: (id) => ({
                url: `/auth/create-admin/${id}`,
                method: "PATCH",
            }),
        }),
    }),
});

// Export the generated hooks
export const { useLoginMutation, useRegisterMutation, useCreateAdminMutation, useFetchUserInfoQuery } = authApi;
