import Logo from "assets/Logo";
import { useGetApi } from "hooks/useApi";
import {
	Book1,
	Box,
	CallCalling,
	Car,
	Heart,
	Home,
	Login,
	Logout,
	Mobile,
	Profile as ProfileIcon,
	Profile2User,
	Shop,
	ShoppingCart,
	Star1,
} from "iconsax-react";
import { MainContext } from "MainContext";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Loading from "./Loading";
import SearchField from "./SearchField";

interface PageProps {
	text: string;
	pathname: string;
}

function HeaderPage({ text, pathname }: PageProps) {
	const currentRoute = useLocation();
	const navigate = useNavigate();

	return (
		<div
			key={text}
			className={`h-full relative flex items-center px-2 cursor-pointer ${
				currentRoute.pathname == pathname
					? "text-blue"
					: "text-gray-400"
			}`}
			onClick={() => navigate(pathname)}
		>
			<p>{text}</p>
			{currentRoute.pathname == pathname && (
				<div className="w-5/6 h-1 bg-blue absolute bottom-0 left-1/2 -translate-x-1/2 rounded-sm" />
			)}
		</div>
	);
}

function ProductsDropDown() {
	const categories = [
		{
			text: "همه محصولات",
			url: "http://localhost:3000/products/",
			icon: <Box size={22} />,
		},
		{
			text: "کالای دیجیتال",
			url: "http://localhost:3000/products/?category=Digital",
			icon: <Mobile size={22} />,
		},
		{
			text: "مد وپوشاک",
			url: "http://localhost:3000/products/?category=Fashion",
			icon: <ProfileIcon size={22} />,
		},
		{
			text: "خودرو",
			url: "http://localhost:3000/products/?category=Cars",
			icon: <Car size={22} />,
		},
		{
			text: "زیبایی و سلامت",
			url: "http://localhost:3000/products/?category=HealthAndBeauty",
			icon: <Heart size={22} />,
		},
		{
			text: "لوازم خانگی",
			url: "http://localhost:3000/products/?category=HomeAppliances",
			icon: <Home size={22} />,
		},
		{
			text: "کتاب",
			url: "http://localhost:3000/products/?category=Books",
			icon: <Book1 size={22} />,
		},
	];

	return (
		<div
			className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4 gap-4"
			dir="rtl"
		>
			{categories.map((category, i) => (
				<a
					className="flex gap-5 p-4 border-2 border-gray-200 rounded-lg duration-300 hover:border-blue hover:bg-blue/10"
					href={category.url}
					target="_blank"
					key={i}
				>
					{category.icon}
					{category.text}
				</a>
			))}
		</div>
	);
}

export default function Header() {
	const ctx = useContext(MainContext);

	const [_, logout] = useGetApi("https://localhost:5000/auth/logout", () => {
		ctx.syncProfile();
		navigate("/");
	});

	const menuPages = [
		{
			text: "صفحه اصلی",
			pathname: "/",
		},
		{
			text: "پشتیبانی",
			pathname: "/support",
		},
		{
			text: "درباره ما",
			pathname: "/about-us",
		},
	];

	const menuDropdowns = [
		{
			text: "محصولات",
			children: <ProductsDropDown />,
			icon: <Box size={22} />,
		},
		{
			text: "فروشندگان",
			children: (
				<div
					className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4 gap-4"
					dir="rtl"
				>
					<a
						className="flex gap-5 p-4 border-2 border-gray-200 rounded-lg duration-300 hover:border-blue hover:bg-blue/10"
						href="/sellers"
						target="_blank"
					>
						<Profile2User />
						همه فروشندگان
					</a>

					<a
						className="flex gap-5 p-4 border-2 border-gray-200 rounded-lg duration-300 hover:border-blue hover:bg-blue/10"
						href="/sellers"
						target="_blank"
					>
						<Star1 />
						فروشندگان برتر
					</a>
				</div>
			),
			icon: <Shop size={22} />,
		},
	];

	const navigate = useNavigate();

	return (
		<div className="w-full h-fit flex flex-col">
			<div className="flex flex-row justify-between items-center px-20 h-16">
				<div className="grid grid-flow-col gap-x-4 text-sm my-2">
					<div className="col-span-1 row-span-2 py-2">
						<CallCalling color="#2388ff" variant="Bold" size={30} />
					</div>
					<p className="col-span-1 row-span-1">
						پشتیبانی همه روزه از ساعت ۸ الی ۱۵
					</p>
					<p className="col-span-1 row-span-1">۰۴۱-۳۵۵۵۵۵۵۵</p>
				</div>

				<div className="h-full flex flex-row-reverse gap-6">
					{menuPages.map((page, _) => (
						<HeaderPage
							key={_}
							text={page.text}
							pathname={page.pathname}
						/>
					))}
				</div>
			</div>

			<hr className="bg-gray-200" />

			<div className="grid grid-flow-col items-center px-10 py-7">
				<div className="flex gap-2">
					{ctx.loggedIn && "data" in ctx.profile ? (
						<>
							{ctx.profile.data.accessLevel === "customer" && (
								<Button
									text="سبد خرید"
									onClick={() =>
										navigate(
											"/dashboard?tab=%D8%B3%D8%A8%D8%AF+%D8%AE%D8%B1%DB%8C%D8%AF"
										)
									}
									icon={<ShoppingCart variant="Bold" />}
									notification={
										"data" in ctx.currentCart
											? ctx.currentCart.data.products
													.length
											: 0
									}
									color="black"
									accent="blue"
								/>
							)}

							<Button
								text="پروفایل کاربری"
								onClick={() => {
									navigate("/dashboard?tab=پروفایل");
								}}
								icon={<ProfileIcon variant="Bold" />}
								color="blue"
							/>

							<Button
								text="خروج"
								onClick={() => {
									ctx.showAlert({
										status: "Question",
										text: "آیا مطمئن هستید؟",
										onAccept() {
											logout();
										},
									});
								}}
								icon={<Logout variant="Bold" />}
								color="red"
							/>
						</>
					) : (
						<>
							<Button
								text="ورود / ثبت نام"
								onClick={() => {
									navigate("/auth/login");
								}}
								icon={<Login />}
								color="blue"
							/>
						</>
					)}
				</div>

				<SearchField text={""} />

				<Logo
					className="h-12 justify-self-end cursor-pointer"
					onClick={() => navigate("/")}
				/>
			</div>

			<div className="relative bg-gray-100 px-10 flex flex-row-reverse justify-between items-center z-10">
				<div className="flex flex-row-reverse gap-1 py-2">
					{menuDropdowns.map((dropdown, _) => (
						<Dropdown
							key={_}
							text={dropdown.text}
							icon={dropdown.icon}
							children={dropdown.children}
						/>
					))}
				</div>
				{/* <Button
					text="فروش ویژه"
					onClick={() => {}}
					color="orange"
					filled
				/> */}
			</div>
		</div>
	);
}
