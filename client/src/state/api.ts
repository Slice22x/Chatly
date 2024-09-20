import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { string } from "prop-types";

export interface User {
  name: string;
  username: string;
  email: string;
  bio: string;
  clerkId: string;
  friends: Friend[];
  friendRequests: string[];
}

export interface ChatLog {
  id: string;
  betweenUser1: string;
  betweenUser2: string;
  messages: Message[];
}

export interface Message {
  senderId: string;
  recipientId: string;
  message: string;
}

export interface Friend {
  username: string;
  name: string;
  clerkId: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Users", "Chats"],
  endpoints: (build) => ({
    // USERS
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
    updateUsers: build.mutation<
      User[] | User,
      {
        currentUsername: string;
        selectedUsername?: string;
        action: string;
        bio?: string;
      }
    >({
      query: (vals) => ({
        url: "/users",
        method: "PATCH",
        params: {
          currentUsername: vals.currentUsername,
          selectedUsername: vals.selectedUsername,
          action: vals.action,
          bio: vals.bio,
        },
      }),
      invalidatesTags: ["Users"],
    }),

    //   CHATS
    createChat: build.mutation<
      ChatLog,
      { currentUserId: string; otherUser: string }
    >({
      query: (params) => ({
        url: "/chats",
        method: "POST",
        params: {
          currentUserId: params.currentUserId,
          otherUser: params.otherUser,
        },
      }),
      invalidatesTags: ["Chats"],
    }),

    getChats: build.query<ChatLog[], { currentUser: string }>({
      query: (id) => ({
        url: "/chats",
        method: "GET",
        params: { currentUserId: id.currentUser },
      }),
      providesTags: ["Chats"],
    }),

    getChatsSpecific: build.query<
      ChatLog[],
      { currentUser: string; otherUser: string }
    >({
      query: (id) => ({
        url: "/chats/specific",
        method: "GET",
        params: { currentUserId: id.currentUser, otherUser: id.otherUser },
      }),
      providesTags: ["Chats"],
    }),

    updateChat: build.mutation<
      ChatLog,
      { chatId: string; currentUser: string; message: Message }
    >({
      query: (info) => ({
        url: "/chats",
        method: "PATCH",
        params: { chatId: info.chatId, currentUser: info.currentUser },
        body: { message: info.message.message },
      }),
      invalidatesTags: ["Chats"],
    }),
  }),
});

export const {
  useCreateUsersMutation,
  useGetUsersQuery,
  useUpdateUsersMutation,
  useCreateChatMutation,
  useGetChatsQuery,
  useGetChatsSpecificQuery,
  useUpdateChatMutation,
} = api;
