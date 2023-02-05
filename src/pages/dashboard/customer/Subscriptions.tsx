import Loading from "components/Loading";
import PageController from "components/PageController";
import ProductItem from "components/ProductItem";
import { useGetApi } from "hooks/useApi";
import { MainContext } from "MainContext";
import Pagination from "model/Pagination";
import Product from "model/Product";
import { useContext, useEffect } from "react";

export default function Subscriptions() {
	const ctx = useContext(MainContext);
	const [subscriptionsDoe, getSubscriptions] = useGetApi<Pagination<Product>>(
		"https://localhost:5000/profile/subscription"
	);

	const loadPage = (page: number = 1) => {
		getSubscriptions({
			page,
			productsPerPage: 12,
		});
	};

	useEffect(() => {
		loadPage();
	}, []);

	if (ctx.profile.loading || subscriptionsDoe.loading)
		return (
			<div className="w-full h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	if ("error" in ctx.profile || "error" in subscriptionsDoe)
		return (
			<div className="w-full h-full flex justify-center items-center">
				خطایی رخ داده است
			</div>
		);

	return (
		<div className="w-full h-full flex justify-center items-center p-5">
			{subscriptionsDoe.data.data.length === 0 ? (
				<p className="text-center mt-10 font-medium text-2xl">
					کالایی یافت نشد
				</p>
			) : (
				<div className="h-full flex flex-col justify-between">
					<div
						className="grid gap-3 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-fit mb-5"
						dir="rtl"
					>
						{subscriptionsDoe.data.data.map((p, _) => (
							<ProductItem key={_} product={p} />
						))}
					</div>

					<PageController
						pagination={subscriptionsDoe.data}
						setPage={(newPage) => {
							loadPage(newPage);
						}}
					/>
				</div>
			)}
		</div>
	);
}
