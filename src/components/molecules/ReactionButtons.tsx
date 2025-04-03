import {
    Post,
    reactionAdded,
    ReactionName,
} from "../../features/posts/postsSlice";
import { useAppDispatch } from "../../hooks";

const reactionEmoji: Record<ReactionName, string> = {
    thumbsUp: "👍",
    tada: "🎉",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀",
} as const;

interface ReactionButtonsProps {
    post: Post;
}

export function ReactionButtons ({ post }: ReactionButtonsProps) {
    const dispatch = useAppDispatch();

    return (
        <div>
            <ul className="flex items-center justify-start gap-4">
                {Object.entries(reactionEmoji).map(([nameReaction, emoji]) => {
                    const reaction = nameReaction as ReactionName;
                    return (
                        <button
                            type='button'
                            key={`buttonReaction-id-${reaction}`}
                            onClick={() =>
                                dispatch(reactionAdded({ postId: post.id, reaction }))
                            }
                            className="px-2 py-1 outline outline-gray-700 rounded-sm"
                        >
                            {emoji} {post.reactions[reaction]}
                        </button>
                    );
                })}
            </ul>
        </div>
    );
}
