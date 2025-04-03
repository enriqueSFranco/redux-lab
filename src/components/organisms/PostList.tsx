import { Outlet } from "@tanstack/react-router";
//import {
//    fetchPosts,
//    selectPostAll,
//    selectPostError,
//    selectPostStatus,
//} from "../../features/posts/postsSlice";
import { useGetPostQuery } from '../../features/api/apiSlice'
//import { useAppDispatch, useAppSelector } from "../../hooks";
//import { useEffect } from "react";
import { Spiner } from "../atoms/Spiner";
import { PostExcerpt } from "../molecules/PostExcerpt";

export function PostList () {
    const { data, isLoading, isError, isSuccess, error } = useGetPostQuery()
    //const dispatch = useAppDispatch();
    // para leer los datos de la store usamos el hook useSelector
    //const posts = useAppSelector(selectPostAll); // Select the `state.posts` value from the store into the component
    //const postStatus = useAppSelector(selectPostStatus);
    //const postError = useAppSelector(selectPostError);

    //useEffect(() => {
    //    if (postStatus === "idle") {
    //        dispatch(fetchPosts());
    //    }
    //}, [postStatus, dispatch]);

    let content: React.ReactNode;

    //if (postStatus === "pending") {
    //    content = <Spiner />;
    //} else if (postStatus === "succeeded") {
    //    const orderedPosts = posts
    //        .slice()
    //        .sort((postA, postB) => postB.date.localeCompare(postA.date));
    //    content = (
    //        <ul className='flex flex-col gap-4 w-fit'>
    //            {orderedPosts.map((post) => (
    //                <li className='w-fit' key={`postId-${post.title}`}>
    //                    <PostExcerpt post={post} />
    //                </li>
    //            ))}
    //        </ul>
    //    );
    //} else if (postStatus === "rejected") {
    //    content = <div>{postError}</div>;
    //}

    if (isLoading) {
        content = <Spiner />;
    } else if (isSuccess) {
        const orderedPosts = data
            .slice()
            .sort((postA, postB) => postB.date.localeCompare(postA.date));
        content = (
            <ul className='flex flex-col gap-4 w-fit'>
                {orderedPosts.map((post) => (
                    <li className='w-fit' key={`postId-${post.title}`}>
                        <PostExcerpt post={post} />
                    </li>
                ))}
            </ul>
        );
    } else if (isError) {
        content = <div>{error.toString()}</div>;
    }

    return (
        <>
            {content}
            <Outlet />
        </>
    );
}
