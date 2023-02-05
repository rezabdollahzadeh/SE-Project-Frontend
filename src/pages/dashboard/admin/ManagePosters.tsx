import Button from "components/Button";
import InputField from "components/InputField";
import Loading from "components/Loading";
import { useDeleteApi, useGetApi, usePostApi } from "hooks/useApi";
import { MainContext } from "MainContext";
import Pagination from "model/Pagination";
import Poster from "model/Poster";
import { useContext, useEffect, useState } from "react";
import z from "zod";

interface RowItemProps {
	poster: Poster;
	updatePosters: () => void;
}
function RowItem({ poster, updatePosters }: RowItemProps) {
	const ctx = useContext(MainContext);

	const url = `https://localhost:5000/posters/${poster.id}`;

	const [_, deletePoster] = useDeleteApi(
		url,
		() => updatePosters(),
		() =>
			ctx.showAlert({
				status: "Error",
				text: "خطایی رخ داده است.",
			})
	);

	return (
		<div className="w-full overflow-hidden rounded-lg border-2 border-gray-300 cursor-pointer duration-300 bg-gray-100 hover:bg-gray-200">
			<img className="w-full object-fill" src={poster.imageUrl} />
			<div className="grid grid-cols-4 gap-3 p-3 items-end">
				<Button
					text="حذف پوستر"
					onClick={() => {
						ctx.showAlert({
							status: "Question",
							text: "آیا از حذف پوستر اطمینان دارید؟",
							onAccept() {
								deletePoster();
							},
						});
					}}
					filled
					color="red"
					className="h-fit"
				/>
				<InputField
					name="لینک پوستر"
					placeholder={poster.imageUrl}
					className="col-span-2"
					disabled
				/>
				<InputField
					name="عنوان پوستر"
					placeholder={poster.title}
					className="col-span-1"
					disabled
				/>
			</div>
		</div>
	);
}

function AddPoster({ updatePosters }: { updatePosters: () => void }) {
	const ctx = useContext(MainContext);
	const [title, setTitle] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");

	const [_, addPoster] = usePostApi(
		"https://localhost:5000/posters",
		() => updatePosters(),
		() =>
			ctx.showAlert({
				status: "Error",
				text: "خطایی رخ داده است.",
			})
	);

	const validateFields = (): string | true => {
		if (!z.string().min(1).safeParse(title).success)
			return "عنوان نامعتبر میباشد.";

		if (!z.string().url().safeParse(imageUrl).success)
			return "آدرس تصویر وارد شده نامعتبر میباشد.";

		return true;
	};

	return (
		<div className="w-full rounded-lg border-b border-gray-300 bg-gray-200 grid grid-cols-4 gap-3 p-3 items-end">
			<Button
				text="افزودن پوستر"
				onClick={() => {
					const validationResult = validateFields();

					console.log(z.string().min(1).safeParse(title));

					if (validationResult === true) {
						addPoster({
							title,
							imageUrl,
						});
					} else {
						ctx.showAlert({
							status: "Error",
							text: validationResult,
						});
					}
				}}
				filled
				color="green"
				className="h-fit"
			/>
			<InputField
				name="لینک پوستر"
				placeholder="لینک پوستر"
				setText={setImageUrl}
				className="col-span-2"
			/>
			<InputField
				name="عنوان پوستر"
				placeholder="عنوان پوستر"
				setText={setTitle}
				className="col-span-1"
			/>
		</div>
	);
}

export default function ManagePosters() {
	const ctx = useContext(MainContext);
	const [postersDoe, getPosters] = useGetApi<Pagination<Poster>>(
		"https://localhost:5000/posters"
	);

	const updatePage = () =>
		getPosters({
			postersPerPage: 50,
			page: 1,
		});

	useEffect(updatePage, []);

	if (ctx.profile.loading || postersDoe.loading)
		return (
			<div className="w-full h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	if ("error" in ctx.profile || "error" in postersDoe)
		return (
			<div className="w-full h-full flex justify-center items-center">
				خطایی رخ داده است
			</div>
		);

	return (
		<div className="w-full h-fit flex flex-col items-center gap-3">
			{postersDoe.data.data.length === 0 ? (
				<p className="text-center mt-10 font-medium text-2xl">
					کاربری یافت نشد
				</p>
			) : (
				<>
					<AddPoster updatePosters={updatePage} />
					{postersDoe.data.data.map((p, i) => (
						<RowItem
							key={i}
							poster={p}
							updatePosters={updatePage}
						/>
					))}
				</>
			)}
		</div>
	);
}
