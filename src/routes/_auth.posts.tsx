import { createFileRoute, redirect } from "@tanstack/react-router";
import { PostList } from "../components/organisms/PostList";
import { AddPostForm } from "../components/organisms/PostForm";

export const Route = createFileRoute("/_auth/posts")({
    component: PostPage,
    beforeLoad: ({ context }) => {
        const { auth } = context;
        if (!auth.isAuthenticated) {
            throw redirect({ to: "/login" });
        }
    },
});

function PostPage () {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-purple-600 text-4xl text-left">Posts</h2>
            <AddPostForm />
            <PostList />
        </section>
    );
}
