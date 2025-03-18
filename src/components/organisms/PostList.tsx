import { Link, Outlet } from "@tanstack/react-router"
import { fetchPosts, type Post, selectPostAll, selectPostError, selectPostStatus } from "../../features/posts/postsSlice"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { TimeAgo } from "../atoms/TimeAgo"
import { ReactionButtons } from "../molecules/ReactionButtons"
import { useEffect } from "react"
import { Spiner } from "../atoms/Spiner"
import { PostAuthor } from "../atoms/PostAuthor"

interface PostProps {
    post: Post
}

function Post ({ post }: PostProps) {
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

export function PostList () {
    const dispatch = useAppDispatch()
    // para leer los datos de la store usamos el hook useSelector
    const posts = useAppSelector(selectPostAll) // Select the `state.posts` value from the store into the component
    const postStatus = useAppSelector(selectPostStatus)
    const postError = useAppSelector(selectPostError)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content: React.ReactNode

    if (postStatus === 'pending') {
        content = <Spiner />
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((postA, postB) => postB.date.localeCompare(postA.date))
        content = <ul className="flex flex-col gap-4 w-fit">{orderedPosts.map(post => <li className="w-fit" key={`postId-${post.title}`}><Post post={post} /></li>)}</ul>
    } else if (postStatus === 'rejected') {
        content = <div>{postError}</div>
    }

    return (
        <>
            {content}
            <Outlet />
        </>
    )
}
