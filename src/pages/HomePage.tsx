import Loading from "components/Loading";
import ProductItem from "components/ProductItem";
import { useGetApi } from "hooks/useApi";
import { ArrowLeft2 } from "iconsax-react";
import Product from "model/Product";
import { useEffect } from "react";
import Pagination from "model/Pagination";
import { Navigation, Pagination as SwiperPagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import MiniPoster1 from "../assets/images/MiniPoster1.png";
import MiniPoster2 from "../assets/images/MiniPoster2.png";
import MiniPoster3 from "../assets/images/MiniPoster3.png";
import MiniPoster4 from "../assets/images/MiniPoster4.png";
import Sale from "../assets/images/Sale.png";
import Poster from "model/Poster";

export default function HomePage() {
	const [postersDoe, getPosters] = useGetApi<Pagination<Poster>>(
		"https://localhost:5000/posters"
	);

	const [highDiscountsDoe, getHighDiscounts] = useGetApi<Pagination<Product>>(
		"https://localhost:5000/products"
	);

	const [bestSellerDoe, getBestSellers] = useGetApi<Pagination<Product>>(
		"https://localhost:5000/products"
	);

	const [mostViewedDoe, getMostViewed] = useGetApi<Pagination<Product>>(
		"https://localhost:5000/products"
	);

	useEffect(() => {
		getPosters({
			postersPerPage: 10,
			page: 1,
		});
		getBestSellers({
			productsPerPage: 8,
			page: 1,
		});
		getHighDiscounts({
			productsPerPage: 8,
			page: 1,
		});
		getMostViewed({
			productsPerPage: 8,
			page: 1,
		});
	}, []);

	return (
		<div className="flex flex-col gap-5 py-6">
			{postersDoe.loading === false && "data" in postersDoe && (
				<Swiper
					navigation
					modules={[Navigation, SwiperPagination]}
					pagination
					loop
					className="w-full"
				>
					{postersDoe.data.data.map((poster, _) => (
						<SwiperSlide key={_}>
							<img className="w-full" src={poster.imageUrl} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
			<div className="bg-sky-100 mx-10 grid grid-rows-[15%_auto] grid-cols-[80%_auto] rounded-2xl pb-5">
				<p className="col-span-2 text-2xl text-end font-bold p-4 text-blue">
					تخفیف ویژه
				</p>

				<div dir="rtl" className="h-full overflow-x-scroll pb-3">
					<div
						dir="ltr"
						className="h-full flex flex-row-reverse gap-5 w-max"
					>
						{highDiscountsDoe.loading ||
						!("data" in highDiscountsDoe) ? (
							<Loading size={20} />
						) : (
							highDiscountsDoe.data.data.map((p, _) => (
								<ProductItem key={_} product={p} />
							))
						)}
					</div>
				</div>

				<div className="flex flex-col gap-3 items-center justify-between py-5">
					<p className="mx-3 text-center px-2">
						خرید تمامی محصولات با
						<span className="text-red"> 20 </span>
						درصد تخفیف
					</p>
					<img className="w-4/5 aspect-square" src={Sale} />
					<a className="text-blue flex gap-2" href="#">
						<ArrowLeft2 />
						مشاهده همه
					</a>
				</div>
			</div>
			<div className="grid grid-cols-4 mx-10 gap-4">
				<img className="w-full cursor-pointer" src={MiniPoster4} />
				<img className="w-full cursor-pointer" src={MiniPoster3} />
				<img className="w-full cursor-pointer" src={MiniPoster2} />
				<img className="w-full cursor-pointer" src={MiniPoster1} />
			</div>
			{postersDoe.loading === false && "data" in postersDoe && (
				<div className="mx-10">
					<img
						className="rounded-2xl w-full"
						src={postersDoe.data.data[0].imageUrl}
					/>
				</div>
			)}

			<div className="bg-sky-100 mx-10 grid grid-rows-[15%_auto] rounded-2xl pb-2">
				<p className="text-2xl text-end font-bold p-4 text-blue">
					محصولات پرفروش
				</p>

				<div dir="rtl" className="h-full overflow-x-scroll pb-2 px-3">
					<div
						dir="ltr"
						className="h-full flex flex-row-reverse gap-5 w-max"
					>
						{bestSellerDoe.loading || !("data" in bestSellerDoe) ? (
							<Loading size={20} />
						) : (
							bestSellerDoe.data.data.map((p, _) => (
								<ProductItem key={_} product={p} />
							))
						)}
					</div>
				</div>
			</div>
			<div className="bg-gray-200 mx-10 rounded-2xl overflow-hidden grid grid-cols-4 grid-rows-2 gap-3 aspect-[3/1]">
				<div className="col-span-1 row-span-2 bg-orange rounded-2xl"></div>
				<div className="col-span-2 row-span-1 bg-purple rounded-2xl"></div>
				<div className="col-span-1 row-span-1 bg-black rounded-2xl"></div>
				<div className="col-span-1 row-span-1 bg-blue rounded-2xl"></div>
				<div className="col-span-2 row-span-1 bg-green rounded-2xl"></div>
			</div>
			<div className="bg-sky-100 mx-10 grid grid-rows-[15%_auto] rounded-2xl pb-2">
				<p className="text-2xl text-end font-bold p-4 text-blue">
					محصولات پربازدید
				</p>

				<div dir="rtl" className="h-full overflow-x-scroll pb-2 px-3">
					<div
						dir="ltr"
						className="h-full flex flex-row-reverse gap-5 w-max"
					>
						{mostViewedDoe.loading || !("data" in mostViewedDoe) ? (
							<Loading size={20} />
						) : (
							mostViewedDoe.data.data.map((p, _) => (
								<ProductItem key={_} product={p} />
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
