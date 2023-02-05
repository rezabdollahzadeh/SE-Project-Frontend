import Footer from "components/Footer";
import Header from "components/Header";
import AboutPage from "pages/AboutPage";
import DashboardPage from "pages/DashboardPage";
import FaqPage from "pages/FaqPage";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import NotFoundPage from "pages/NotFoundPage";
import PaymentPage from "pages/PaymentPage";
import ProductPage from "pages/ProductPage";
import ProductsPage from "pages/ProductsPage";
import RegisterPage from "pages/RegisterPage";
import RulesPage from "pages/RulesPage";
import SellerPage from "pages/SellerPage";
import SellersPage from "pages/SellersPage";
import SupportPage from "pages/SupportPage";
import VerifyPage from "pages/VerifyPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import TestPage from "../pages/TestPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Header />
				<Outlet />
				<Footer />
			</>
		),
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/products",
				element: <ProductsPage />,
			},
			{
				path: "/products/:id",
				element: <ProductPage />,
			},
			{
				path: "/sellers",
				element: <SellersPage />,
			},
			{
				path: "/sellers/:id",
				element: <SellerPage />,
			},
			{
				path: "/dashboard",
				element: <DashboardPage />,
			},
			{
				path: "/dashboard",
				element: <DashboardPage />,
			},
			{
				path: "/rules",
				element: <RulesPage />,
			},
			{
				path: "/rules",
				element: <RulesPage />,
			},
			{
				path: "/about-us",
				element: <AboutPage />,
			},
			{
				path: "/support",
				element: <SupportPage />,
			},
			{
				path: "/FAQ",
				element: <FaqPage />,
			},
		],
	},
	{
		path: "/auth/login",
		element: <LoginPage />,
	},
	{
		path: "/auth/register",
		element: <RegisterPage />,
	},
	{
		path: "/auth/forgot",
		element: <ForgotPasswordPage />,
	},
	{
		path: "/auth/verify",
		element: <VerifyPage />,
	},
	{
		path: "/payment",
		element: <PaymentPage />,
	},
	{
		path: "*",
		element: (
			<>
				<Header />
				<NotFoundPage />
				<Footer />
			</>
		),
	},
	{
		path: "/test",
		element: <TestPage />,
		children: [
			{
				path: "products",
			},
		],
	},
]);
