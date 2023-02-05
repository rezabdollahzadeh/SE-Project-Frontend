import Loading from "components/Loading";
import PageController from "components/PageController";
import SellerItem from "components/SellerItem";
import { useGetApi } from "hooks/useApi";
import Pagination from "model/Pagination";
import Seller from "model/Seller";
import { useEffect } from "react";

export default function SellersPage() {
	const [sellers, loadSellers] = useGetApi<Pagination<Seller>>(
		"https://localhost:5000/sellers"
	);

	const loadPage = (page: number = 1) => {
		loadSellers({
			SellersPerPage: 24,
			page,
		});
	};

	useEffect(() => {
		loadPage();
	}, []);

	if (sellers.loading) {
		return (
			<div className="w-full py-10">
				<Loading className="mx-auto" size={32} />
			</div>
		);
	}

	if ("error" in sellers) {
		return (
			<div className="w-full py-10">
				<p>خطایی رخ داده است</p>
			</div>
		);
	}

	if (sellers.data.data.length === 0) {
		return (
			<div className="w-full py-10">
				<p className="text-center mt-10 font-medium text-2xl">
					فروشنده ای یافت نشد
				</p>
			</div>
		);
	}

	return (
		<div className="py-5 h-full flex flex-col justify-between">
			<div
				className="grid gap-3 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 h-fit mb-5"
				dir="rtl"
			>
				{sellers.data.data.map((s, _) => (
					<SellerItem key={_} seller={s} />
				))}
			</div>

			<PageController
				pagination={sellers.data}
				setPage={(newPage) => {
					loadPage(newPage);
				}}
			/>
		</div>
	);
}
