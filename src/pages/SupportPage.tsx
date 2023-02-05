import Button from "components/Button";
import InputField from "components/InputField";
import PageNavigator from "components/PageNavigator";
import Textarea from "components/Textarea";
import { CallCalling, Location, Send, Sms } from "iconsax-react";
import { useState } from "react";

export default function SupportPage() {
	const [text, setText] = useState("");

	return (
		<>
			<PageNavigator text="درباره ما" />

			<div className="grid grid-cols-[30%_auto] gap-5 px-5 pb-8">
				<div className="flex flex-col gap-y-4 border-[1.5px] border-gray-300 rounded-3xl p-4">
					<p
						className="font-semibold flex justify-start gap-2"
						dir="rtl"
					>
						<CallCalling variant="Bold" color="#2388ff" />
						شماره تماس :
					</p>

					<p className="flex gap-5">041-3555555 , 0914555555</p>

					<p dir="rtl">
						هفت روز هفته، از ساعت 8 الی 14 پاسخگوی سوالات شماهستیم.
					</p>
					<hr className="bg-gray-300 h-[1.5px] w-full" />
					<p
						className="font-semibold flex justify-start gap-2"
						dir="rtl"
					>
						<Sms variant="Outline" color="#FF9A23" />
						ایمیل :
					</p>
					<p>Sevenshop@gmail.com</p>
					<hr className="bg-gray-300 h-[1.5px] w-full" />
					<p
						className="font-semibold flex justify-start gap-2"
						dir="rtl"
					>
						<Location variant="Bold" color="#FF9A23" />
						آدرس :
					</p>
					<p dir="rtl">
						اذربایجان شرقی ، تبریز ، بلوار 29 بهمن ، دانشگاه تبریز ،
						دانشکده برق و کامپیوتر ، کلاس 256
					</p>
					<p className="pt-5" dir="rtl">
						در صورتی که خارج از ساعات اداری تماس گرفتید ، می توانید
						از طریق فرم سمت راست پیغام خود را بگذارید ، کارشناسان ما
						پس از بررسی با شما تماس خواهند گرفت.
					</p>
				</div>

				<div className="p-6 border-[1.5px] border-gray-300 rounded-3xl">
					<p dir="rtl">
						پیشنهاد می‌کنیم قبل از تماس با پشتیانی صفحه
						<a className="text-blue" href="/FAQ">
							{" "}
							پرسش های متداول{" "}
						</a>
						را بخوانید؛ به احتمال زیاد جوابتان آن‌جا منتظر شماست.
					</p>
					<div className="flex justify-end pt-4 gap-5">
						<InputField
							name="ایمیل"
							placeholder="لطفا ایمیل خود را وارد نمایید"
							className="w-1/3"
						/>
						<InputField
							name="نام شما"
							placeholder="لطفا نام خود را وارد نمایید"
							className="w-1/3"
						/>
					</div>
					<div className="flex justify-end pt-4 gap-5">
						<InputField
							name="موضوع"
							className="w-1/3"
							placeholder={""}
						/>
						<InputField
							name="شماره تماس"
							placeholder="لطفا شماره خود را وارد نمایید"
							className="w-1/3"
						/>
					</div>
					<Textarea className="pt-4" setText={setText} />
					<div className="pt-4">
						<Button
							color="blue"
							filled
							text={"ارسال"}
							onClick={() => {}}
							className="pl-20 pr-12 py-3 gap-10"
							icon={<Send variant="Bold" color="#F9F9F9" />}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
