import { selectUserById } from "../../features/users/usersSlice";
import { useAppSelector } from "../../hooks";

interface PostAuthorProps {
    userId: string;
}

export function PostAuthor ({ userId }: PostAuthorProps) {
    const author = useAppSelector((state) => selectUserById(state, userId));
    return <span>by {author?.name ?? "Unknown author"}</span>;
}
