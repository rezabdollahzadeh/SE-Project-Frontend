import { useGetApi, usePutApi } from "hooks/useApi";
import { Dislike, Like1, Profile } from "iconsax-react";
import Comment from "model/Comment";
import { useState } from "react";

interface Props {
	comment: Comment;
}

export default function CommentItem({ comment: cmt }: Props) {
	const [comment, setComment] = useState<Comment>(cmt);

	const [_, updateComment] = useGetApi<Comment>(
		`https://localhost:5000/comments/${cmt.id}`,
		(newCmt) => setComment(newCmt)
	);

	const [likes, putLikes] = usePutApi(
		`https://localhost:5000/comments/${cmt.id}/likes`,
		() => updateComment()
	);

	const LikeComment = () =>
		putLikes({
			like: true,
		});

	const DislikeComment = () =>
		putLikes({
			like: false,
		});

	return (
		<div className="grid grid-cols-[20%_auto] border-b-2 border-gray-200 py-5 gap-5">
			<div className="flex flex-col items-center gap-3">
				{comment.userImage === undefined ? (
					<Profile className="w-10 h-10" />
				) : (
					<img
						className="w-10 h-10 rounded-full object-cover"
						src={comment.userImage}
					/>
				)}
				<p className="text-blue font-semibold">{comment.username}</p>

				<div className="flex gap-x-2 items-center text-center">
					<div
						className="bg-green/20 rounded-md p-1 flex gap-2 cursor-pointer box-border border-2 border-transparent duration-300 hover:border-green"
						onClick={LikeComment}
					>
						<p>{comment.likes}</p>
						<Like1 variant="Bold" color="#06c574" />
					</div>
					<div
						className="bg-red/20 rounded-md p-1 flex gap-2 cursor-pointer box-border border-2 border-transparent duration-300 hover:border-red"
						onClick={DislikeComment}
					>
						<Dislike variant="Bold" color="#ef3b50" />
						<p>{comment.dislikes}</p>
					</div>
				</div>
			</div>

			<p className="whitespace-pre-wrap break-words py-2">
				{comment.text}
			</p>
		</div>
	);
}
