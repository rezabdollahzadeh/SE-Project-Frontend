import { useGetApi } from "hooks/useApi";
import { CloseCircle, Profile, Star1, TickCircle } from "iconsax-react";
import Pagination from "model/Pagination";
import ProductPrice from "model/ProductPrice";
import Seller from "model/Seller";
import { useEffect } from "react";
import Loading from "./Loading";

function SellerScore({ seller }: { seller: Seller }) {
	console.log(seller.likes, seller.dislikes);

	if (
		seller.likes === undefined ||
		seller.dislikes === undefined ||
		(seller.likes === 0 && seller.dislikes === 0)
	)
		return <p className="text-sm italic">امتیازی ثبت نشده است</p>;

	var stars = Math.round(
		(5 * seller.likes) / (seller.likes + seller.dislikes)
	);
	stars = Math.min(stars, 5);
	stars = Math.max(stars, 0);

	return (
		<div className="w-full flex gap-1 flex-row-reverse">
			{Array(stars)
				.fill(1)
				.map((_, i) => (
					<Star1 key={i} variant="Bold" color="#ffd000" />
				))}
			{Array(5 - stars)
				.fill(1)
				.map((_, i) => (
					<Star1 key={i} />
				))}
		</div>
	);
}

interface Props {
	seller: Seller;
	className?: string;
}
export default function SellerItem({ seller, className }: Props) {
	const [prices, loadPrices] = useGetApi<Pagination<ProductPrice>>(
		"https://localhost:5000/prices"
	);

	useEffect(() => {
		loadPrices({
			sellerId: seller.id,
		});
	}, []);

	return (
		<div
			className={`flex flex-col border-2 border-gray-300 rounded-md bg-white cursor-pointer ${className}`}
			onClick={() => window.open(`/sellers/${seller.id}`, "_blank")}
			dir="rtl"
		>
			<div className="flex gap-1 p-2">
				<p className="font-semibold">فروش ویژه: </p>
				{seller.restricted ? (
					<>
						غیرفعال
						<CloseCircle variant="Bold" color="#ef3b50" />
					</>
				) : (
					<>
						فعال
						<TickCircle variant="Bold" color="#06c574" />
					</>
				)}
			</div>
			{seller.image ? (
				<img
					className="w-40 h-40 aspect-square m-5 self-center object-cover rounded-lg"
					src={seller.image}
				/>
			) : (
				<Profile
					className="w-40 h-40 p-4 aspect-square m-5 self-center border-2 border-orange rounded-full"
					variant="Bulk"
					color="#ff9a23"
				/>
			)}

			<div className="flex items-center gap-2 mx-2 py-2 border-t-2 border-gray-300 text-ellipsis whitespace-nowrap overflow-hidden">
				<p className="font-semibold">نام فروشنده:</p>
				<p>{seller.name}</p>
			</div>

			<div className="flex items-center gap-2 mx-2 py-2 border-t-2 border-gray-300 text-ellipsis whitespace-nowrap overflow-hidden">
				<p className="font-semibold">تعداد فروش :</p>
				{prices.loading ? (
					<Loading size={4} />
				) : "error" in prices ? (
					<p className="text-sm italic">اروری رخ داده است</p>
				) : (
					<p>{prices.data.data.length}</p>
				)}
			</div>

			<div className="flex items-center gap-2 mx-2 py-2 border-t-2 border-gray-300 text-ellipsis whitespace-nowrap overflow-hidden">
				<p className="font-semibold">امتیاز: </p>
				<SellerScore seller={seller} />
			</div>
		</div>
	);
}
