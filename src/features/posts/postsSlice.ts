import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { createAppAsyncThunk } from "../../app/withTypes";
import { client } from "../../api/client";
import { userLoggedOut } from "../auth/authSlice";

// define a TS type for the data we'll be using
interface Reactions {
    thumbsUp: number
    tada: number
    heart: number
    rocket: number
    eyes: number
}

export type ReactionName = keyof Reactions

export interface Post {
    id: string;
    title: string;
    content: string;
    user: string;
    date: string
    reactions: Reactions
}

interface PostState {
    posts: Post[]
    status: 'idle' | 'pending' | 'succeeded' | 'rejected'
    error: string | null
}

export type PostUpdate = Pick<Post, 'id' | 'content' | 'title'>

const initialReactions: Reactions = {
    thumbsUp: 0,
    tada: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
}


// create an initial state value for the reducer, with that type
//const initialState: Post[] = [
//    { id: "1", title: "First Post!", content: "Hello!", user: "0", date: "1742058449765", reactions: initialReactions },
//    { id: "2", title: "Second Post", content: "More text", user: "2", date: "1742058200640 ", reactions: initialReactions },
//];

const initialState: PostState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAppAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')
    return response.data
}, {
    condition (arg, thunkApi) {
        const postStatus = selectPostStatus(thunkApi.getState())
        if (postStatus !== 'idle') {
            return false
        }
    }
})

// create the slice and pass in initial state
export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer (state, action: PayloadAction<Post>) {
                state.posts.push(action.payload);
            },
            prepare (title: string, content: string, userId) {
                return {
                    payload: { id: nanoid(), title, content, user: userId, date: new Date().toISOString(), reactions: initialReactions },
                };
            },
        },
        reactionAdded: (state, action: PayloadAction<{ postId: string, reaction: ReactionName }>) => {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)

            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        postUpdated: (state, action: PayloadAction<PostUpdate>) => {
            const { id, title, content } = action.payload;
            const existingPost = state.posts.find((post) => post.id === id);

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(userLoggedOut, state => {
                // Clear out the list of posts whenever the user logs out
                return initialState
            })
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message ?? 'Unknown Error'
            })
    }
});

// Export the generated reducer function
export default postsSlice.reducer;
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

// selectors para acceder a los datos
export const selectPostAll = (state: RootState) => state.posts.posts;
export const selectPostById = (state: RootState, postId: string) => {
    const post = state.posts.posts.find((post) => post.id === postId);
    return post;
};
export const selectPostStatus = (state: RootState) => state.posts.status
export const selectPostError = (state: RootState) => state.posts.error
