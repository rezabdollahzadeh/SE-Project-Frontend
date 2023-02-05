import { useGetApi } from "hooks/useApi";
import {
	CloseCircle,
	DollarSquare,
	ShoppingCart,
	TickCircle,
} from "iconsax-react";
import Product from "model/Product";
import ProductPrice from "model/ProductPrice";
import { useEffect } from "react";
import { getDiscountedPrice } from "utils";
import Button from "./Button";
import Loading from "./Loading";
import Tag from "./Tag";

interface Props {
	price: ProductPrice;
}
export default function PriceItem({ price }: Props) {
	const [productDoe, getProduct] = useGetApi<Product>(
		`https://localhost:5000/products/${price.productId}`
	);

	useEffect(getProduct, []);

	if (productDoe.loading) return <Loading />;

	if ("error" in productDoe) {
		return (
			<div className="h-full w-full border-2 border-gray-300 flex justify-center rounded-lg p-5">
				<p>خطایی رخ داده است</p>
			</div>
		);
	}

	return (
		<div
			dir="rtl"
			className="w-full flex flex-col gap-2 p-3 rounded-lg border-2 border-gray-300"
			onClick={() =>
				window.open(`/products/${price.productId}`, "_blank")
			}
		>
			<img
				className="w-40 h-40 aspect-square m-5 self-center object-cover"
				src={productDoe.data.image}
			/>
			<p className="text-center font-semibold italic">
				{productDoe.data.name}
			</p>
			<hr className="w-full bg-gray-300" />
			<p className="flex gap-2">
				{price.amount > 0 ? (
					<>
						<TickCircle color="#06C574" variant="Bold" />
						موجود در انبار (آماده ارسال)
					</>
				) : (
					<>
						<CloseCircle color="#EF3B50" variant="Bold" />
						ناموجود
					</>
				)}
			</p>
			<hr className="w-full bg-gray-300" />
			<div className="flex flex-col gap-1 justify-between">
				<p className="font-bold flex gap-2">
					<DollarSquare color="#FF9A23" variant="Bold" />
					قیمت فروشنده:
				</p>
				<div className="flex gap-2 justify-end">
					{<Tag text={getDiscountedPrice(price).text} color="red" />}
					<p>{getDiscountedPrice(price).afterPrice} تومان</p>
				</div>
			</div>
			<Button
				text="مشاهده محصول"
				onClick={() => {}}
				filled
				icon={<ShoppingCart variant="Bold" />}
				className="w-full flex-row-reverse gap-3"
			/>
		</div>
	);
}
