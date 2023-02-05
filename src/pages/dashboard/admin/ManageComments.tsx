import Button from "components/Button";
import InputField from "components/InputField";
import Loading from "components/Loading";
import PageController from "components/PageController";
import { useDeleteApi, useGetApi, usePostApi } from "hooks/useApi";
import { Dislike, Like1, Profile } from "iconsax-react";
import { MainContext } from "MainContext";
import Comment from "model/Comment";
import Pagination from "model/Pagination";
import Product from "model/Product";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import z from "zod";

interface RowItemProps {
	comment: Comment;
	updateComments: () => void;
}
function RowItem({ comment, updateComments }: RowItemProps) {
	const ctx = useContext(MainContext);
	const navigate = useNavigate();

	const url = `https://localhost:5000/comments/${comment.id}`;

	const [_, deleteComment] = useDeleteApi(
		url,
		() => updateComments(),
		() =>
			ctx.showAlert({
				status: "Error",
				text: "خطایی رخ داده است.",
			})
	);

	const [product, getProduct] = useGetApi<Product>(
		`https://localhost:5000/products/${comment.productId}`
	);

	useEffect(getProduct, []);

	return (
		<div
			className="grid grid-cols-5 items-center border-b-2 border-gray-200 p-5"
			dir="rtl"
		>
			<div
				className="flex flex-col items-center gap-3 cursor-pointer border-l border-gray-300"
				onClick={() => navigate(`/products/${comment.productId}`)}
			>
				{product.loading ? (
					<Loading />
				) : "error" in product ? (
					"اروری رخ داده است"
				) : (
					<>
						<img
							className="w-12 h-12 rounded-full object-cover"
							src={product.data.image}
						/>
						<p className="text-blue font-semibold overflow-hidden break-all text-center">
							{product.data.name}
						</p>

						<div className="flex gap-x-2 items-center text-center">
							<div className="bg-green/20 rounded-md p-1 flex gap-2">
								<p>{product.data.likes}</p>
								<Like1 variant="Bold" color="#06c574" />
							</div>
							<div className="bg-red/20 rounded-md p-1 flex gap-2">
								<Dislike variant="Bold" color="#ef3b50" />
								<p>{product.data.dislikes}</p>
							</div>
						</div>
					</>
				)}
			</div>

			<div className="flex flex-col items-center gap-3 border-l border-gray-300">
				{comment.userImage === undefined ? (
					<Profile className="w-12 h-12" />
				) : (
					<img
						className="w-12 h-12 rounded-full object-cover"
						src={comment.userImage}
					/>
				)}
				<p className="text-blue font-semibold overflow-hidden break-all text-center">
					{comment.username}
				</p>

				<div className="flex gap-x-2 items-center text-center">
					<div className="bg-green/20 rounded-md p-1 flex gap-2">
						<p>{comment.likes}</p>
						<Like1 variant="Bold" color="#06c574" />
					</div>
					<div className="bg-red/20 rounded-md p-1 flex gap-2">
						<Dislike variant="Bold" color="#ef3b50" />
						<p>{comment.dislikes}</p>
					</div>
				</div>
			</div>

			<div className="h-full flex items-center justify-center px-5 col-span-2 border-l border-gray-300">
				<p className="break-words">{comment.text}</p>
			</div>

			<div className="h-full flex flex-col items-center justify-center gap-2 pr-5">
				<p>{new Date(comment.sendDate).toLocaleDateString()}</p>
				<p>{new Date(comment.sendDate).toLocaleTimeString()}</p>
				<Button
					text="حذف دیدگاه"
					className="w-full"
					filled
					color="red"
					onClick={() => {
						ctx.showAlert({
							status: "Question",
							text: "آیا از حذف دیدککاه اطمینان دارید؟",
							onAccept() {
								deleteComment();
							},
						});
					}}
				/>
			</div>
		</div>
	);
}

export default function ManageComments() {
	const ctx = useContext(MainContext);
	const [commentsDoe, getComments] = useGetApi<Pagination<Comment>>(
		"https://localhost:5000/comments"
	);

	const [productId, setProductId] = useState("");
	const [userId, setUserId] = useState("");
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");

	const loadPage = (page: number = 1) => {
		getComments({
			commentsPerPage: 10,
			page,
			productId: productId ? productId : undefined,
			userId: userId ? userId : undefined,
			dateFrom: dateFrom ? dateFrom : undefined,
			dateTo: dateTo ? dateTo : undefined,
		});
	};

	useEffect(loadPage, []);

	if (ctx.profile.loading || commentsDoe.loading)
		return (
			<div className="w-full h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	if ("error" in ctx.profile || "error" in commentsDoe)
		return (
			<div className="w-full h-full flex justify-center items-center">
				خطایی رخ داده است
			</div>
		);

	const reloadPage = () => {
		getComments({
			commentsPerPage: 10,
			page: commentsDoe.data.page,
			productId: productId ? productId : undefined,
			userId: userId ? userId : undefined,
			dateFrom: dateFrom ? dateFrom : undefined,
			dateTo: dateTo ? dateTo : undefined,
		});
	};

	const validateFields = (): string | true => {
		if (productId && !z.string().length(36).safeParse(productId).success)
			return "کد محصول نامعتبر میباشد.";

		if (userId && !z.string().length(36).safeParse(userId).success)
			return "کد کاربر نامعتبر میباشد.";

		if (dateFrom && !z.date().safeParse(new Date(dateFrom)).success)
			return "تارخ شروع نامعتبر میباشد.";

		if (dateTo && !z.date().safeParse(new Date(dateTo)).success)
			return "تارخ پایان نامعتبر میباشد.";

		return true;
	};

	return (
		<div className="w-full h-fit flex flex-col items-center pb-3 gap-3">
			<div className="w-full h-fit p-5 border-b border-gray-300 grid grid-cols-5 items-end gap-4">
				<Button
					text="فیلتر کن"
					filled
					color="orange"
					onClick={() => {
						const vr = validateFields();

						if (vr == true) {
							loadPage();
						} else {
							ctx.showAlert({ status: "Error", text: vr });
						}
					}}
					className="h-fit"
				/>
				<InputField name="تا تاریخ" setText={setDateTo} />
				<InputField name="از تاریخ" setText={setDateFrom} />
				<InputField name="کد کاربر" setText={setUserId} />
				<InputField name="کد محصول" setText={setProductId} />
			</div>
			{commentsDoe.data.data.length === 0 ? (
				<p className="text-center mt-10 font-medium text-2xl">
					دیدگاهی یافت نشد
				</p>
			) : (
				<div className="flex flex-col w-full gap-3 pb-33">
					{commentsDoe.data.data.map((p, i) => (
						<RowItem
							key={i}
							comment={p}
							updateComments={reloadPage}
						/>
					))}

					<PageController
						pagination={commentsDoe.data}
						setPage={loadPage}
					/>
				</div>
			)}
		</div>
	);
}
