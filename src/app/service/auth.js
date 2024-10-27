import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  logout,
  updateAccessToken,
  setCredentials,
} from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      "/api/auth/refresh-token",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data;
      api.dispatch(updateAccessToken(accessToken));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/api/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (err) {
          console.error("Login failed: ", err);
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (err) {
          console.error("Login failed: ", err);
        }
      },
    }),
    logout: builder.mutation({
      query: (refreshToken) => ({
        url: "/api/auth/logout",
        method: "POST",
        body: refreshToken,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          dispatch(logout());
        } catch (err) {
          console.error("Logout failed: ", err);
        }
      },
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/api/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi;
