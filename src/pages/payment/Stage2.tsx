import Button from "components/Button";
import InputField from "components/InputField";
import Loading from "components/Loading";
import { usePutApi } from "hooks/useApi";
import { CloseCircle, DiscountShape } from "iconsax-react";
import { MainContext } from "MainContext";
import Cart from "model/Cart";
import { useContext, useState } from "react";
import MellatBank from "../../assets/images/MellatBank.png";

type DiscountUseStatus = {
	status: "Valid" | "Invalid";
	cart: Cart;
};

export default function Stage2() {
	const ctx = useContext(MainContext);
	const [discountToken, setDiscountToken] = useState("");

	const [tokenDoe, useToken] = usePutApi<DiscountUseStatus>(
		`https://localhost:5000/discountTokens/${discountToken}/use`,
		(res) => {
			if (res.status === "Invalid") {
				ctx.showAlert({
					status: "Warning",
					text: "کد تخفیف نامعتبر میباشد.",
				});
			} else {
				ctx.syncCart();
			}
		},
		() => {
			ctx.showAlert({
				status: "ConnectionLoss",
				text: "خطایی در ارتباط با سرور رخ داده است.",
			});
		}
	);

	if (ctx.profile.loading || ctx.currentCart.loading)
		return (
			<div className="h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	if ("error" in ctx.profile || "error" in ctx.currentCart)
		return (
			<div className="h-full flex justify-center items-center">
				خطایی رخ داده است
			</div>
		);

	if (ctx.profile.data.accessLevel !== "customer")
		return (
			<div className="h-full flex justify-center items-center">
				یک مشتری امکان مشاهده قیمت را دارد
			</div>
		);

	const banks = [
		{
			name: "Mellat",
			image: MellatBank,
		},
		{
			name: "Mellat",
			image: MellatBank,
		},
		{
			name: "Mellat",
			image: MellatBank,
		},
		{
			name: "Mellat",
			image: MellatBank,
		},
	];

	const useTokenReq = () => {
		if ("data" in ctx.currentCart) {
			useToken(undefined, { cartId: ctx.currentCart.data.id });
		} else {
			ctx.showAlert({
				status: "ConnectionLoss",
				text: "خطایی در ارتباط با سرور رخ داده است.",
			});
		}
	};

	return (
		<>
			<div className="border-[1.5px] border-gray-300 rounded-3xl flex justify-end px-8 py-4 gap-6">
				<CloseCircle
					className="mt-11 cursor-pointer"
					onClick={() => setDiscountToken("")}
				/>

				<Button
					text="ثبت کد تخفیف"
					onClick={() => {
						useTokenReq();
					}}
					className="mt-7 py-2"
					accent="blue"
				/>

				<InputField
					icon={
						<DiscountShape
							color="#2388FF"
							variant="Bold"
							size={22}
						/>
					}
					name={"ثبت کد تخفیف"}
					setText={setDiscountToken}
					placeholder="اگر کد تخفیف دارید در این قسمت وارد کنید"
					className="w-1/2"
					rtl
				/>
			</div>
			<div
				className="border-[1.5px] border-gray-300 rounded-3xl flex flex-col gap-4 p-6"
				dir="rtl"
			>
				<p className="font-semibold">انتخاب درگاه بانکی برای پرداخت</p>
				<hr className="bg-gray-300 h-[1.5px] col-span-2" />
				<div className="bg-gray-200 w-full rounded-3xl flex gap-4 p-5">
					{banks.map((bank, _) => (
						<div
							key={_}
							className="bg-white rounded-3xl flex items-center p-2 pl-4 w-full h-fit"
						>
							<input
								key={_}
								value={bank.name}
								id={bank.name}
								name="banks"
								type="radio"
								className="bg-white rounded-3xl"
							/>
							<img
								className="max-h-full mx-auto"
								src={bank.image}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
