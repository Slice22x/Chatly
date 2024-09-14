import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { string } from "prop-types";

export interface User {
  name: string;
  username: string;
  email: string;
  bio: string;
  clerkId: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Users"],
  endpoints: (build) => ({
    createUsers: build.mutation<User, User>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    getUsers: build.query<User[], string | void>({
      query: (search) => ({
        url: "/users",
        params: search ? { search } : {},
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const { useCreateUsersMutation, useGetUsersQuery } = api;
