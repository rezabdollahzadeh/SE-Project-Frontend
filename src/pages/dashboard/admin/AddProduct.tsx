import Button from "components/Button";
import ComboBox from "components/ComboBox";
import InputField from "components/InputField";
import Textarea from "components/Textarea";
import { usePostApi } from "hooks/useApi";
import { MainContext } from "MainContext";
import { useContext, useEffect, useState } from "react";
import Product from "../../../model/Product";
import { z } from "zod";
import Loading from "components/Loading";

export default function AddProduct() {
	const ctx = useContext(MainContext);

	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");

	const [productDoe, addProduct] = usePostApi<Product>(
		"https://localhost:5000/products"
	);

	const validateFields = (): string | true => {
		if (!z.string().min(1).safeParse(name).success)
			return "نام محصول نامعتبر میباشد.";

		if (!z.string().min(1).safeParse(category).success)
			return "دسته بندی نامعتبر میباشد.";

		if (!z.string().url().safeParse(image).success)
			return "آدرس تصویر وارد شده نامعتبر میباشد.";

		if (!z.string().min(1).safeParse(description).success)
			return "توضیحات وارد شده نامعتبر میباشد.";

		return true;
	};

	useEffect(() => {
		if ("data" in productDoe) {
			ctx.showAlert({
				status: "Success",
				text: "محصول با موفقیت اضافه شد.",
				onAccept() {
					location.reload();
				},
			});
		}
	}, [productDoe]);

	return (
		<div className="w-full flex flex-col items-center p-5 gap-5">
			<p
				className="w-full font-medium text-lg border-b-2 border-gray-300 p-2"
				dir="rtl"
			>
				اطلاعات محصول جدید
			</p>
			<div className="w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				<InputField
					name="آدرس عکس محصول"
					setText={setImage}
					className="col-span-1 md:col-span-2"
				/>

				<ComboBox
					name="دسته بندی محصول"
					selected={category}
					options={[
						"Books",
						"HomeAppliances",
						"HealthAndBeauty",
						"Cars",
						"Fashion",
						"Digital",
					]}
					placeholder="انتخاب کنید"
					setSelected={setCategory}
				/>

				<InputField name="نام محصول" setText={setName} />

				<Textarea
					title="توضیحات محصول"
					setText={setDescription}
					className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4"
				/>
			</div>

			<div className="w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{productDoe.loading ? (
					<Loading />
				) : (
					<>
						<Button
							text="ذخیره اطلاعات"
							onClick={() => {
								const validationResult = validateFields();
								if (validationResult === true) {
									addProduct({
										name,
										category,
										image,
										description,
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

						<Button
							text="انصراف"
							onClick={() => location.reload()}
							filled
							color="red"
						/>
					</>
				)}
			</div>
		</div>
	);
}
