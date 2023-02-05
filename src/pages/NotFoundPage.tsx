import Button from "components/Button";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<div className="py-20">
			<p className="text-center text-5xl font-bold" dir="rtl">
				صفحه مورد نظر یافت نشد.
			</p>
			<div className="flex justify-center pt-10 gap-5">
				<Button
					text="بازگشت به صفحه اصلی"
					filled
					onClick={() => navigate("/")}
				/>

				<Button
					text="مشاهده محصولات"
					color="orange"
					onClick={() => navigate("/products")}
				/>
			</div>
		</div>
	);
}
