import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (payload) => ({
                url: "/auth/sign-up",
                method: "POST",
                body: payload,
            }),
        }),
        signIn: builder.mutation({
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
export const { useSignUpMutation, useSignInMutation, useCreateAdminMutation } = authApi;
