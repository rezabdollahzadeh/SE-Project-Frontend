import Button from "components/Button";
import InputField from "components/InputField";
import Loading from "components/Loading";
import { useGetApi, usePutApi } from "hooks/useApi";
import { DollarSquare, MoneyAdd } from "iconsax-react";
import { MainContext } from "MainContext";
import Customer from "model/Customer";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";

export default function Wallet() {
	const ctx = useContext(MainContext);

	if (ctx.profile.loading)
		return (
			<div className="h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	if ("error" in ctx.profile)
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

	const [customerDoe, getCustomerProfile] = useGetApi<Customer>(
		`https://localhost:5000/customers/${ctx.profile.data.id}`
	);
	const [balanceDoe, updateBalance] = usePutApi<Customer>(
		`https://localhost:5000/customers/${ctx.profile.data.id}`,
		getCustomerProfile,
		() =>
			ctx.showAlert({
				status: "ConnectionLoss",
				text: "خطایی رخ داده است.",
			})
	);
	const [chargeAmount, setChargeAmount] = useState("");

	useEffect(() => {
		getCustomerProfile();
	}, []);

	if (customerDoe.loading || balanceDoe.loading)
		return (
			<div className="h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	if ("error" in customerDoe)
		return (
			<div className="h-full flex justify-center items-center">
				خطایی رخ داده است
			</div>
		);

	return (
		<div className="h-full flex flex-col gap-5 justify-center items-center">
			<div className="grid grid-cols-[30%_auto] grid-rows-2 gap-5 items-end">
				<p
					className="font-medium text-xl flex gap-2 items-center p-5 bg-orange rounded-2xl text-white col-span-2"
					dir="rtl"
				>
					<DollarSquare className="w-8 h-8" variant="Bold" />
					{`موجودی شما ${customerDoe.data.balance} تومان است`}
				</p>
				<Button
					text="شارژ کن"
					onClick={() => {
						console.log(chargeAmount);

						if (
							!z
								.number()
								.or(z.string().regex(/\d+/).transform(Number))
								.safeParse(parseInt(chargeAmount)).success
						) {
							ctx.showAlert({
								status: "Error",
								text: "مقدار وارد شده نامعتبر میباشد",
							});
							return;
						}

						updateBalance({
							balance: parseInt(chargeAmount),
						});
					}}
					filled
					className="h-fit"
				/>
				<InputField
					name="شارژ اکانت"
					setText={(val) => setChargeAmount(val)}
				/>
			</div>
		</div>
	);
}
