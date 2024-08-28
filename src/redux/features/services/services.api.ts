import { baseApi } from "../../baseApi";

const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllServices: builder.query({
            providesTags: ["services"],
            query: (data: Record<string, string | number | boolean>[] | undefined) => {
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
    }),
});

export const { useFetchAllServicesQuery } = serviceApi;
