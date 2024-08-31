import { baseApi } from "../../baseApi";

const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllServices: builder.query({
            providesTags: ["services"],
            query: (data: Record<string, unknown>[] | undefined) => {
                const params = new URLSearchParams();
                if (data && data?.length > 0) {
                    data.forEach((item) => params.append(String(item?.name), String(item?.value)));
                }
                return {
                    url: "/services",
                    method: "GET",
                    params,
                };
            },
        }),
        fetchSingleServices: builder.query({
            providesTags: (_result, _err, id) => [{ type: "services", id }],
            query: (id: string) => {
                return {
                    url: `/services/${id}`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useFetchAllServicesQuery, useFetchSingleServicesQuery } = serviceApi;
