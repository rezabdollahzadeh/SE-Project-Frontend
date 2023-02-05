import Logo from "../assets/Logo";
import Telegram from "../assets/Telegram";
import Instagram from "../assets/Instagram";
import WhatsApp from "../assets/WhatsApp";

import {
	ArrowCircleUp,
	CallCalling,
	Location,
	Signpost,
	Sms,
} from "iconsax-react";
import { useNavigate } from "react-router";

export default function Footer() {
	const navigate = useNavigate();

	return (
		<div className="bg-gray-200 pt-16 pb-8 w-full flex flex-col gap-8 items-center text-right font-bold">
			<div className="w-full flex pl-10 pr-24 justify-between items-center mb-4">
				<div className="flex items-end flex-col">
					<a href="/">
						<Logo className="h-24 pb-8" />
					</a>

					<p>: ما را در شبکه های اجتماعی نیز دنبال کنید</p>
					<div className="flex flex-row-reverse gap-5 pt-3">
						<a href="#">
							<Telegram className="w-6" />
						</a>
						<a href="#">
							<WhatsApp className="w-6" />
						</a>
						<a href="#">
							<Instagram className="w-6" />
						</a>
					</div>
				</div>
				<div>
					<div className="relative w-full mb-4 border-b-[1px] border-black pb-2 ">
						خدمات مشتریان
						<hr className="absolute h-1 w-20 bg-blue bottom-0 right-0" />
					</div>

					<div className="flex flex-col gap-4">
						<a href="/products">تخفیف ها و جشنواره</a>
						<a href="/FAQ">پرسش های متداول</a>
						<a href="/rules">قوانین و مقررات</a>
					</div>
				</div>
				<div>
					<div className="relative w-full mb-4 border-b-[1px] border-black pb-2 ">
						میانبر
						<hr className="absolute h-1 w-20 bg-blue bottom-0 right-0" />
					</div>
					<div className="flex flex-col gap-4">
						<a href="/">صفحه اصلی</a>
						<a href="/support">پشتیبانی</a>
						<a href="/about-us">درباره ما</a>
					</div>
				</div>
				<div>
					<div className="relative w-full mb-4 border-b-[1px] border-black pb-2 ">
						تماس با ما
						<hr className="absolute h-1 w-20 bg-blue bottom-0 right-0" />
					</div>
					<div className="relative">
						<div className="pr-24 flex flex-col gap-4 text-left text-gray-500 font-normal">
							<p>تبریز،بلوار 29 بهمن،دانشگاه تبریز</p>
							<p>041-3555555</p>
							<p>5166616471</p>
							<p>7shop@gmail.com</p>
						</div>
						<div className="absolute right-0 top-0 grid gap-x-1.5 gap-y-4 grid-cols-[auto_auto]">
							<p>: نشانی</p>
							<Location
								color="#2388ff"
								variant="Bold"
								size={22}
							/>
							<p>: تلفن</p>
							<CallCalling
								color="#2388ff"
								variant="Bold"
								size={22}
							/>
							<p>: کد پستی</p>
							<Signpost
								color="#2388ff"
								variant="Bold"
								size={22}
							/>
							<p>: ایمیل</p>
							<Sms color="#2388ff" variant="Bold" size={22} />
						</div>
					</div>
				</div>
			</div>
			<div className="w-full px-24">
				<hr className="bg-gray-300 w-full h-0.5" />
			</div>
			<div
				className=" flex justify-evenly items-center flex-col gap-1 cursor-pointer"
				onClick={() => window.scrollTo(0, 0)}
			>
				<ArrowCircleUp color="#2388ff" variant="Bold" size={22} />
				<p className="font-normal">برگشت به بالا</p>
			</div>
		</div>
	);
}
