import Button from "components/Button";
import Loading from "components/Loading";
import {
	CloseCircle,
	DiscountShape,
	DollarSquare,
	Shop,
	ShoppingCart,
	TruckFast,
} from "iconsax-react";
import { MainContext } from "MainContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../assets/Logo";
import Stage1 from "./payment/Stage1";
import Stage2 from "./payment/Stage2";
import Stage3 from "./payment/Stage3";

function NumberCircle({ num }: { num: number }) {
	return (
		<div className="border-[1.5px] border-black rounded-full h-8 w-8 flex items-center justify-center">
			{num}
		</div>
	);
}

export default function PaymentPage() {
	const ctx = useContext(MainContext);
	const [status, setStatus] = useState(1); // 1 2 3
	const navigate = useNavigate();

	useEffect(() => {
		ctx.syncProfile();
	}, []);

	if (ctx.profile.loading || ctx.currentCart.loading)
		return (
			<div className="h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	if ("error" in ctx.profile || "error" in ctx.currentCart)
		return (
			<div className="h-full flex justify-center items-center">
				خطایی رخ داده است
			</div>
		);

	if (ctx.profile.data.accessLevel !== "customer")
		return (
			<div className="h-full flex justify-center items-center">
				یک مشتری امکان مشاهده قیمت را دارد
			</div>
		);

	const totalPrice = ctx.currentCart.data.totalprice;

	// const [cartDoe, getCart] = useGetApi<Cart>(
	// 	"https://localhost:5000/profile/carts/current"
	// );

	console.log(ctx.currentCart.data);

	return (
		<div className="w-full h-screen">
			<div className="bg-gradient-to-b from-blue to-white h-1/4 flex flex-col items-center gap-4">
				<Logo className="mt-7" />
				<div className="w-full flex justify-around font-semibold">
					<div className="flex gap-2 items-center">
						اتمام فرایند خرید <NumberCircle num={3} />
					</div>
					<div className="flex gap-2 items-center">
						بازبینی و پرداخت
						<NumberCircle num={2} />
					</div>
					<div className="flex gap-2 items-center">
						انتخاب آدرس و شیوه ارسال <NumberCircle num={1} />
					</div>
				</div>
				<div className="w-full h-1 bg-gray-200 flex items-center flex-row-reverse">
					<hr
						className={`h-1 bg-green ${
							status == 3
								? "w-full"
								: status == 2
								? "w-2/3"
								: "w-1/3"
						}`}
					/>
					<div className="bg-green h-5 w-5 border-white border-4 rounded-full" />
				</div>
			</div>
			<div className="h-3/4 grid grid-cols-[25%_auto] gap-5 p-8">
				{status < 3 ? (
					<>
						<div className="flex flex-col gap-y-4 border-[1.5px] border-gray-300 rounded-3xl h-fit items-center p-4">
							<div className="w-full flex justify-between">
								<p>{ctx.currentCart.data.products.length}</p>
								<p className="font-bold flex gap-2" dir="rtl">
									<Shop variant="Bold" color="#2388FF" />
									تعداد کالا :
								</p>
							</div>
							<hr className="bg-gray-300 h-[1.5px] w-full" />
							<div className="w-full flex justify-between">
								<p dir="rtl">{totalPrice} تومان</p>
								<p className="font-bold flex gap-2" dir="rtl">
									<DollarSquare
										variant="Bold"
										color="#FF9A23"
									/>
									جمع مبلغ کالاها :
								</p>
							</div>
							<hr className="bg-gray-300 h-[1.5px] w-full" />
							<div className="w-full flex justify-between">
								<p dir="rtl">0</p>
								<p className="font-bold flex gap-2" dir="rtl">
									<DiscountShape color="#FF9A23" /> تخفیف :
								</p>
							</div>
							<hr className="bg-gray-300 h-[1.5px] w-full" />
							<div className="w-full flex justify-between">
								<p dir="rtl">0 تومان</p>
								<p className="font-bold flex gap-2" dir="rtl">
									<TruckFast variant="Bold" color="#06C574" />
									هزینه ارسال سفارش :
								</p>
							</div>
							<hr className="bg-gray-300 h-[1.5px] w-full" />
							<div className="w-full flex justify-between">
								<p dir="rtl">
									{ctx.currentCart.data.totalprice} تومان
								</p>
								<p className="font-bold" dir="rtl">
									جمع سبد خرید :
								</p>
							</div>
							<Button
								filled
								icon={<ShoppingCart variant="Bold" />}
								text="تکمیل فرایند خرید"
								onClick={() =>
									setStatus((prev) => Math.min(3, prev + 1))
								}
								className="w-full gap-2"
							/>
						</div>
						<div className="max-h-full flex flex-col gap-5">
							{status === 1 && <Stage1 />}
							{status === 2 && <Stage2 />}
						</div>
					</>
				) : (
					<Stage3 />
				)}
			</div>
		</div>
	);
}
