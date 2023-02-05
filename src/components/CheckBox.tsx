import { useState } from "react";

interface Props {
	text: string;
	initial?: boolean;
	disabled?: boolean;
	className?: string;
	onClick?: (newVal: boolean) => void;
}

export default function CheckBox({
	text,
	initial = false,
	disabled = false,
	className,
	onClick,
}: Props) {
	const [checked, setChecked] = useState(initial);

	const toggle = () => {
		setChecked((prev) => {
			onClick && onClick(!prev);
			return !prev;
		});
	};

	return (
		<div
			className={`flex flex-row gap-2.5 items-center ${className} ${
				disabled ? "grayscale cursor-not-allowed" : "cursor-pointer"
			}`}
			onClick={disabled ? undefined : toggle}
		>
			<p className={(disabled ? "text-gray-400" : "") + " break-words"}>
				{text}
			</p>
			<div
				className={`w-6 h-6 aspect-square rounded-lg duration-300 ${
					checked
						? `bg-cyan border-cyan`
						: `border-[2px] ${
								disabled ? "border-gray-300" : "border-black"
						  }`
				} flex justify-center items-center`}
			>
				<svg
					width="12"
					height="12"
					viewBox="0 0 10 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3.58 7.5801C3.38 7.5801 3.19 7.5001 3.05 7.3601L0.220002 4.5301C-0.0699975 4.2401 -0.0699975 3.7601 0.220002 3.4701C0.510002 3.1801 0.990002 3.1801 1.28 3.4701L3.58 5.7701L8.72 0.630098C9.01 0.340098 9.49 0.340098 9.78 0.630098C10.07 0.920098 10.07 1.4001 9.78 1.6901L4.11 7.3601C3.97 7.5001 3.78 7.5801 3.58 7.5801Z"
						fill={checked ? "#fff" : "transparent"}
					/>
				</svg>
			</div>
		</div>
	);
}
