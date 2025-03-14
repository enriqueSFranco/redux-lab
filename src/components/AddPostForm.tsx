import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks";
import { type Post, postAdded } from "../features/posts/postsSlice";

interface AddPostFormFields extends HTMLFormControlsCollection {
    postTitle: HTMLInputElement;
    postContent: HTMLTextAreaElement;
}

interface AddPostFormElements extends HTMLFormElement {
    readonly elements: AddPostFormFields;
}

export function AddPostForm () {
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
        e.preventDefault();

        const { elements } = e.currentTarget;
        const title = elements.postTitle.value;
        const content = elements.postContent.value;

        console.log("Values: ", { title, content });
        const newPost: Post = {
            id: nanoid(),
            title,
            content,
        };
        dispatch(postAdded(newPost));
        e.currentTarget.reset();
    };

    return (
        <section>
            <h2>Add new post</h2>
            <form onSubmit={handleSubmit} aria-labelledby='addPostTitle'>
                <label htmlFor='postTitle'>Post Title:</label>
                <input
                    type='text'
                    id='postTitle'
                    defaultValue=''
                    required
                    aria-required='true'
                    aria-describedby='postTitleDescription'
                />
                <label htmlFor='postContent'>Content:</label>
                <textarea
                    id='postContent'
                    name='postContent'
                    defaultValue=''
                    required
                    aria-required="true"
                    aria-describedby="postContentDescription"
                />
                <button>Save Post</button>
            </form>
        </section>
    );
}
