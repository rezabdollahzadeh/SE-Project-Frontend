import Button from "components/Button";
import InputField from "components/InputField";
import Loading from "components/Loading";
import { useGetApi, usePutApi } from "hooks/useApi";
import { MainContext } from "MainContext";
import Customer from "model/Customer";
import { useContext, useEffect, useState } from "react";

export default function Address() {
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

	const [customerDoe, getCustomerProfile] = useGetApi<Customer>(
		`https://localhost:5000/customers/${ctx.profile.data.id}`
	);
	const [_, updateAddress] = usePutApi<Customer>(
		`https://localhost:5000/customers/${ctx.profile.data.id}`,
		() => {
			getCustomerProfile();
			ctx.showAlert({
				status: "Success",
				text: "آدرس شما با موفقیت تغییر یافت.",
			});
		},
		() =>
			ctx.showAlert({
				status: "ConnectionLoss",
				text: "خطایی رخ داده است.",
			})
	);
	const [address, setAddress] = useState("");

	useEffect(() => {
		getCustomerProfile();
	}, []);

	if (customerDoe.loading)
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
		<div className="h-full grid grid-cols-[30%_70%] gap-5 justify-center items-center p-10">
			<Button
				text="تغییر آدرس"
				onClick={() => {
					if (address === "") {
						ctx.showAlert({
							status: "Error",
							text: "آدرس وارد شده نامعتبر میباشد",
						});
						return;
					}

					updateAddress({
						address,
					});
				}}
				filled
			/>

			<InputField
				placeholder={customerDoe.data.address}
				setText={setAddress}
				className="w-full"
			/>
		</div>
	);
}
