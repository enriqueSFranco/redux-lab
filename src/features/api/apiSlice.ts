import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../posts/postsSlice";

export type { Post }

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
	endpoints: builder => ({
		getPost: builder.query<Post[], void>({
			query: () => '/posts'
		})
	})
})

export const { useGetPostQuery } = apiSlice