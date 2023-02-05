import Button from "components/Button";
import CartStatusBar from "components/CartStatusBar";
import InputField from "components/InputField";
import Loading from "components/Loading";
import PageController from "components/PageController";
import { useGetApi, usePutApi } from "hooks/useApi";
import { MainContext } from "MainContext";
import Cart from "model/Cart";
import Pagination from "model/Pagination";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

interface RowItemProps {
	cart: Cart;
	reload: () => void;
}
function RowItem({ cart, reload }: RowItemProps) {
	const navigate = useNavigate();
	const ctx = useContext(MainContext);

	const [_, updateCart] = usePutApi(
		`https://localhost:5000/admin/carts/${cart.id}`,
		() => {
			reload();
		},
		() => {
			ctx.showAlert({
				status: "Error",
				text: "خطایی رخ داده است.",
			});
		}
	);

	return (
		<div className="w-full border-2 border-gray-200 bg-gray-100 rounded-lg p-5 grid grid-cols-3 gap-5">
			{/* <InputField name="وضعیت" placeholder={getStatus()} disabled /> */}
			<CartStatusBar status={cart.status} />

			<InputField
				name="تاریخ تغییر وضعیت"
				placeholder={cart.updateDate ? cart.updateDate : "-"}
				disabled
			/>

			<InputField
				name="قیمت نهایی"
				placeholder={`${cart.totalprice} تومان`}
				disabled
			/>

			<div className="flex flex-col items-end col-span-3">
				<p dir="rtl" className="font-semibold">
					توضیحات سفارش:
				</p>
				<textarea
					name="comment"
					rows={1}
					className="w-full duration-300 p-3 mt-1 resize-none border-gray-300 border-2 rounded-lg bg-white"
					dir="rtl"
					value={cart.description}
					disabled
				/>
			</div>

			<div className="flex flex-col items-end col-span-3">
				<p dir="rtl" className="font-semibold">
					محصولات:
				</p>
				{cart.products.map((pa, _) => (
					<p
						key={_}
						onClick={() => navigate(`/products/${pa.productId}`)}
						dir="rtl"
						className="p-2 bg-white border-2 border-gray-200 rounded-md cursor-pointer"
					>
						{pa.amount} تعداد از محصول {pa.productId}
					</p>
				))}
			</div>

			{cart.status === "Pending" && (
				<div className="col-span-3 gap-5 grid grid-cols-2">
					<p className="font-semibold col-span-2" dir="rtl">
						عملیات:
					</p>

					<Button
						filled
						color="green"
						text="تایید کردن"
						onClick={() => {
							ctx.showAlert({
								status: "Question",
								text: "آیا از این کار اطمینان دارید؟",
								onAccept() {
									updateCart(undefined, {
										status: "Accepted",
									});
								},
							});
						}}
					/>
					<Button
						filled
						color="red"
						text="رد کردن"
						onClick={() => {
							ctx.showAlert({
								status: "Question",
								text: "آیا از این کار اطمینان دارید؟",
								onAccept() {
									updateCart(undefined, {
										status: "Rejected",
									});
								},
							});
						}}
					/>
				</div>
			)}
		</div>
	);
}

export default function ManageCarts() {
	const ctx = useContext(MainContext);

	const [carts, getCarts] = useGetApi<Pagination<Cart>>(
		"https://localhost:5000/admin/carts"
	);

	const loadCarts = (page: number = 1) => {
		getCarts({
			page,
			cartsPerPage: 10,
		});
	};

	useEffect(() => loadCarts(), []);

	if (ctx.profile.loading || carts.loading)
		return (
			<div className="h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	if ("error" in ctx.profile || "error" in carts)
		return (
			<div className="h-full flex justify-center items-center">
				خطایی رخ داده است
			</div>
		);

	const reloadCarts = () => {
		getCarts({
			page: carts.data.page,
			cartsPerPage: 10,
		});
	};

	return (
		<div className="flex flex-col gap-3 p-3">
			{carts.data.data.map((c, _) => (
				<RowItem key={_} cart={c} reload={reloadCarts} />
			))}

			<PageController pagination={carts.data} setPage={loadCarts} />
		</div>
	);
}
