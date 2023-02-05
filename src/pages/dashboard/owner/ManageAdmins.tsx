import Button from "components/Button";
import Loading from "components/Loading";
import PageController from "components/PageController";
import { useDeleteApi, useGetApi } from "hooks/useApi";
import { CloseCircle, Profile, TickCircle } from "iconsax-react";
import { MainContext } from "MainContext";
import Pagination from "model/Pagination";
import User from "model/User";
import { useContext, useEffect } from "react";

interface RowItemProps {
	admin: User;
	updatePage: () => void;
}
function RowItem({ admin, updatePage }: RowItemProps) {
	const url = `https://localhost:5000/admin/users/${admin.id}`;
	const [_, restrictUser] = useDeleteApi(url, updatePage);
	const ctx = useContext(MainContext);

	const thStyle = "py-3 px-2 font-normal";

	return (
		<tr className="border-b border-b-gray-300 duration-300 cursor-pointer hover:bg-gray-100">
			<th className={thStyle}>
				{admin.profileImage ? (
					<img
						className="w-7 h-7 object-cover rounded-full"
						src={admin.profileImage}
					/>
				) : (
					<Profile className="w-6 h-6 mx-auto" variant="Bold" />
				)}
			</th>
			<th className={thStyle}>{admin.username}</th>
			<th className={thStyle}>{admin.firstName}</th>
			<th className={thStyle}>{admin.lastName}</th>
			<th className={thStyle}>{admin.phoneNumber}</th>
			<th className={thStyle}>{admin.email}</th>
			<th className={thStyle}>
				{admin.restricted ? (
					<CloseCircle
						className="mx-auto"
						variant="Bold"
						color="#ef3b50"
					/>
				) : (
					<TickCircle
						className="mx-auto"
						variant="Bold"
						color="#06c574"
					/>
				)}
			</th>
			<th className="pl-2">
				<Button
					filled
					text={admin.restricted ? "آزاد کن" : "مسدود کن"}
					color={admin.restricted ? "green" : "orange"}
					onClick={() => {
						ctx.showAlert({
							status: "Question",
							text: "آیا از این کار اطمینان دارید؟",
							onAccept() {
								restrictUser();
							},
						});
					}}
					className="px-2 py-2 text-sm font-normal w-full"
				/>
			</th>
		</tr>
	);
}

export default function ManageAdmins() {
	const ctx = useContext(MainContext);

	const [adminsDoe, loadAdmins] = useGetApi<Pagination<User>>(
		"https://localhost:5000/admin/users"
	);

	const loadPage = (page: number = 1) => {
		loadAdmins({
			page,
			usersPerPage: 10,
			type: "admin",
		});
	};

	useEffect(() => {
		loadPage();
	}, []);

	if (ctx.profile.loading || adminsDoe.loading)
		return (
			<div className="w-full h-full flex justify-center items-center">
				<Loading />
			</div>
		);

	if ("error" in ctx.profile || "error" in adminsDoe)
		return (
			<div className="w-full h-full flex justify-center items-center">
				خطایی رخ داده است
			</div>
		);

	const updatePage = () =>
		loadAdmins({
			page: adminsDoe.data.page,
			usersPerPage: 10,
			type: "admin",
		});

	return (
		<div className="w-full h-fit flex flex-col items-center gap-3 pb-5">
			{adminsDoe.data.data.length === 0 ? (
				<p className="text-center mt-10 font-medium text-2xl">
					کاربری یافت نشد
				</p>
			) : (
				<>
					<div className="w-full overflow-x-scroll">
						<table className="w-full text-center" dir="rtl">
							<thead className="border-b border-gray-300 bg-gray-200">
								<tr className="">
									<th className="font-medium py-2 w-max"></th>
									<th className="font-medium py-2 w-max">
										نام کاربری
									</th>
									<th className="font-medium py-2 w-max">
										نام
									</th>
									<th className="font-medium py-2 w-max">
										نام خانوادگی
									</th>
									<th className="font-medium py-2 w-max">
										شماره تلفن
									</th>
									<th className="font-medium py-2 w-max">
										ایمیل
									</th>
									<th className="font-medium py-2 w-max">
										وضعیت
									</th>
									<th className="font-medium py-2 w-max">
										عملیات
									</th>
								</tr>
							</thead>
							<tbody>
								{adminsDoe.data.data.map((a, i) => (
									<RowItem
										key={i}
										admin={a}
										updatePage={updatePage}
									/>
								))}
							</tbody>
						</table>
					</div>

					<PageController
						pagination={adminsDoe.data}
						setPage={(newPage) => {
							loadPage(newPage);
						}}
					/>
				</>
			)}
		</div>
	);
}
