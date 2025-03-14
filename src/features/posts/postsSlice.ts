import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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
		postAdded: (state, action: PayloadAction<Post>) => {
			state.push(action.payload)
		}
	}
})

// Export the generated reducer function
export default postsSlice.reducer
export const { postAdded } = postsSlice.actions