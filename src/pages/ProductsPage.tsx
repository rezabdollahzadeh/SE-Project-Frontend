import Button from "components/Button";
import CheckBox from "components/CheckBox";
import CollapsiblePanel from "components/CollapsiblePanel";
import InputField from "components/InputField";
import Loading from "components/Loading";
import PageController from "components/PageController";
import ProductItem from "components/ProductItem";
import RadioSection from "components/RadioSection";
import { useGetApi } from "hooks/useApi";
import { Filter } from "iconsax-react";
import Pagination from "model/Pagination";
import Product, { Categories } from "model/Product";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {
	const [products, loadProducts] = useGetApi<Pagination<Product>>(
		"https://localhost:5000/products"
	);

	// ============== Search Params ===============

	const [searchParams, setSearchParams] = useSearchParams();
	const [initialCategory, setInitialCategory] = useState(-1);

	// ============== Filter Details ==============

	const [selectedCategory, setSelectedCategory] = useState<
		Categories | undefined
	>(undefined);
	const [onlyAvailable, setOnlyAvailable] = useState(false);
	const [priceFrom, setPriceFrom] = useState<number | undefined>(undefined);
	const [priceTo, setPriceTo] = useState<number | undefined>(undefined);

	const loadPage = (page: number = 1) => {
		loadProducts({
			productsPerPage: 24,
			page,
			category: selectedCategory,
			available: onlyAvailable,
			priceFrom,
			priceTo,
		});
	};

	useEffect(() => {
		if (searchParams.has("category")) {
			const defaultCategory = searchParams.get("category")! as Categories;

			setSelectedCategory(defaultCategory);
			switch (defaultCategory) {
				case "Digital":
					setInitialCategory(1);
					break;
				case "Fashion":
					setInitialCategory(2);
					break;
				case "Cars":
					setInitialCategory(3);
					break;
				case "HealthAndBeauty":
					setInitialCategory(4);
					break;
				case "HomeAppliances":
					setInitialCategory(5);
					break;
				case "Books":
					setInitialCategory(6);
					break;
			}
		} else {
			setInitialCategory(0);
		}
	}, []);

	useEffect(() => {
		loadPage();
	}, [initialCategory]);

	// ============================================

	return (
		<div className="grid grid-cols-[75%_auto] py-5">
			{!products.loading && "data" in products ? (
				products.data.data.length === 0 ? (
					<p className="text-center mt-10 font-medium text-2xl">
						کالایی یافت نشد
					</p>
				) : (
					<div className="h-full flex flex-col justify-between">
						<div
							className="grid gap-3 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-fit mb-5"
							dir="rtl"
						>
							{products.data?.data.map((p, _) => (
								<ProductItem key={_} product={p} />
							))}
						</div>

						<PageController
							pagination={products.data}
							setPage={(newPage) => {
								loadPage(newPage);
							}}
						/>
					</div>
				)
			) : (
				<div className="w-full py-10">
					<Loading className="mx-auto" size={32} />
				</div>
			)}

			<div>
				<div className="sticky top-4">
					{initialCategory !== -1 && (
						<CollapsiblePanel text="دسته بندی محصول">
							<RadioSection
								name="ProductsCategory"
								options={[
									{
										label: "همه دسته بندی ها",
										value: undefined,
									},
									{
										label: "کالای دیجیتال",
										value: "Digital",
									},
									{
										label: "مد و پوشاک",
										value: "Fashion",
									},
									{ label: "خودرو", value: "Cars" },
									{
										label: "زیبایی و سلامت",
										value: "HealthAndBeauty",
									},
									{
										label: "لوازم خانگی",
										value: "HomeAppliances",
									},
									{ label: "کتاب", value: "Books" },
								]}
								initial={initialCategory}
								onSelect={(val) => {
									if (val) {
										setSearchParams({ category: val });
									} else {
										searchParams.delete("category");
										setSearchParams(searchParams);
									}
									setSelectedCategory(val as Categories);
								}}
							/>
						</CollapsiblePanel>
					)}

					<CollapsiblePanel text="بازه قیمت محصول">
						<div
							className="w-full flex items-center justify-center gap-3"
							dir="rtl"
						>
							<p>شروع قیمت از:</p>
							<InputField
								rtl
								placeholder="100000 تومان"
								setText={(val) => {
									if (val) setPriceFrom(parseInt(val));
									else setPriceFrom(undefined);
								}}
							/>
						</div>
						<div
							className="w-full flex items-center justify-center gap-3"
							dir="rtl"
						>
							<p>حداکثر قیمت تا:</p>
							<InputField
								rtl
								placeholder="100000 تومان"
								setText={(val) => {
									if (val) setPriceTo(parseInt(val));
									else setPriceTo(undefined);
								}}
							/>
						</div>
					</CollapsiblePanel>

					<div className="w-full py-5 px-4 border-2 rounded-lg flex justify-center duration-300 border-black hover:border-blue/80">
						<CheckBox
							text="فقط کالا های موجود"
							onClick={(newVal) => setOnlyAvailable(newVal)}
						/>
					</div>

					<Button
						text="فیلتر کن"
						onClick={() => {
							loadPage();
							window.scrollTo(0, 240);
						}}
						icon={<Filter variant="Bold" />}
						filled
						className="w-full mt-4"
					/>
				</div>
			</div>
		</div>
	);
}
