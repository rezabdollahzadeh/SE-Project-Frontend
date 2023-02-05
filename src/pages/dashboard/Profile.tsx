import { MainContext } from "MainContext";
import { useContext, useState } from "react";
import { Edit, Profile as ProfileImage, Save2, SaveAdd } from "iconsax-react";
import InputField from "components/InputField";
import Button from "components/Button";
import { usePutApi } from "hooks/useApi";
import User from "model/User";
import { z } from "zod";

export default function Profile() {
	const ctx = useContext(MainContext);
	const [editing, setEditing] = useState(false);

	if (ctx.profile.loading || "error" in ctx.profile)
		return <p>loading ...</p>;

	const [profile, updateProfile] = usePutApi<User>(
		"https://localhost:5000/profile",
		() => ctx.syncProfile(),
		() => ctx.showAlert({ status: "Error", text: "خطایی رخ داده است" })
	);

	// =============== New Fields ===============

	const [newFirstName, setNewFirstName] = useState<string | undefined>(
		undefined
	);
	const [newLastName, setNewLastName] = useState<string | undefined>(
		undefined
	);
	const [newEmail, setNewEmail] = useState<string | undefined>(undefined);
	const [newPhoneNumber, setNewPhoneNumber] = useState<string | undefined>(
		undefined
	);
	const [newProfileImage, setNewProfileImage] = useState<string | undefined>(
		undefined
	);

	const validateFields = (): string | true => {
		if (newFirstName && !z.string().min(1).safeParse(newFirstName).success)
			return "نام نامعتبر میباشد.";

		if (newLastName && !z.string().min(1).safeParse(newLastName).success)
			return "نام خانوادگی نامعتبر میباشد.";

		if (newEmail && !z.string().email().safeParse(newEmail).success)
			return "ایمیل وارد شده نامعتبر میباشد.";

		if (
			newPhoneNumber &&
			!z.string().length(11).safeParse(newPhoneNumber).success
		)
			return "شماره تلفن وارد شده نامعتبر میباشد.";

		if (
			newProfileImage &&
			!z.string().url().safeParse(newProfileImage).success
		)
			return "آدرس تصویر وارد شده نامعتبر میباشد.";

		return true;
	};

	// ==========================================

	return (
		<div className="w-full flex flex-col items-center p-5 gap-5">
			{ctx.profile.data.profileImage ? (
				<img
					className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
					src={ctx.profile.data.profileImage}
				/>
			) : (
				<ProfileImage
					className="w-32 h-32 rounded-full border-2 border-gray-300"
					variant="Bold"
					color="black"
				/>
			)}

			<p
				className="w-full font-medium text-lg border-b-2 border-gray-300 p-2"
				dir="rtl"
			>
				اطلاعات حساب کاربری
			</p>
			<div
				className="w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
				dir="rtl"
			>
				<InputField
					name="نام کاربری"
					placeholder={ctx.profile.data.username}
					disabled
				/>
				<InputField
					name="ایمیل"
					placeholder={ctx.profile.data.email}
					disabled={!editing}
					setText={setNewEmail}
				/>
				<InputField
					name="شماره تلفن"
					placeholder={ctx.profile.data.phoneNumber}
					disabled={!editing}
					setText={setNewPhoneNumber}
				/>

				<InputField
					name="آدرس عکس پروفایل"
					placeholder={ctx.profile.data.profileImage}
					disabled={!editing}
					setText={setNewProfileImage}
					className="col-span-1 lg:col-span-2 xl:col-span-3"
				/>
			</div>

			<p
				className="w-full font-medium text-lg border-b-2 border-gray-300 p-2"
				dir="rtl"
			>
				اطلاعات شخصی
			</p>
			<div
				className="w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
				dir="rtl"
			>
				<InputField
					name="نام"
					placeholder={ctx.profile.data.firstName}
					disabled={!editing}
					setText={setNewFirstName}
				/>
				<InputField
					name="نام خانوادگی"
					placeholder={ctx.profile.data.lastName}
					disabled={!editing}
					setText={setNewLastName}
				/>
				<InputField
					name="تاریخ تولد"
					placeholder={ctx.profile.data.birthDate}
					disabled
				/>
			</div>

			<div className="w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{editing ? (
					<>
						<Button
							text="ذخیره اطلاعات"
							onClick={() => {
								const validationResult = validateFields();
								if (validationResult === true) {
									setEditing(false);
									updateProfile({
										firstName: newFirstName,
										lastName: newLastName,
										phoneNumber: newPhoneNumber,
										email: newEmail,
										profileImage: newProfileImage,
									});
								} else {
									ctx.showAlert({
										status: "Error",
										text: validationResult,
									});
								}
							}}
							filled
							color="green"
						/>

						<Button
							text="انصراف"
							onClick={() => {
								setEditing(false);
								ctx.syncProfile();
							}}
							filled
							color="red"
						/>
					</>
				) : (
					<Button
						text="ویرایش اطلاعات"
						onClick={() => setEditing(true)}
						filled
						icon={<Edit variant="Bold" />}
					/>
				)}
			</div>
		</div>
	);
}
