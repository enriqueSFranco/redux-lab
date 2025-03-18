import { Link } from '@tanstack/react-router'
import { PostAuthor } from '../atoms/PostAuthor'
import { TimeAgo } from '../atoms/TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { Post } from '../../features/posts/postsSlice'

interface PostExcerptProps {
	post: Post
}


export function PostExcerpt ({ post }: PostExcerptProps) {
	return (
		<article className="outline-gray-700 rounded-md outline-1 w-100 flex flex-col items-start gap-2 px-4 py-2">
			<PostAuthor userId={post.user} />
			<TimeAgo timestamp={post.date} />
			<h3 className="dark:text-white tracking-wide font-medium">
				<Link to="/posts/$id" params={{ id: post.id }}>{post.title}</Link>
			</h3>
			<p className="post-name tracking-wide text-left">{post.content.substring(0, 100)}</p>
			<ReactionButtons post={post} />
		</article>
	)
}
