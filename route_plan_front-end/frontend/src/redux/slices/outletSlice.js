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

    getOutletById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await outletRequests.getById(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Outlet"],
    }),

    createOutlet: builder.mutation({
      queryFn: async (outletData) => {
        try {
          const data = await outletRequests.create(outletData);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Outlet"],
    }),

    updateOutlet: builder.mutation({
      queryFn: async ({ id, ...patch }) => {
        try {
          const data = await outletRequests.update(id, patch);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Outlet"],
    }),

    deleteOutlet: builder.mutation({
      queryFn: async (id) => {
        try {
          const data = await outletRequests.delete(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Outlet"],
    }),

    bulkDeleteOutlets: builder.mutation({
      queryFn: async (ids) => {
        try {
          const data = await outletRequests.bulkDelete(ids);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Outlet"],
    }),
  }),
});

export const {
  useGetAllOutletsQuery,
  useGetOutletByIdQuery,
  useCreateOutletMutation,
  useUpdateOutletMutation,
  useDeleteOutletMutation,
  useBulkDeleteOutletsMutation,
} = OutletApi;
