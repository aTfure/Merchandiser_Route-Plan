import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { outletRequests } from "../../API/requests";

export const OutletApi = createApi({
  reducerPath: "outletApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Outlet"],
  endpoints: (builder) => ({
    getAllOutlets: builder.query({
      queryFn: async (params) => {
        try {
          const data = await outletRequests.getAll(params);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Outlet"],
    }),
  }),
});

export const { useGetAllOutletsQuery } = OutletApi;
