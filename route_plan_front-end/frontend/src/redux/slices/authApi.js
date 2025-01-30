import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authRequests } from "../../API/requests";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async (credentials) => {
        try {
          const data = await authRequests.login(credentials);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

    getCurrentUser: builder.query({
      queryFn: async () => {
        try {
          const data = await authRequests.getCurrentUser();
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Auth"],
    }),

    changePassword: builder.mutation({
      queryFn: async (passwordData) => {
        try {
          const data = await authRequests.changePassword(passwordData);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

    resetPassword: builder.mutation({
      queryFn: async (email) => {
        try {
          const data = await authRequests.resetPassword(email);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

    resetPasswordConfirm: builder.mutation({
      queryFn: async (resetData) => {
        try {
          const data = await authRequests.resetPasswordConfirm(resetData);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
} = authApi;

export default authApi;
