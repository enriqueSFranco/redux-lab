import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../state/store'

// define a TS type for the data we'll be using
export interface Post {
	id: string
	title: string
	content: string
}

// create an initial state value for the reducer, with that type
const initialState: Post[] = [
	{ id: '1', title: 'First Post!', content: 'Hello!' },
	{ id: '2', title: 'Second Post', content: 'More text' }
]

// create the slice and pass in initial state
export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			reducer (state, action: PayloadAction<Post>) {
				state.push(action.payload)

			},
			prepare (title: string, content: string) {
				return {
					payload: { id: nanoid(), title, content }
				}
			}
		},
		postUpdated: (state, action: PayloadAction<Post>) => {
			const { id, title, content } = action.payload
			const existingPost = state.find(post => post.id === id)

			if (existingPost) {
				existingPost.title = title
				existingPost.content = content
			}
		}
	}
})

// Export the generated reducer function
export default postsSlice.reducer
export const { postAdded, postUpdated } = postsSlice.actions

// selectors
export const selectPostById = (state: RootState, postId: string) => {
	const post = state.posts.find(post => post.id === postId)
	return post
}