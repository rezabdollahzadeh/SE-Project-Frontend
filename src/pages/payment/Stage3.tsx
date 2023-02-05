import Loading from "components/Loading";
import { usePutApi } from "hooks/useApi";
import { ArrowRight, CloseCircle, TickCircle } from "iconsax-react";
import { useEffect } from "react";

type FinalizeResponse = {
	status: "Accepted" | "Rejected";
};

export default function Stage3() {
	const [res, finalize] = usePutApi<FinalizeResponse>(
		"https://localhost:5000/profile/carts/current/accept",
		(r) => {
			console.log(r);
		}
	);

	useEffect(() => {
		finalize(undefined);
	}, []);

	if (res.loading)
		return (
			<div className="border-[1.5px] col-span-2 row-span-1 border-gray-300 rounded-3xl p-5">
				<div className="flex flex-col items-center h-full justify-center pb-20">
					<Loading />
				</div>
			</div>
		);

	if ("error" in res || res.data.status === "Rejected")
		return (
			<div className="border-[1.5px] col-span-2 row-span-1 border-gray-300 rounded-3xl p-5">
				<a className="text-blue flex gap-2 items-center" href="/">
					بازگشت به صفحه اصلی
					<ArrowRight size={20} />
				</a>
				<div className="flex flex-col items-center h-full justify-center pb-20">
					<CloseCircle size={200} variant="Bold" color="#ef3b50" />
					<p dir="rtl" className="font-medium">
						خطایی رخ داده است!
					</p>
				</div>
			</div>
		);

	return (
		<div className="border-[1.5px] col-span-2 row-span-1 border-gray-300 rounded-3xl p-5">
			<a className="text-blue flex gap-2 items-center" href="/">
				بازگشت به صفحه اصلی
				<ArrowRight size={20} />
			</a>
			<div className="flex flex-col items-center h-full justify-center pb-20">
				<TickCircle size={200} variant="Bold" color="#06C574" />
				<p dir="rtl" className="font-medium">
					پرداخت با موفقیت انجام شد !
				</p>
			</div>
		</div>
	);
}
