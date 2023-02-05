import { useState } from "react";

interface Props {
	text: string;
	initial?: boolean;
	disabled?: boolean;
	onClick?: (newVal: boolean) => void;
}

export default function Toggle({
	text,
	initial = false,
	disabled = false,
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
			className={`flex flex-row gap-2.5 items-center ${
				disabled ? "grayscale cursor-not-allowed" : "cursor-pointer"
			}`}
			onClick={disabled ? undefined : toggle}
		>
			<p className={disabled ? "text-gray-400" : ""}>{text}</p>

			<div
				className={`w-10 h-5 rounded-full duration-300 border-[2px] ${
					checked
						? `bg-cyan border-cyan`
						: `${disabled ? "border-gray-300" : "border-black"}`
				} p-0.5 relative`}
			>
				<span
					className={`absolute duration-300 rounded-full h-3 w-3 ${
						checked ? "bg-white ml-5" : "bg-black ml-0"
					}`}
				></span>
			</div>
		</div>
	);
}
