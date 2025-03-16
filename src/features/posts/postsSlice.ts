import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";

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

export type PostUpdate = Pick<Post, 'id' | 'content' | 'title'>

const initialReactions: Reactions = {
    thumbsUp: 0,
    tada: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
}


// create an initial state value for the reducer, with that type
const initialState: Post[] = [
    { id: "1", title: "First Post!", content: "Hello!", user: "0", date: "1742058449765", reactions: initialReactions },
    { id: "2", title: "Second Post", content: "More text", user: "2", date: "1742058200640 ", reactions: initialReactions },
];

// create the slice and pass in initial state
export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer (state, action: PayloadAction<Post>) {
                state.push(action.payload);
            },
            prepare (title: string, content: string, userId) {
                return {
                    payload: { id: nanoid(), title, content, user: userId, date: new Date().toISOString(), reactions: initialReactions },
                };
            },
        },
        reactionAdded: (state, action: PayloadAction<{ postId: string, reaction: ReactionName }>) => {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)

            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        postUpdated: (state, action: PayloadAction<PostUpdate>) => {
            const { id, title, content } = action.payload;
            const existingPost = state.find((post) => post.id === id);

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
    },
});

// Export the generated reducer function
export default postsSlice.reducer;
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

// selectors para acceder a los datos
export const selectPostAll = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, postId: string) => {
    const post = state.posts.find((post) => post.id === postId);
    return post;
};
