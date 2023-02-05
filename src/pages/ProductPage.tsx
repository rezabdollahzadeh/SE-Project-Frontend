import Button from "components/Button";
import CommentItem from "components/CommentItem";
import Loading from "components/Loading";
import ProductItem from "components/ProductItem";
import Tag from "components/Tag";
import Textarea from "components/Textarea";
import { useDeleteApi, useGetApi, usePostApi, usePutApi } from "hooks/useApi";
import {
	AddCircle,
	ArrowLeft2,
	Book,
	Book1,
	CloseCircle,
	Copy,
	Dislike,
	DollarSquare,
	Like1,
	MinusCirlce,
	Save2,
	Shop,
	ShoppingCart,
	TickCircle,
} from "iconsax-react";
import { MainContext } from "MainContext";
import Comment from "model/Comment";
import { DataOrError } from "model/DataOrError";
import Pagination from "model/Pagination";
import Product from "model/Product";
import ProductPrice from "model/ProductPrice";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getDiscountedPrice } from "utils";

interface ButtonsProps {
	selectedPrice: ProductPrice;
}
function Buttons({ selectedPrice }: ButtonsProps) {
	const ctx = useContext(MainContext);

	const [_, addToCart] = usePutApi(
		"https://localhost:5000/profile/carts/current",
		() => {
			ctx.syncCart();
		}
	);

	const [amount, setAmount] = useState<number | undefined>(undefined);

	const getAmountInCart = () => {
		if (!("data" in ctx.profile)) {
			// console.log(getAmountInCart(ctx.currentCart.data));
			setAmount(undefined);
			return;
		}

		if (!("data" in ctx.currentCart)) {
			setAmount(0);
			return;
		}

		console.log("price", selectedPrice);
		console.log("cart", ctx.currentCart.data);

		const product = ctx.currentCart.data.products.filter(
			(p) => p.productId === selectedPrice.id
		)[0];

		if (product === undefined) {
			setAmount(0);
		} else {
			setAmount(product.amount);
		}
	};

	useEffect(() => {
		ctx.syncProfile();
	}, []);

	useEffect(() => {
		getAmountInCart();
	}, [ctx.currentCart]);

	useEffect(() => {
		console.log("Amount", amount);
	}, [amount]);

	if (selectedPrice.amount === 0) {
		<Button
			text="ناموجود"
			onClick={() => {}}
			color="blue"
			disabled
			icon={<ShoppingCart variant="Bold" />}
			className="w-full flex-row-reverse gap-3"
		/>;
	}

	if (amount === undefined)
		return (
			<Button
				text="افزودن به سبد خرید"
				onClick={() => {
					ctx.showAlert({
						status: "Warning",
						text: "برای افزودن محصول باید به عنوان مشتری وارد بشوید.",
					});
				}}
				filled
				color="blue"
				icon={<ShoppingCart variant="Bold" />}
				className="w-full flex-row-reverse gap-3"
			/>
		);

	if (amount === 0)
		return (
			<Button
				text="افزودن به سبد خرید"
				onClick={() => {
					addToCart({
						productId: selectedPrice.id,
						amount: 1,
					});
				}}
				filled
				color="blue"
				icon={<ShoppingCart variant="Bold" />}
				className="w-full flex-row-reverse gap-3"
			/>
		);

	return (
		<div className="w-full flex items-center gap-3">
			<Button
				text=""
				onClick={() => {
					addToCart({
						productId: selectedPrice.id,
						amount: -1,
					});
				}}
				filled
				color="red"
				icon={<MinusCirlce variant="Bold" />}
				className="w-full h-fit"
			/>

			<p className="h-full px-4 text-center text-xl font-medium border-b-2 border-gray-300">
				{amount}
			</p>

			<Button
				text=""
				onClick={() => {
					addToCart({
						productId: selectedPrice.id,
						amount: 1,
					});
				}}
				disabled={selectedPrice.amount <= amount}
				filled
				color="green"
				icon={<AddCircle variant="Bold" />}
				className="w-full h-fit"
			/>
		</div>
	);
}

interface PriceSectionProps {
	selectedPrice: DataOrError<ProductPrice>;
}
function PriceSection({ selectedPrice }: PriceSectionProps) {
	if (selectedPrice.loading) {
		return <Loading size={8} />;
	}

	if ("error" in selectedPrice) {
		return <p className="text-center font-medium">قیمتی یافت نشد</p>;
	}

	return (
		<>
			{getDiscountedPrice(selectedPrice.data).hasDiscount && (
				<>
					<div
						className="flex gap-3 items-center justify-center"
						dir="ltr"
					>
						<Tag
							text={getDiscountedPrice(selectedPrice.data).text}
							color="red"
						/>
						<p
							className="text-center line-through text-xs flex"
							dir="rtl"
						>
							{selectedPrice.data.price} تومان
						</p>
					</div>

					<span />
				</>
			)}

			{!selectedPrice.loading && "data" in selectedPrice ? (
				<p className="text-center font-medium">
					{getDiscountedPrice(selectedPrice.data).afterPrice} تومان
				</p>
			) : (
				<Loading size={4} />
			)}
		</>
	);
}

interface SellerSelectProps {
	price: ProductPrice;
	selectPrice: (p: DataOrError<ProductPrice>) => void;
}
function SellerSelect({ price, selectPrice }: SellerSelectProps) {
	return (
		<div
			dir="rtl"
			className="w-full flex flex-col gap-2 p-3 rounded-lg bg-white"
		>
			<div className="flex gap-2">
				<Shop color="#2388FF" variant="Bold" />
				<p className="font-bold">فروشنده:</p>
				{price.seller.name}
			</div>
			<hr className="w-full bg-gray-200" />
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
				text="انتخاب فروشنده"
				onClick={() => {
					selectPrice({
						loading: false,
						data: price,
					});
				}}
				color="orange"
				icon={<ShoppingCart variant="Bold" />}
				className="w-full flex-row-reverse gap-3"
			/>
		</div>
	);
}

interface CommentSectionProps {
	productId: string;
	commentsDoe: DataOrError<Pagination<Comment>>;
	updateComments: () => void;
}
function CommentsSection({
	productId,
	commentsDoe,
	updateComments,
}: CommentSectionProps) {
	const ctx = useContext(MainContext);
	const [commentText, setCommentText] = useState("");

	const [_, sendComment] = usePostApi(
		"https://localhost:5000/comments",
		() => {
			setCommentText("");
			updateComments();
			ctx.showAlert({
				status: "Success",
				text: "دیدگاه شما با موفقیت ثبت شد",
			});
		}
	);

	if (commentsDoe.loading) {
		return <Loading />;
	}

	if ("error" in commentsDoe) {
		return <p>اروری رخ داده است</p>;
	}

	return (
		<div className="py-10" id="comments" dir="rtl">
			<p className="font-medium text-lg border-b-4 border-orange py-2 w-48 mb-10">
				دیدگاه مشتریان
			</p>

			<div className="px-16 flex flex-col">
				{commentsDoe.data.data.length === 0 ? (
					<p className="w-full text-center font-semibold text-xl">
						دیدگاهی برای این کالا ثبت نشده است.
					</p>
				) : (
					commentsDoe.data.data.map((cmt, _) => (
						<CommentItem key={_} comment={cmt} />
					))
				)}
			</div>
			{ctx.loggedIn && (
				<div className="grid grid-cols-[auto_75%] gap-x-8 px-16 pt-8">
					<div className="flex flex-col gap-3">
						<p className="font-semibold text-lg">ثبت دیدگاه</p>
						<p className="text-center">
							کاربر گرامی شما می توانید از این قسمت نظر خود را
							نسبت به ان محصول وارد نمایید
						</p>
					</div>
					<div className="flex flex-col items-end gap-3">
						<Textarea
							title=""
							rows={5}
							setText={setCommentText}
							className="w-full"
						/>

						<Button
							text="ثبت دیدگاه"
							filled
							onClick={() => {
								if (commentText === "") {
									ctx.showAlert({
										status: "Warning",
										text: "متن دیدگاه خالی است.",
									});
									return;
								}

								sendComment({
									productId,
									text: commentText,
								});
							}}
							className="px-10"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default function ProductPage() {
	const location = useLocation();
	const productId = location.pathname.split("/")[2];
	const ctx = useContext(MainContext);

	const [selectedPrice, setSelectedPrice] = useState<
		DataOrError<ProductPrice>
	>({
		loading: true,
	});

	const [productDoe, getProduct] = useGetApi<Product>(
		`https://localhost:5000/products/${productId}`,
		(res) => {
			getPrices({ productId: productId });
			getComments({ productId: productId });
			getSimilarProducts({
				page: 1,
				productsPerPage: 10,
				category: res.category,
			});
		}
	);

	const [likes, putLikes] = usePutApi(
		`https://localhost:5000/products/${productId}/likes`,
		() => getProduct()
	);

	const [subscription, getSubscription] = useGetApi<Product>(
		`https://localhost:5000/profile/subscription`
	);

	const [_2, subscribe] = usePostApi<any>(
		`https://localhost:5000/profile/subscribe`,
		() => getSubscription({ productId })
	);

	const [_1, unsubscribe] = useDeleteApi<any>(
		`https://localhost:5000/profile/subscribe`,
		() => getSubscription({ productId })
	);

	const [pricesDoe, getPrices] = useGetApi<Pagination<ProductPrice>>(
		"https://localhost:5000/prices",
		(res) => {
			if (res.data.length > 0)
				setSelectedPrice({
					loading: false,
					data: res.data[0],
				});
			else
				setSelectedPrice({
					loading: false,
					error: new Error("No Sellers"),
				});
		},
		() =>
			setSelectedPrice({
				loading: false,
				error: new Error("No Sellers"),
			})
	);

	const [commentsDoe, getComments] = useGetApi<Pagination<Comment>>(
		`https://localhost:5000/comments`
	);

	const [similarProductsDoe, getSimilarProducts] = useGetApi<
		Pagination<Product>
	>("https://localhost:5000/products");

	useEffect(() => {
		getProduct();
		getSubscription({
			productId,
		});
	}, []);

	if (productDoe.loading) {
		return <Loading size={32} className="my-12" />;
	}

	if ("error" in productDoe) {
		return <Loading size={32} />;
	}

	return (
		<div className="flex flex-col gap-5 items-center">
			<div className="grid grid-cols-[65%_auto] grid-rows-[2.5rem_auto] gap-3 w-full p-5">
				<p
					className="border-gray-300 border-b-2 font-bold text-lg"
					dir="rtl"
				>
					{productDoe.data.name}
				</p>
				<div className="col-span-1 row-span-2 w-full h-fit border-2 border-gray-200 rounded-xl flex flex-col items-center py-3 gap-2">
					<img
						className="w-5/6 aspect-square object-contain"
						src={productDoe.data.image}
					/>

					<div dir="rtl" className="w-full flex flex-col gap-2 px-3">
						{ctx.loggedIn && (
							<div className="flex justify-center gap-3">
								<div
									className="bg-green/20 rounded-md p-1 flex gap-2 cursor-pointer box-border border-2 border-transparent duration-300 hover:border-green"
									onClick={() => putLikes({ like: true })}
								>
									<p>{productDoe.data.likes}</p>
									<Like1 variant="Bold" color="#06c574" />
								</div>
								<div
									className="bg-red/20 rounded-md p-1 flex gap-2 cursor-pointer box-border border-2 border-transparent duration-300 hover:border-red"
									onClick={() => putLikes({ like: false })}
								>
									<Dislike variant="Bold" color="#ef3b50" />
									<p>{productDoe.data.dislikes}</p>
								</div>

								{subscription.loading === false &&
									("data" in subscription ? (
										<div
											className="bg-blue/20 rounded-md p-1 flex gap-2 cursor-pointer box-border border-2 border-transparent duration-300 hover:border-blue"
											onClick={() =>
												unsubscribe({
													productId,
												})
											}
										>
											<Save2
												variant="Bold"
												color="#2388FF"
											/>
											<p>حذف نشان</p>
										</div>
									) : (
										<div
											className="bg-blue/20 rounded-md p-1 flex gap-2 cursor-pointer box-border border-2 border-transparent duration-300 hover:border-blue"
											onClick={() =>
												subscribe(null, { productId })
											}
										>
											<Save2
												variant="Linear"
												color="#2388FF"
											/>
											<p>نشان کردن</p>
										</div>
									))}

								<div
									className="bg-orange/20 rounded-md p-1 flex gap-2 cursor-pointer box-border border-2 border-transparent duration-300 hover:border-orange"
									onClick={() => {
										navigator.clipboard.writeText(
											document.URL
										);
										console.log("Copied");
									}}
								>
									<Copy variant="Linear" color="#ff9a23" />
								</div>
							</div>
						)}

						<hr className="w-full bg-gray-200" />

						<div className="flex gap-2">
							<Shop color="#2388FF" variant="Bold" />
							<p className="font-bold">فروشنده:</p>
							{selectedPrice.loading ? (
								<Loading className="mr-8" size={2} />
							) : "data" in selectedPrice ? (
								selectedPrice.data.seller.name
							) : (
								"فروشنده ای یافت نشد"
							)}
						</div>

						<hr className="w-full bg-gray-200" />

						<p className="flex gap-2">
							{!selectedPrice.loading &&
							"data" in selectedPrice ? (
								<>
									<TickCircle
										color="#06C574"
										variant="Bold"
									/>
									موجود در انبار
								</>
							) : (
								<>
									<CloseCircle
										color="#EF3B50"
										variant="Bold"
									/>
									ناموجود
								</>
							)}
						</p>

						<hr className="w-full bg-gray-200" />

						<div className="grid grid-cols-2 gap-1 w-full">
							<p className="font-bold flex gap-2">
								<DollarSquare color="#FF9A23" variant="Bold" />
								قیمت فروشنده:
							</p>

							<PriceSection selectedPrice={selectedPrice} />
						</div>

						{!selectedPrice.loading && "data" in selectedPrice ? (
							<Buttons selectedPrice={selectedPrice.data} />
						) : (
							<Button
								text="ناموجود"
								onClick={() => {}}
								color="blue"
								disabled
								icon={<ShoppingCart variant="Bold" />}
								className="w-full flex-row-reverse gap-3"
							/>
						)}
					</div>
				</div>
				<div className="bg-sky-100 flex flex-col gap-4 items-center rounded-xl px-5 pb-5">
					<div
						className="px-8 py-2 bg-white rounded-b-xl text-center"
						dir="rtl"
					>
						<p className="font-bold text-lg">فروشندگان:</p>

						{"data" in pricesDoe && (
							<p className="">
								{pricesDoe.data.data.length + " فروشنده"}
							</p>
						)}
					</div>

					<div className="w-full grid grid-cols-1 justify-evenly gap-4 md:grid-cols-2 xl:grid-cols-3">
						{"data" in pricesDoe && (
							<>
								{pricesDoe.data.data.map((p, _) => (
									<SellerSelect
										key={_}
										price={p}
										selectPrice={setSelectedPrice}
									/>
								))}
								{/* <SellerSelect
									price={{
										amount: 10,
										discount: "",
										id: "1214",
										price: 500000,
										productId: "",
										seller: {
											id: "sellerId",
											name: "Sample seller",
											information: "Sample information",
											address: "string",
										},
									}}
									selectPrice={setSelectedPrice}
								/> */}
							</>
						)}
					</div>
				</div>
			</div>

			<div className="h-10 bg-gray-200 flex justify-evenly"></div>

			<div className="px-4 w-full flex flex-col">
				<div className="flex justify-between px-6 pb-3">
					<a
						href="/products"
						target="_blank"
						className="text-lg text-end p-4 text-blue flex gap-2 items-center"
					>
						<ArrowLeft2 />
						مشاهده همه
					</a>

					<p className="text-2xl text-end font-bold p-4 text-blue">
						محصولات مشابه
					</p>
				</div>

				<div
					dir="rtl"
					className="w-full overflow-hidden flex gap-5 relative"
				>
					{"data" in similarProductsDoe ? (
						<>
							{similarProductsDoe.data.data.map((p, _) => (
								<ProductItem
									className="shrink-0"
									key={_}
									product={p}
								/>
							))}
						</>
					) : (
						<></>
					)}

					<div className="bg-gradient-to-r from-white to-transparent absolute left-0 top-0 h-full w-1/6 pointer-events-none" />
				</div>
			</div>

			<div className="w-full px-5 pb-12">
				<div
					className="flex sticky top-0 mt-5 border-b-2 border-gray-300 bg-white"
					dir="rtl"
				>
					<a
						className="flex gap-2 border-2 border-b-0 border-gray-300 px-8 py-3 w-fit font-medium"
						href="#details"
					>
						مشخصات
						<Book variant="Bold" />
					</a>

					<a
						className="flex gap-2 border-2 border-b-0 border-gray-300 px-8 py-3 w-fit font-medium"
						href="#comments"
					>
						دیدگاه ها
						<Book1 variant="Bold" />
					</a>
				</div>

				<div
					className="py-10 border-b-2 border-gray-300"
					id="details"
					dir="rtl"
				>
					<p className="font-medium text-lg border-b-4 border-orange py-2 w-48">
						معرفی
					</p>
					<p className="py-4">{productDoe.data.description}</p>
				</div>
				<CommentsSection
					productId={productId}
					commentsDoe={commentsDoe}
					updateComments={() => getComments({ productId: productId })}
				/>
			</div>
		</div>
	);
}
