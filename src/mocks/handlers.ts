import { factory, manyOf, oneOf, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import { delay, http, HttpResponse } from 'msw'


// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 2000

export const db = factory({
	user: {
		userId: primaryKey(nanoid),
		firstName: String,
		lastName: String,
		name: String,
		username: String,
		posts: manyOf('post')
	},
	post: {
		postId: primaryKey(nanoid),
		title: String,
		content: String,
		date: String,
		reactions: oneOf('reaction'),
		comments: manyOf('comment'),
		user: oneOf('user')
	},
	comment: {
		commentId: primaryKey(nanoid),
		date: String,
		text: String,
		post: oneOf('post'),
	},
	reaction: {
		reactionId: primaryKey(nanoid),
		thumbsUp: Number,
		tada: Number,
		heart: Number,
		rocket: Number,
		eyes: Number,
		post: oneOf('post'),
	}
})

export const handlers = [
	http.get('/fakeApi/posts', async () => {
		const response = db.post.getAll().map(serializePost)
		console.log('Captured a "GET /posts" request')
		await delay(ARTIFICIAL_DELAY_MS)
		return HttpResponse.json(response)
	})
]
