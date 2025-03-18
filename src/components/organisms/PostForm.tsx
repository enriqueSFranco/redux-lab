import React from "react";
import { useParams } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  postAdded,
  postUpdated,
  selectPostById,
} from "../../features/posts/postsSlice";
import { selectCurrentUsername } from "../../features/auth/authSlice";

interface PostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement;
  postContent: HTMLTextAreaElement;
  postUser: HTMLSelectElement;
}

interface PostFormElements extends HTMLFormElement {
  readonly elements: PostFormFields;
}

export function AddPostForm () {
  const { id = "" } = useParams({ strict: false });
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();
  const existingPost = useAppSelector((state) => selectPostById(state, id));
  const userId = useAppSelector(selectCurrentUsername);

  const handleSubmit = (e: React.FormEvent<PostFormElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const title = elements.postTitle.value;
    const content = elements.postContent.value;

    //console.log("Values: ", { title, content });
    if (existingPost && title && content)
      dispatch(postUpdated({ id, title, content }));
    else dispatch(postAdded(title, content, userId));

    //navigate({ to: existingPost ? "/posts/$id" : "/" });
    e.currentTarget.reset();
  };

  return (
    <section className='flex flex-col'>
      <h2>{existingPost ? `Edit post #${id}` : "Add new post"}</h2>
      <form
        onSubmit={handleSubmit}
        aria-labelledby='addPostTitle'
        className='flex flex-col gap-2 w-100'
      >
        <label htmlFor='postTitle' className="text-left text-sm">Post Title:</label>
        <input
          type='text'
          id='postTitle'
          defaultValue={existingPost?.title || ""}
          required
          aria-required='true'
          aria-describedby='postTitleDescription'
          className='outline-purple-700 outline-1 px-2 py-1 rounded-sm'
          autoComplete="off"
          placeholder="Writing a post"
        />
        <label htmlFor='postContent' className="text-left text-sm">Content:</label>
        <textarea
          id='postContent'
          name='postContent'
          defaultValue={existingPost?.content || ""}
          required
          aria-required='true'
          aria-describedby='postContentDescription'
          className='outline-purple-700 outline-1 resize-none px-2 py-1 rounded-sm'
          placeholder="Writing a content"
        />
        <button>{existingPost ? "Save changes" : "Add post"}</button>
      </form>
    </section>
  );
}
