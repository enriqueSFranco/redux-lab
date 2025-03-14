import { createFileRoute, useParams } from '@tanstack/react-router'
import { useAppSelector } from '../../hooks'


export const Route = createFileRoute('/post/$id')({
    component: SinglePagePost
})

function SinglePagePost () {
    const { id = "" } = useParams({ strict: false })

    const post = useAppSelector(state => {
        return state.posts.find(post => post.id === id)
    })


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
            </article>
        </section>
    )
}