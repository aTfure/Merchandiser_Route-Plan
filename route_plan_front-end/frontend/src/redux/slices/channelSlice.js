import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { channelRequests } from "../../API/requests";

export const ChannelApi = createApi({
  reducerPath: "channelApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Channel"],
  endpoints: (builder) => ({
    getAllChannels: builder.query({
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
  }),
});

export const { useGetAllChannelsQuery } = ChannelApi;
