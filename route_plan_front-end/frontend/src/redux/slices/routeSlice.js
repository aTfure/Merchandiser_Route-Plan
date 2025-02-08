// src/store/slices/routeSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { routeRequests, routeScheduleRequests } from "../../API/requests";

export const RouteApi = createApi({
  reducerPath: "routeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Route"],
  endpoints: (builder) => ({
    getAllRoutes: builder.query({
      queryFn: async (params) => {
        try {
          const data = await routeRequests.getAll(params);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Route"],
    }),

    getRouteById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await routeRequests.getById(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Route"],
    }),

    createRoute: builder.mutation({
      queryFn: async (routeData) => {
        try {
          const data = await routeRequests.create(routeData);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Route"],
    }),

    updateRoute: builder.mutation({
      queryFn: async ({ id, ...patch }) => {
        try {
          const data = await routeRequests.update(id, patch);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Route"],
    }),

    deleteRoute: builder.mutation({
      queryFn: async (id) => {
        try {
          const data = await routeRequests.delete(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Route"],
    }),

    addOutletsToRoute: builder.mutation({
      queryFn: async ({ id, outlets }) => {
        try {
          const data = await routeRequests.addOutlets(id, { outlets });
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Route"],
    }),

    resendRouteEmail: builder.mutation({
      queryFn: async (id) => {
        try {
          const data = await routeRequests.resendRouteEmail(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    // Route Schedule Endpoints:
    getAllRouteSchedules: builder.query({
      queryFn: async (params) => {
        try {
          const data = await routeScheduleRequests.getAll(params);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["RouteSchedule"],
    }),
    getRouteScheduleById: builder.query({
      queryFn: async (id) => {
        try {
          const data = await routeScheduleRequests.getById(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["RouteSchedule"],
    }),
    createRouteSchedule: builder.mutation({
      queryFn: async (scheduleData) => {
        try {
          const data = await routeScheduleRequests.create(scheduleData);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["RouteSchedule"],
    }),
    updateRouteSchedule: builder.mutation({
      queryFn: async ({ id, ...patch }) => {
        try {
          const data = await routeScheduleRequests.update(id, patch);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["RouteSchedule"],
    }),
    deleteRouteSchedule: builder.mutation({
      queryFn: async (id) => {
        try {
          const data = await routeScheduleRequests.delete(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["RouteSchedule"],
    }),
  }),
});

export const {
  useGetAllRoutesQuery,
  useGetRouteByIdQuery,
  useCreateRouteMutation,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
  useAddOutletsToRouteMutation,
  useResendRouteEmailMutation,
  useGetAllRouteSchedulesQuery,
  useGetRouteScheduleByIdQuery,
  useCreateRouteScheduleMutation,
  useUpdateRouteScheduleMutation,
  useDeleteRouteScheduleMutation,
} = RouteApi;
