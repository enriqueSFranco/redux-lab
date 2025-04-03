import { Link } from "@tanstack/react-router"
import { useAppSelector } from "../hooks"
import { selectPostAll } from "../features/posts/postsSlice"
import { TimeAgo } from "./TimeAgo"
import { ReactionButtons } from "./ReactionButtons"

export function PostList () {
    // para leer los datos de la store usamos el hook useSelector
    const posts = useAppSelector(selectPostAll) // Select the `state.posts` value from the store into the component
    const orderedPosts = posts.slice().sort((postA, postB) => postB.date - postA.date)

    return (
        <section>
            <ul className="flex gap-4">
                {orderedPosts.map(post => (
                    <li key={`post-id-${post.id}`}>
                        <article className="outline-gray-700 rounded-md outline-1 w-fit">
                            <TimeAgo timestamp={post.date} />
                            <h3 className="dark:text-white tracking-wide font-medium">
                                <Link to="/posts/$id" params={{ id: post.id }}>{post.title}</Link>
                            </h3>
                            <p className="post-name">{post.content.substring(0, 100)}</p>
                            <ReactionButtons post={post} />
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    )
}
