import Button from "components/Button";
import DiscountTokenItem from "components/DiscountTokenItem";
import InputField from "components/InputField";
import Loading from "components/Loading";
import PageController from "components/PageController";
import Toggle from "components/Toggle";
import { useDeleteApi, useGetApi, usePostApi } from "hooks/useApi";
import { MainContext } from "MainContext";
import DiscountToken from "model/DiscountToken";
import Pagination from "model/Pagination";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";

interface RowItemProps {
	token: DiscountToken;
	updatePage: () => void;
}
function RowItem({ token, updatePage }: RowItemProps) {
	const url = `https://localhost:5000/admin/discountTokens/${token.id}`;
	const [_, deleteToken] = useDeleteApi(url, updatePage);
	const ctx = useContext(MainContext);

	return (
		<div className="w-full grid grid-cols-[20%,auto] p-2 gap-3 items-center border-2 border-gray-200 rounded-lg">
			<Button
				filled
				text="حذف کد تخفیف"
				color="red"
				onClick={() => {
					ctx.showAlert({
						status: "Question",
						text: "آیا از حذف کد تخفیف اطمینان دارید؟",
						onAccept() {
							deleteToken();
						},
					});
				}}
				className="font-normal w-full h-fit"
			/>

			<DiscountTokenItem
				className="grid grid-cols-[25%_auto]"
				token={token}
			/>
		</div>
	);
}

interface AddTokenProps {
	updatePage: () => void;
}
function AddToken({ updatePage }: AddTokenProps) {
	const [_, addToken] = usePostApi(
		"https://localhost:5000/admin/discountTokens",
		updatePage,
		() =>
			ctx.showAlert({
				status: "Error",
				text: "خطایی رخ داده است.",
			})
	);
	const ctx = useContext(MainContext);

	const [isEvent, setIsEvent] = useState(false);
	const [discountText, setDiscountText] = useState("");
	const [expirationDate, setExpirationDate] = useState("");

	const validateFields = (): string | true => {
		if (!z.string().min(8).safeParse(discountText).success)
			return "کد تخفیف نامعتبر میباشد.";

		if (
			!z.string().startsWith("AMOUNT_").safeParse(discountText).success &&
			!z.string().startsWith("PERCENT_").safeParse(discountText).success
		)
			return "کد تخفیف نامعتبر میباشد.";

		if (!z.date().safeParse(new Date(expirationDate)).success)
			return "تاریخ انقضا نامعتبر میباشد.";

		return true;
	};

	return (
		<div className="w-full flex p-2 gap-3 bg-gray-100 border-2 border-gray-200 rounded-lg items-center justify-between">
			<Button
				filled
				text="افزودن کد تخفیف"
				color="green"
				onClick={() => {
					const validationResult = validateFields();

					if (validationResult === true) {
						addToken({
							expirationDate: new Date(
								expirationDate
							).toISOString(),
							discount: discountText,
							isEvent,
						});
					} else {
						ctx.showAlert({
							status: "Error",
							text: validationResult,
						});
					}
				}}
				className="font-normal h-fit"
			/>

			<Toggle text="جشنواره" onClick={(val) => setIsEvent(val)} />

			<InputField
				placeholder="انقضای کد تخفیف"
				setText={setExpirationDate}
			/>

			<InputField
				placeholder="مقدار کد تخفیف"
				setText={setDiscountText}
			/>
		</div>
	);
}

export default function ManageDiscountTokens() {
	const ctx = useContext(MainContext);

	const [tokensDoe, loadTokens] = useGetApi<Pagination<DiscountToken>>(
		"https://localhost:5000/admin/discountTokens"
	);

	const loadPage = (page: number = 1) => {
		loadTokens({
			page,
			tokensPerPage: 10,
		});
	};

	useEffect(() => {
		loadPage();
	}, []);

	if (ctx.profile.loading || tokensDoe.loading)
		return (
			<div className="w-full h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	if ("error" in ctx.profile || "error" in tokensDoe)
		return (
			<div className="w-full h-full flex justify-center items-center">
				خطایی رخ داده است
			</div>
		);

	const updatePage = () =>
		loadTokens({
			page: tokensDoe.data.page,
			tokensPerPage: 10,
		});

	return (
		<div className="w-full h-full flex flex-col items-center gap-5 p-5 justify-between">
			<AddToken updatePage={updatePage} />

			{tokensDoe.data.data.length === 0 ? (
				<p className="text-center mt-10 font-medium text-2xl">
					کد تخفیفی یافت نشد
				</p>
			) : (
				<>
					<div className="w-full flex flex-col gap-3">
						{tokensDoe.data.data.map((t, i) => (
							<RowItem
								key={i}
								token={t}
								updatePage={updatePage}
							/>
						))}
					</div>

					<PageController
						pagination={tokensDoe.data}
						setPage={(newPage) => {
							loadPage(newPage);
						}}
					/>
				</>
			)}
		</div>
	);
}
