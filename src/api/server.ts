import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { faker } from '@faker-js/faker'
import { factory, manyOf, oneOf, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'

const NUM_USERS = 3
const POSTS_PER_USER = 3
const RECENT_NOTIFICATIONS_DAYS = 7

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 2000

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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

type ModelDB = typeof db

type UserData = ReturnType<typeof createUserData>
type PostData = ReturnType<typeof createPostData>

type Post = ReturnType<typeof db.post.create>
type User = ReturnType<typeof db.user.create>


const createUserData = () => {
	const firstName = faker.person.firstName()
	const lastName = faker.person.lastName()

	return {
		firstName,
		lastName,
		name: `${firstName} ${lastName}`,
		username: faker.internet.username(),
	}
}

const createPostData = (user: User) => {
	return {
		title: faker.lorem.words(),
		date: faker.date.recent({ days: RECENT_NOTIFICATIONS_DAYS }).toISOString(),
		user,
		content: faker.lorem.paragraphs(),
		reactions: db.reaction.create(),
	}
}

for (let i = 0; i < NUM_USERS; i++) {
	const author = db.user.create(createUserData())
	for (let j = 0; j < POSTS_PER_USER; j++) {
		const newPost = createPostData(author)
		db.post.create(newPost)
	}
}

const serializePost = (post: Post) => ({
	...post,
	user: post.user!.id
})

export const handlers = [
	http.get('/fakeApi/posts', async () => {
		const response = db.post.getAll().map(serializePost)
		console.log('Captured a "GET /posts" request')
		await delay(ARTIFICIAL_DELAY_MS)
		return HttpResponse.json(response)
	}),
	http.get('/fakeApi/users', async () => {
		await delay(ARTIFICIAL_DELAY_MS)
		return HttpResponse.json(db.user.getAll())
	})
]

export const worker = setupWorker(...handlers)
