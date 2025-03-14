import { createFileRoute } from '@tanstack/react-router'
import { AddPostForm } from '../components/PostForm'
import { PostList } from '../components/PostList'

export const Route = createFileRoute('/')({
    component: Index
})

function Index () {
    return (
        <div className="p-2">
            <h3>Welcome Home !</h3>
            <AddPostForm />
            <PostList />
        </div>
    )
}