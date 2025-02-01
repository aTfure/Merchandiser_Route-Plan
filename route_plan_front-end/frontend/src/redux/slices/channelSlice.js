import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { channelRequests } from "../../API/requests";

export const ChannelApi = createApi({
  reducerPath: "channelApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Channel"],
  endpoints: (builder) => ({
    getAllChannelTypes: builder.query({
      queryFn: async (params) => {
        try {
          const data = await channelRequests.getAll(params);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Channel"],
    }),
    getChannelTypeById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await channelRequests.getById(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Channel"],
    }),

    createChannelType: builder.mutation({
      queryFn: async (channelTypeData) => {
        try {
          const data = await channelRequests.create(channelTypeData);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Channel"],
    }),

    updateChannelType: builder.mutation({
      queryFn: async ({ id, ...patch }) => {
        try {
          const data = await channelRequests.update(id, patch);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Channel"],
    }),

    deleteChannelType: builder.mutation({
      queryFn: async (ids) => {
        try {
          const data = await channelRequests.delete(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Channel"],
    }),

    bulkDeleteChannelTypes: builder.mutation({
      queryFn: async (ids) => {
        try {
          const data = await channelRequests.bulkDelete(ids);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Channel"],
    }),
  }),
});

export const {
  useGetAllChannelTypesQuery,
  useGetChannelTypeByIdQuery,
  useCreateChannelTypeMutation,
  useUpdateChannelTypeMutation,
  useDeleteChannelTypeMutation,
  useBulkDeleteChannelTypesMutation,
} = ChannelApi;
