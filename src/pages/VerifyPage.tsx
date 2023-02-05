import Button from "components/Button";
import Loading from "components/Loading";
import { useGetApi } from "hooks/useApi";
import { CloseCircle, CloudCross, TickCircle, Warning2 } from "iconsax-react";
import { ReactNode, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface VerifyResponse {
	status: "Success" | "Expired" | "Invalid" | "Already Verified";
}

function Container({ children }: { children: ReactNode }) {
	return (
		<div
			className="w-screen h-screen flex flex-col items-center justify-center"
			dir="rtl"
		>
			<div className="w-1/2 h-1/2 flex flex-col items-center justify-center gap-5 rounded-lg bg-white border-gray-200 border-2 drop-shadow-lg text-xl p-5 text-center">
				{children}
			</div>
		</div>
	);
}

export default function VerifyPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const verificationCode = searchParams.get("verificationCode");
	const [verifyDoe, getVerifyResult] = useGetApi<VerifyResponse>(
		"https://localhost:5000/auth/verify"
	);

	const navigate = useNavigate();

	useEffect(() => {
		getVerifyResult({
			verificationCode: verificationCode,
		});
	}, []);

	if (verifyDoe.loading) {
		return (
			<Container>
				<p>در حال بررسی کد فعالسازی ...</p>
				<Loading />
			</Container>
		);
	}

	if ("error" in verifyDoe) {
		return (
			<Container>
				<p>خطایی در ارتباط با سرور رخ داده است.</p>

				<CloudCross
					className="w-24 h-24"
					color="#2388ff"
					variant="Bulk"
				/>

				<Button
					text="بازگشت به صفحه اصلی"
					onClick={() => navigate("/")}
					filled
					className="text-sm"
				/>
			</Container>
		);
	}

	return (
		<Container>
			{verifyDoe.data.status === "Success" ? (
				<>
					<p>اکانت شما با موفقیت فعال شد.</p>
					<TickCircle
						className="w-24 h-24"
						color="#06c574"
						variant="Bulk"
					/>
				</>
			) : verifyDoe.data.status === "Already Verified" ? (
				<>
					<p>اکانت شما قبلا فعال شده است.</p>
					<TickCircle
						className="w-24 h-24"
						color="#06c574"
						variant="Bulk"
					/>
				</>
			) : verifyDoe.data.status === "Expired" ? (
				<>
					<p>کد فعالسازی منقضی شده است.</p>
					<Warning2
						className="w-24 h-24"
						color="#ff9a23"
						variant="Bulk"
					/>
				</>
			) : (
				<>
					<p>کد فعالسازی نامعتبر میباشد.</p>
					<CloseCircle
						className="w-24 h-24"
						color="#ef3b50"
						variant="Bulk"
					/>
				</>
			)}

			<Button
				text="بازگشت به صفحه اصلی"
				onClick={() => navigate("/")}
				filled
				className="text-sm"
			/>
		</Container>
	);
}
