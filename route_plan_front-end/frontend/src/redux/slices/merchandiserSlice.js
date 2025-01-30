import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { merchandiserRequests } from "../../API/requests";

export const merchandiserApi = createApi({
  reducerPath: "merchandiserApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Merchandiser"],
  endpoints: (builder) => ({
    getAllMerchandisers: builder.query({
      queryFn: async (params) => {
        try {
          const data = await merchandiserRequests.getAll(params);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Merchandiser"],
    }),

    getMerchandiserById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await merchandiserRequests.getById(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Merchandiser"],
    }),

    createMerchandiser: builder.mutation({
      queryFn: async (merchandiserData) => {
        try {
          const data = await merchandiserRequests.create(merchandiserData);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Merchandiser"],
    }),

    updateMerchandiser: builder.mutation({
      queryFn: async ({ id, ...patch }) => {
        try {
          const data = await merchandiserRequests.update(id, patch);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Merchandiser"],
    }),

    deleteMerchandiser: builder.mutation({
      queryFn: async (id) => {
        try {
          const data = await merchandiserRequests.delete(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Merchandiser"],
    }),

    bulkDeleteMerchandisers: builder.mutation({
      queryFn: async (ids) => {
        try {
          const data = await merchandiserRequests.bulkDelete(ids);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Merchandiser"],
    }),
  }),
});

export const {
  useGetAllMerchandisersQuery,
  useGetMerchandiserByIdQuery,
  useCreateMerchandiserMutation,
  useUpdateMerchandiserMutation,
  useDeleteMerchandiserMutation,
  useBulkDeleteMerchandisersMutation,
} = merchandiserApi;
