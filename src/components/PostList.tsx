import { Link } from "@tanstack/react-router"
import { useAppSelector } from "../hooks"

export function PostList () {
    // para leer los datos de la store usamos el hook useSelector
    const posts = useAppSelector(state => state.posts) // Select the `state.posts` value from the store into the component

    return (
        <section className="post-list">
            <ul>
                {posts.map(post => (
                    <li key={`post-id-${post.id}`}>
                        <article className="post-excerpt">
                            <h3>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h3>
                            <p className="post-name">{post.content.substring(0, 100)}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    )
}
