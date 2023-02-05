import {
	CloseCircle,
	CloudCross,
	MessageQuestion,
	TickCircle,
	Warning2,
} from "iconsax-react";
import Button from "./Button";

interface Props {
	text: string;
	status: "Success" | "Warning" | "Error" | "Question" | "ConnectionLoss";
	onAccept?: () => void;
	onReject?: () => void;
}

export default function Alert({ text, status, onAccept, onReject }: Props) {
	const getIcon = () => {
		switch (status) {
			case "Success":
				return (
					<TickCircle
						className="w-32 h-32"
						color="#06c574"
						variant="Bulk"
					/>
				);
			case "Warning":
				return (
					<Warning2
						className="w-32 h-32"
						color="#ff9a23"
						variant="Bulk"
					/>
				);
			case "Error":
				return (
					<CloseCircle
						className="w-32 h-32"
						color="#ef3b50"
						variant="Bulk"
					/>
				);
			case "Question":
				return (
					<MessageQuestion
						className="w-32 h-32"
						color="#258cfa"
						variant="Bulk"
					/>
				);

			case "ConnectionLoss":
				return (
					<CloudCross
						className="w-32 h-32"
						color="#258cfa"
						variant="Bulk"
					/>
				);
		}
	};

	return (
		<div
			className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white border-2 drop-shadow-lg p-4 w-1/3 text-center"
			dir="rtl"
		>
			{getIcon()}
			<div className="font-medium px-4">{text}</div>

			{status === "Question" ? (
				<div className="flex gap-5">
					<Button
						text="انصراف"
						filled
						color="red"
						onClick={() => onReject && onReject()}
						className="px-10"
					/>
					<Button
						text="تایید"
						filled
						color="green"
						onClick={() => onAccept && onAccept()}
						className="px-10"
					/>
				</div>
			) : (
				<Button
					text="باشه!"
					filled
					onClick={() => onAccept && onAccept()}
					className="px-10"
				/>
			)}
		</div>
	);
}
