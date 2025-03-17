import { createFileRoute, redirect } from "@tanstack/react-router";
import { PostList } from "../components/organisms/PostList";

export const Route = createFileRoute("/_auth/posts")({
	component: PostPage,
	beforeLoad: ({ context }) => {
		const { auth } = context
		if (!auth.isAuthenticated) {
			throw redirect({ to: '/login' })
		}
	}
});

function PostPage () {
	return (
		<>
			<h2>Post List</h2>
			<PostList />
		</>
	)
}
