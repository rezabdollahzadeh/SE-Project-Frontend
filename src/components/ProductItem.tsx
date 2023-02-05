import { useGetApi } from "hooks/useApi";
import { DataOrError } from "model/DataOrError";
import Pagination from "model/Pagination";
import Product from "model/Product";
import ProductPrice from "model/ProductPrice";
import { useEffect, useState } from "react";
import { getDiscountedPrice } from "utils";
import Loading from "./Loading";
import Tag from "./Tag";

interface PriceSectionProps {
	bestPrice: DataOrError<ProductPrice>;
}
function PriceSection({ bestPrice }: PriceSectionProps) {
	if (bestPrice.loading) {
		return <Loading />;
	}

	if ("error" in bestPrice) {
		return (
			<p
				className="text-red text-xl font-medium text-center pt-3"
				dir="rtl"
			>
				ناموجود
			</p>
		);
	}

	if (!getDiscountedPrice(bestPrice.data).hasDiscount) {
		return (
			<p className="text-blue text-lg text-center pt-3" dir="rtl">
				{bestPrice.data.price} تومان
			</p>
		);
	}

	return (
		<div className="flex justify-between items-center">
			<div>
				<p
					className="text-gray-400 text-sm line-through mr-2"
					dir="rtl"
				>
					{bestPrice.data.price}
				</p>
				<p className="text-blue text-lg" dir="rtl">
					{getDiscountedPrice(bestPrice.data).afterPrice} تومان
				</p>
			</div>

			<Tag
				className="justify-self-end"
				text={getDiscountedPrice(bestPrice.data).text}
				color="red"
			/>
		</div>
	);
}

interface Props {
	product: Product;
	className?: string;
}

export default function ProductItem({ product, className }: Props) {
	const [prices, loadPrices] = useGetApi<Pagination<ProductPrice>>(
		"https://localhost:5000/prices"
	);
	const [bestPrice, setBestPrice] = useState<DataOrError<ProductPrice>>({
		loading: true,
	});

	useEffect(() => {
		loadPrices({ productId: product.id });
	}, []);

	useEffect(() => {
		if (!prices.loading && "data" in prices) {
			if (prices.data.data.length === 0) {
				setBestPrice({ loading: false, error: new Error("No prices") });
				return;
			}

			let best = prices.data.data[0];

			prices.data.data.forEach((p) => {
				if (
					getDiscountedPrice(p).afterPrice <
					getDiscountedPrice(best).afterPrice
				) {
					best = p;
				}
			});

			setBestPrice({
				loading: false,
				data: best,
			});
		} else {
			setBestPrice({
				loading: false,
				error: new Error("No Sellers"),
			});
		}
	}, [prices]);

	return (
		<div
			className={`flex flex-col border-2 border-gray-300 rounded-md p-4 gap-y-3 bg-white cursor-pointer ${className}`}
			onClick={() => window.open(`/products/${product.id}`, "_blank")}
			dir="ltr"
		>
			<p
				className={`text-end font-bold text-red ${
					"data" in bestPrice &&
					getDiscountedPrice(bestPrice.data).hasDiscount
						? ""
						: "text-transparent"
				}`}
			>
				فروش ویژه
			</p>
			<img
				className="w-40 h-40 aspect-square m-5 self-center object-cover"
				src={product.image}
			/>
			<p className="text-right font-bold">{product.name}</p>

			{prices.loading ? (
				<Loading size={5} />
			) : (
				<PriceSection bestPrice={bestPrice} />
			)}
		</div>
	);
}
