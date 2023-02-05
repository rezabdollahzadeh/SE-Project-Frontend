import InputField from "components/InputField";
import Loading from "components/Loading";
import PageController from "components/PageController";
import PriceItem from "components/PriceItem";
import Textarea from "components/Textarea";
import { useGetApi, usePutApi } from "hooks/useApi";
import {
	Box,
	CloseCircle,
	Dislike,
	InfoCircle,
	Information,
	Like1,
	Profile,
	TickCircle,
} from "iconsax-react";
import { MainContext } from "MainContext";
import Pagination from "model/Pagination";
import ProductPrice from "model/ProductPrice";
import Seller from "model/Seller";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router";

export default function SellerPage() {
	const location = useLocation();
	const sellerId = location.pathname.split("/")[2];
	const ctx = useContext(MainContext);

	const [sellerDoe, getSeller] = useGetApi<Seller>(
		`https://localhost:5000/sellers/${sellerId}`
	);

	const [prices, loadPrices] = useGetApi<Pagination<ProductPrice>>(
		"https://localhost:5000/prices"
	);

	useEffect(() => {
		loadPrices({
			sellerId: sellerId,
		});
	}, []);

	const [_, putLikes] = usePutApi(
		`https://localhost:5000/sellers/${sellerId}/likes`,
		() => getSeller()
	);

	const LikeSeller = (like: boolean) => {
		if (!ctx.loggedIn) {
			ctx.showAlert({
				status: "Error",
				text: "برای ثبت نظر ابتدا وارد حساب کاربری خود شوید.",
			});
			return;
		}

		putLikes(undefined, {
			like: like,
		});
	};

	useEffect(() => {
		getSeller();
	}, []);

	if (sellerDoe.loading) {
		return <Loading size={32} className="my-12" />;
	}

	if ("error" in sellerDoe) {
		return <Loading size={32} />;
	}

	return (
		<div className="w-full flex flex-col items-center pt-3">
			<div
				className="w-full flex sticky top-0 border-b-2 border-gray-300 bg-white"
				dir="rtl"
			>
				<a
					className="flex gap-2 border-2 border-b-0 border-gray-300 px-8 py-3 w-fit font-medium"
					href="#sellerInfo"
				>
					مشخصات فروشنده
					<Profile variant="Bold" />
				</a>

				<a
					className="flex gap-2 border-2 border-b-0 border-gray-300 px-8 py-3 w-fit font-medium"
					href="#shopInfo"
				>
					اطلاعات فروشگاه
					<InfoCircle variant="Bold" />
				</a>

				<a
					className="flex gap-2 border-2 border-b-0 border-gray-300 px-8 py-3 w-fit font-medium"
					href="#products"
				>
					محصولات فروشنده
					<Box variant="Bold" />
				</a>
			</div>

			<div
				className="w-full flex flex-col gap-3 items-center py-5"
				id="sellerInfo"
			>
				{sellerDoe.data.image ? (
					<img
						className="w-40 h-40 aspect-square self-center object-cover rounded-lg"
						src={sellerDoe.data.image}
					/>
				) : (
					<Profile
						className="w-40 h-40 p-4 aspect-square self-center border-2 border-gray-300 rounded-full"
						variant="Bulk"
						color="black"
					/>
				)}

				<p dir="rtl" className="text-lg italic">
					نام فروشنده:
				</p>
				<p
					dir="rtl"
					className="text-xl font-semibold flex gap-2 items-center"
				>
					{sellerDoe.data.name}
					<span className="w-fit inline-block rounded-full border border-gray-300">
						{sellerDoe.data.restricted ? (
							<>
								<p className="text-sm italic font-normal inline mr-2">
									غیرفعال
								</p>
								<CloseCircle
									className="inline m-1"
									variant="Bold"
									color="#ef3b50"
								/>
							</>
						) : (
							<>
								<p className="text-sm italic font-normal inline mr-2">
									فعال
								</p>
								<TickCircle
									className="inline m-1"
									variant="Bold"
									color="#06c574"
								/>
							</>
						)}
					</span>
				</p>

				<div className="flex gap-x-2 items-center text-center">
					<div
						className="bg-green/20 rounded-md p-1 flex gap-2 cursor-pointer box-border border-2 border-transparent duration-300 hover:border-green"
						onClick={() => LikeSeller(true)}
					>
						<p>{sellerDoe.data.likes}</p>
						<Like1 variant="Bold" color="#06c574" />
					</div>
					<div
						className="bg-red/20 rounded-md p-1 flex gap-2 cursor-pointer box-border border-2 border-transparent duration-300 hover:border-red"
						onClick={() => LikeSeller(false)}
					>
						<Dislike variant="Bold" color="#ef3b50" />
						<p>{sellerDoe.data.dislikes}</p>
					</div>
				</div>
			</div>

			<hr className="w-full h-0.5 bg-gray-200" />

			<div className="w-full p-5" id="shopInfo" dir="rtl">
				<p className="font-medium text-lg border-b-4 border-orange py-2 w-48">
					اطلاعات فروشگاه
				</p>
			</div>

			<div className="w-full px-10" dir="rtl">
				<p className="text-md font-medium w-40 pb-2 border-b-2 border-gray-300">
					آدرس فروشگاه
				</p>
				<p className="p-4">{sellerDoe.data.address}</p>
				<p className="text-md font-medium w-40 pb-2 border-b-2 border-gray-300">
					توضیحات فروشگاه
				</p>
				<p className="p-4">{sellerDoe.data.information}</p>
			</div>

			<hr className="w-full h-0.5 bg-gray-200" />

			<div className="w-full p-5" id="products" dir="rtl">
				<p className="font-medium text-lg border-b-4 border-orange py-2 w-48">
					محصولات فروشنده
				</p>
			</div>

			<div className="w-full">
				{!prices.loading && "data" in prices ? (
					prices.data.data.length === 0 ? (
						<p className="text-center p-10 font-medium text-2xl">
							محصولی یافت نشد
						</p>
					) : (
						<div
							className="flex-col justify-between grid gap-3 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-fit mb-5"
							dir="rtl"
						>
							{prices.data.data.map((p, _) => (
								<PriceItem key={_} price={p} />
							))}
						</div>
					)
				) : (
					<div className="w-full py-10">
						<Loading className="mx-auto" size={32} />
					</div>
				)}
			</div>
		</div>
	);
}
