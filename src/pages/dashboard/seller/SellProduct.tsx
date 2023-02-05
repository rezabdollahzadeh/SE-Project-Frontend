import Button from "components/Button";
import InputField from "components/InputField";
import Loading from "components/Loading";
import { usePostApi, usePutApi } from "hooks/useApi";
import { Edit, Profile } from "iconsax-react";
import { MainContext } from "MainContext";
import User from "model/User";
import { useContext, useState } from "react";
import { z } from "zod";

export default function SellProduct() {
	const ctx = useContext(MainContext);

	if (ctx.profile.loading) return <Loading />;
	if ("error" in ctx.profile) return <p>خطایی رخ داده است ...</p>;

	const [sellDoe, sellProduct] = usePostApi<User>(
		"https://localhost:5000/prices",
		() => {
			ctx.syncProfile();
			ctx.showAlert({
				status: "Success",
				text: "فروش شما با موفقیت ثبت شد.",
			});
		},
		() => ctx.showAlert({ status: "Error", text: "خطایی رخ داده است" })
	);

	// =============== New Fields ===============

	// const sellerId = ctx.profile.data.id;
	const sellerId = "DC1FC170-FB31-483F-81C9-6FD88097BEDE";
	const [productId, setProductId] = useState("");
	const [amount, setAmount] = useState("");
	const [price, setPrice] = useState("");
	const [discount, setDiscount] = useState("");

	const validateFields = (): string | true => {
		if (!z.string().length(36).safeParse(productId).success)
			return "کد محصول نامعتبر میباشد.";

		if (!z.number().min(1).safeParse(parseInt(amount)).success)
			return "تعداد وارد شده نامعتبر میباشد.";

		if (!z.number().min(1).safeParse(parseInt(price)).success)
			return "قیمت وارد شده نامعتبر میباشد.";

		if (
			discount &&
			!discount.startsWith("AMOUNT_") &&
			!discount.startsWith("PERCENT_")
		)
			return "تخفیف وارد شده نامعتبر میباشد.";

		return true;
	};

	// ==========================================

	return (
		<div className="w-full flex flex-col items-center p-5 gap-5">
			<p
				className="w-full font-medium text-lg border-b-2 border-gray-300 p-2"
				dir="rtl"
			>
				اطلاعات فروش
			</p>
			<div
				className="w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
				dir="rtl"
			>
				<InputField
					name="کد محصول"
					placeholder=""
					setText={setProductId}
				/>

				<InputField name="کد فروشنده" placeholder={sellerId} disabled />

				<InputField name="تعداد" setText={setAmount} />

				<InputField name="قیمت" setText={setPrice} />

				<InputField name="تخفیف" setText={setDiscount} />
			</div>

			<Button
				text="ذخیره اطلاعات"
				onClick={() => {
					const validationResult = validateFields();
					if (validationResult === true) {
						sellProduct({
							sellerID: sellerId,
							productID: productId,
							amount: parseInt(amount),
							price: parseFloat(price),
							discount,
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
			/>
		</div>
	);
}
