import Logo from "assets/Logo";
import Button from "components/Button";
import CheckBox from "components/CheckBox";
import InputField from "components/InputField";
import Loading from "components/Loading";
import { usePostApi } from "hooks/useApi";
import {
	ArrowCircleRight2,
	EyeSlash,
	Login as LoginIcon,
	Mobile,
	NoteFavorite,
	Profile,
} from "iconsax-react";
import { MainContext } from "MainContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { validatePassword } from "utils";
import { z } from "zod";

type RegisterStatus = {
	status: "Success" | "Failed" | "Exists";
};

export default function RegisterPage() {
	const navigate = useNavigate();
	const ctx = useContext(MainContext);

	const [registerDoe, registerCustomer] = usePostApi<RegisterStatus>(
		"https://localhost:5000/auth/register",
		(res) => {
			switch (res.status) {
				case "Success":
					ctx.syncProfile();
					ctx.showAlert({
						text: "با موفقیت ثبت نام شدید.",
						status: "Success",
						onAccept() {
							navigate("/auth/login");
						},
					});
					break;
				case "Failed":
					ctx.showAlert({
						text: "خطایی رخ داده است.",
						status: "Error",
					});
					break;
				case "Exists":
					ctx.showAlert({
						text: "کاربر قبلا ایجاد شده است.",
						status: "Warning",
					});
					break;
			}
		},
		() => {
			ctx.showAlert({
				text: "خطایی در ارتباط با سرور پیش آمده است.",
				status: "ConnectionLoss",
			});
		}
	);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rPassword, setRPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLasName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [checked, setChecked] = useState(false);

	const validateFields = (): string | true => {
		if (!z.string().min(8).safeParse(username).success)
			return "نام کاربری نامعتبر میباشد.";

		const vp = validatePassword(password);
		if (vp !== true) return vp;

		if (rPassword !== password)
			return "تکرار رمز عبور با رمز عبور همخوانی ندارد.";

		if (!z.string().min(2).safeParse(firstName).success)
			return "نام نامعتبر میباشد.";

		if (!z.string().min(2).safeParse(lastName).success)
			return "نام خانوادگی نامعتبر میباشد.";

		if (!z.string().length(11).safeParse(phoneNumber).success)
			return "شماره تلفن وارد شده نامعتبر میباشد.";

		if (!z.string().email().safeParse(email).success)
			return "ایمیل وارد شده نامعتبر میباشد.";

		if (!z.date().safeParse(new Date(birthDate)).success)
			return "تارخ تولد وارد شده نامعتبر میباشد.";

		if (!checked) return "تیک 'با قوانین سایت موافقم' انتخاب نشده است.";

		return true;
	};

	return (
		<div className="w-full sm:h-screen bg-blue/50 flex justify-center items-center">
			<div className="bg-white rounded-2xl overflow-hidden grid sm:grid-cols-2 w-full sm:w-4/5 md:w-3/4 xl:w-1/2 sm:h-4/5">
				<div className="p-5 flex flex-col items-center gap-8 text-center justify-center">
					<Logo />
					<p>
						وارد حساب کاربری خود شوید و تجربه بهترین خرید را با ما
						داشته باشید
					</p>
					<Button
						text="ورود"
						onClick={() => navigate("/auth/login")}
						color="black"
						icon={<LoginIcon />}
						className="px-9"
					/>
					<a href="/" className="flex items-center gap-2 text-sm">
						بازگشت به صفحه ی نخست
						<ArrowCircleRight2 size={20} />
					</a>
				</div>
				<div className="h-full overflow-y-scroll bg-blue/20">
					<div className="p-5 flex flex-col items-center gap-5 text-center">
						<p className="text-2xl font-bold">ثبت نام</p>

						<InputField
							name="نام کاربری"
							placeholder="لطفا نام کاربری خود را وارد نمایید"
							setText={setUsername}
							icon={
								<Profile
									variant="Bold"
									size={20}
									color="#2388ff"
								/>
							}
							className="w-full min-w-0"
						/>

						<InputField
							name="رمز عبور"
							placeholder="لطفا رمز عبور خود را وارد نمایید"
							setText={setPassword}
							icon={
								<EyeSlash
									variant="Bold"
									size={20}
									color="#2388ff"
								/>
							}
							isPassword
							className="w-full min-w-0"
						/>

						<InputField
							name="تکرار رمز عبور"
							placeholder="لطفا رمز عبور خود را وارد نمایید"
							setText={setRPassword}
							icon={
								<EyeSlash
									variant="Bold"
									size={20}
									color="#2388ff"
								/>
							}
							isPassword
							className="w-full min-w-0"
						/>

						<InputField
							name="نام"
							placeholder="لطفا نام خود را وارد نمایید"
							setText={setFirstName}
							className="w-full min-w-0"
						/>

						<InputField
							name="نام خانوادگی"
							placeholder="لطفا نام خانوادگی خود را وارد نمایید"
							setText={setLasName}
							className="w-full min-w-0"
						/>

						<InputField
							name="شماره تلفن"
							placeholder="لطفا شماره تلفن خود را وارد نمایید"
							icon={<Mobile size={20} color="#2388ff" />}
							setText={setPhoneNumber}
							className="w-full min-w-0"
						/>

						<InputField
							name="ایمیل"
							placeholder="لطفا ایمیل خود را وارد نمایید"
							setText={setEmail}
							className="w-full min-w-0"
						/>

						<InputField
							name="تاریخ تولد"
							placeholder="لطفا تاریخ تولد خود را وارد نمایید"
							setText={setBirthDate}
							className="w-full min-w-0"
						/>

						<CheckBox
							text="شرایط و قوانین سون شاپ را مطالعه نموده و با ان موافقم"
							className="text-right"
							onClick={setChecked}
						/>

						{registerDoe.loading ? (
							<Loading />
						) : (
							<Button
								text="ثبت نام"
								onClick={() => {
									const validationResult = validateFields();

									if (validationResult === true) {
										registerCustomer({
											type: "customer",
											username,
											password,
											firstName,
											lastName,
											phoneNumber,
											email,
											birthDate: new Date(
												birthDate
											).toISOString(),
										});
									} else {
										ctx.showAlert({
											status: "Error",
											text: validationResult,
										});
									}
								}}
								filled
								icon={<NoteFavorite variant="Bold" />}
								className="px-10 gap-2"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
