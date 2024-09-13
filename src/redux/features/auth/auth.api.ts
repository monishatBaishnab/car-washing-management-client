import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllUsers: builder.query({
            providesTags: ["users"],
            query: () => ({
                url: `auth/users`,
                method: "GET",
            }),
        }),
        fetchUserInfo: builder.query({
            providesTags: ["user"],
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
            invalidatesTags: ["users"],
        }),
        updateProfile: builder.mutation({
            query: ({ id, data }) => ({
                url: `/auth/update-profile/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
    }),
});

// Export the generated hooks
export const {
    useFetchAllUsersQuery,
    useLoginMutation,
    useRegisterMutation,
    useCreateAdminMutation,
    useFetchUserInfoQuery,
    useUpdateProfileMutation,
} = authApi;
