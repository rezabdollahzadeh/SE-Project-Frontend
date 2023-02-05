import { CartStatus } from "model/Cart";

interface Props {
	status: CartStatus;
}

export default function CartStatusBar({ status }: Props) {
	const getText = () => {
		switch (status) {
			case "Filling":
				return "در حال پر کردن.";
			case "Pending":
				return "در انتظار تایید";
			case "Accepted":
				return "تایید شده";
			case "Rejected":
				return "رد شده";
			case "Sending":
				return "در حال ارسال";
			case "Received":
				return "دریافت شده";
		}
	};

	const getColor = () => {
		switch (status) {
			case "Filling":
				return "bg-blue";
			case "Pending":
				return "bg-orange";
			case "Rejected":
				return "bg-red";
			case "Accepted":
				return "bg-green";
			case "Sending":
				return "bg-green";
			case "Received":
				return "bg-green";
		}
	};

	console.log(status);

	return (
		<div className="h-full flex flex-col gap-3 items-center justify-center text-center">
			<p>{getText()}</p>
			<div className={`w-full h-3 rounded-full ${getColor()}`} />
		</div>
	);
}
