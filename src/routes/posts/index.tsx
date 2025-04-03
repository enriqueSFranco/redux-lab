import { createFileRoute } from "@tanstack/react-router";
import { PostList } from "../../components/PostList";

export const Route = createFileRoute("/posts/")({
	component: Index,
});

function Index () {
	return (
		<>
			<h2>Post List</h2>
			<PostList />
		</>
	)
}
