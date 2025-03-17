import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useAppSelector } from '../hooks'
import { selectCurrentUsername } from '../features/auth/authSlice'


export const Route = createFileRoute('/_auth/posts/$id')({
	component: SinglePost
})

function SinglePost () {
	const { id = "" } = useParams({ strict: false })
	const currentUsername = useAppSelector(selectCurrentUsername)

	const post = useAppSelector(state => {
		return state.posts.find(post => post.id === id)
	})

	const canEdit = currentUsername === post?.user

	if (!post) {
		return (
			<section>
				<h2>Post not found</h2>
			</section>
		)
	}

	return (
		<section>
			<article className="post">
				<h2>{post.title}</h2>
				<p className="post-content">{post.content}</p>
				{canEdit && (
					<Link to='/'>
						Edit post
					</Link>
				)}
			</article>
		</section>
	)
}