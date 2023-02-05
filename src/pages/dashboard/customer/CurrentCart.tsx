import Button from "components/Button";
import Loading from "components/Loading";
import Tag from "components/Tag";
import Textarea from "components/Textarea";
import { useGetApi, usePutApi } from "hooks/useApi";
import { AddCircle, MinusCirlce } from "iconsax-react";
import { MainContext } from "MainContext";
import { ProductAmounts } from "model/Cart";
import Product from "model/Product";
import ProductPrice from "model/ProductPrice";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DiscountedPrice, getDiscountedPrice } from "utils";

interface PriceViewProps {
	productPrice: ProductPrice;
}
function PriceView({ productPrice }: PriceViewProps) {
	const discounted = getDiscountedPrice(productPrice);

	if (discounted.hasDiscount) {
		return (
			<div className="flex flex-col gap-1">
				<p
					className="text-sm line-through"
					dir="rtl"
				>{`${discounted.beforePrice} تومان`}</p>
				<div
					className="font-medium flex gap-2 items-center justify-center"
					dir="rtl"
				>
					{`${discounted.afterPrice} تومان`}
					<Tag text={discounted.text} color="red" />{" "}
				</div>
			</div>
		);
	}

	return (
		<p
			className="font-medium"
			dir="rtl"
		>{`${discounted.afterPrice} تومان`}</p>
	);
}

interface ProductViewProps {
	product: Product;
}
function ProductView({ product }: ProductViewProps) {
	const navigate = useNavigate();

	return (
		<div
			className="w-full grid grid-cols-[70%_auto] gap-3 justify-center items-center border-2 bg-gray-100 p-2 border-gray-200 rounded-lg cursor-pointer"
			onClick={() => navigate(`/products/${product.id}`)}
		>
			<p className="text-right font-medium text-ellipsis break-all">
				{product.name}
			</p>
			<img
				className="w-full h-auto aspect-square rounded-md object-cover border-2 border-gray-300"
				src={product.image}
			/>
		</div>
	);
}

interface RowItemProps {
	productAmounts: ProductAmounts;
	addSum: (val: number) => void;
}
function RowItem({ productAmounts, addSum }: RowItemProps) {
	const ctx = useContext(MainContext);

	const [discounted, setDiscounted] = useState<DiscountedPrice>();

	const [productPrice, getProductPrice] = useGetApi<ProductPrice>(
		`https://localhost:5000/prices/${productAmounts.productId}`,
		(res) => {
			const d = getDiscountedPrice(res);
			setDiscounted(d);
			addSum(d.afterPrice * productAmounts.amount);
		}
	);

	const [_, addToCart] = usePutApi(
		"https://localhost:5000/profile/carts/current",
		() => ctx.syncCart()
	);

	const [product, getProduct] = useGetApi<Product>(
		`https://localhost:5000/products/${
			"data" in productPrice ? productPrice.data.productId : ""
		}`
	);

	useEffect(() => getProductPrice(), []);
	useEffect(() => {
		if ("data" in productPrice) getProduct();
	}, [productPrice]);

	if (productPrice.loading || discounted === undefined) return <Loading />;

	if ("error" in productPrice)
		return (
			<p
				className="w-full p-10 text-center text-xl font-medium"
				dir="rtl"
			>
				خطایی رخ داده است.
			</p>
		);

	return (
		<div className="w-full grid grid-cols-[17%_17%_20%_40%] p-3 gap-3 border-b-2 border-gray-200 items-center justify-center text-center">
			<p className="font-medium" dir="rtl">
				{discounted.afterPrice * productAmounts.amount} تومان
			</p>

			{productPrice.loading ? (
				<Loading />
			) : "error" in productPrice ? (
				<p>خطا</p>
			) : (
				<PriceView productPrice={productPrice.data} />
			)}

			<div className="w-full flex items-center justify-center gap-3">
				<Button
					text=""
					onClick={() => {
						if (productAmounts.amount === 1) {
							ctx.showAlert({
								status: "Question",
								text: "آیا از حذف کالای مورد نظر از سبد خرید خود اطمینان دارید؟",
								onAccept() {
									addToCart({
										productId: productPrice.data.id,
										amount: -1,
									});
								},
							});
						} else {
							addToCart({
								productId: productPrice.data.id,
								amount: -1,
							});
						}
					}}
					filled
					color="red"
					icon={<MinusCirlce variant="Bold" size={20} />}
					className="py-2 px-2"
				/>

				<p className="h-full px-4 text-center text-lg font-medium border-b-2 border-gray-300">
					{productAmounts.amount}
				</p>

				<Button
					text=""
					onClick={() => {
						addToCart({
							productId: productPrice.data.id,
							amount: 1,
						});
					}}
					disabled={productPrice.data.amount <= productAmounts.amount}
					filled
					color="green"
					icon={<AddCircle variant="Bold" size={20} />}
					className="py-2 px-2"
				/>
			</div>

			{product.loading ? (
				<Loading />
			) : "error" in product ? (
				<p>خطا</p>
			) : (
				<ProductView product={product.data} />
			)}
		</div>
	);
}

export default function CurrentCart() {
	const ctx = useContext(MainContext);

	if (ctx.profile.loading || ctx.currentCart.loading) return <Loading />;
	if ("error" in ctx.profile || "error" in ctx.currentCart)
		return (
			<p
				className="w-full p-10 text-center text-xl font-medium"
				dir="rtl"
			>
				خطایی رخ داده است.
			</p>
		);

	const navigate = useNavigate();
	const [sum, setSum] = useState(0);
	const [prices, setPrices] = useState(
		Array(ctx.currentCart.data.products.length).fill(0)
	);

	const updateSum = (nums: number[]) => {
		let s = 0;
		nums.forEach((p) => (s += p));
		setSum(s);
	};

	return (
		<div className="w-full h-full flex flex-col justify-between gap-3">
			<div className="grid grid-cols-[17%_17%_20%_40%] gap-3 bg-gray-200 border-b-2 border-gray-300 p-3 text-center">
				<p>قیمت کل</p>
				<p>قیمت پایه</p>
				<p>تعداد</p>
				<p>محصول</p>
			</div>

			{ctx.currentCart.data.products.length === 0 ? (
				<p
					className="w-full p-10 text-center text-xl font-medium"
					dir="rtl"
				>
					محصولی یافت نشد.
				</p>
			) : (
				<div className="h-full">
					{ctx.currentCart.data.products.map((pa, i) => (
						<RowItem
							key={i}
							productAmounts={pa}
							addSum={(val) => {
								setPrices((prev) => {
									const ans = [...prev];
									ans[i] = val;
									updateSum(ans);
									return ans;
								});
							}}
						/>
					))}
				</div>
			)}

			<div className="flex items-center justify-between gap-5 p-5 border-t-2 bg-gray-100 border-gray-200">
				<Button
					text="ثبت سفارش و ادامه"
					color="green"
					filled
					onClick={() => navigate("/payment")}
				/>

				<div>
					<p className="text-center font-medium" dir="rtl">
						قیمت کل:
					</p>
					<p className="text-center text-lg font-medium" dir="rtl">
						{sum} تومان
					</p>
				</div>

				<Textarea title="توضیحات اضافی" className="w-1/2" rows={2} />
			</div>
		</div>
	);
}
