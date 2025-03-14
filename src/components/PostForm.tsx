import React from "react";
import { useNavigate, useParams } from "@tanstack/react-router"
import { useAppDispatch, useAppSelector } from "../hooks";
import { type Post, postAdded, postUpdated, selectPostById } from "../features/posts/postsSlice";

interface PostFormFields extends HTMLFormControlsCollection {
    postTitle: HTMLInputElement;
    postContent: HTMLTextAreaElement;
}

interface PostFormElements extends HTMLFormElement {
    readonly elements: PostFormFields;
}

export function AddPostForm () {
    const { id = "" } = useParams({ strict: false })
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const existingPost = useAppSelector(state => selectPostById(state, id))

    const handleSubmit = (e: React.FormEvent<PostFormElements>) => {
        e.preventDefault();

        const { elements } = e.currentTarget;
        const title = elements.postTitle.value;
        const content = elements.postContent.value;

        console.log("Values: ", { title, content });

        if (existingPost && title && content)
            dispatch(postUpdated({ id, title, content }))
        else
            dispatch(postAdded(title, content));

        navigate(existingPost ? `/post/${id}` : "/")
        e.currentTarget.reset();
    };

    return (
        <section>
            <h2>{existingPost ? `Edit post #${id}` : "Add new post"}</h2>
            <form onSubmit={handleSubmit} aria-labelledby='addPostTitle'>
                <label htmlFor='postTitle'>Post Title:</label>
                <input
                    type='text'
                    id='postTitle'
                    defaultValue={existingPost?.title || ""}
                    required
                    aria-required='true'
                    aria-describedby='postTitleDescription'
                />
                <label htmlFor='postContent'>Content:</label>
                <textarea
                    id='postContent'
                    name='postContent'
                    defaultValue={existingPost?.content || ""}
                    required
                    aria-required="true"
                    aria-describedby="postContentDescription"
                />
                <button>{existingPost ? "Save changes" : "Add post"}</button>
            </form>
        </section>
    );
}
