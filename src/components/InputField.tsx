import { CloseCircle, TickCircle } from "iconsax-react";
import { useState } from "react";

interface Props {
	name?: string;
	placeholder?: string;
	disabled?: boolean;
	isPassword?: boolean;
	icon?: JSX.Element;
	className?: string;
	rtl?: boolean;
	setText?: (newText: string) => void;
	validator?: (newVal: string) => boolean;
}

export default function InputField({
	name,
	placeholder,
	disabled = false,
	isPassword = false,
	icon,
	className,
	rtl = false,
	setText,
	validator,
}: Props) {
	type fieldStatus = "ok" | "fail" | "idle";

	const [status, setStatus] = useState<fieldStatus>("idle");

	const borderColor = (s: fieldStatus) => {
		if (disabled) return "border-gray-300";
		if (s === "ok") return "border-green";
		if (s === "fail") return "border-red";
		return "border-gray-300";
	};

	const fieldIcon = (s: fieldStatus) => {
		if (disabled) return icon;
		if (s === "ok")
			return <TickCircle variant="Bold" size={20} color="#06c574" />;
		if (s === "fail")
			return <CloseCircle variant="Bold" size={20} color="#ef3b50" />;
		return icon;
	};

	return (
		<div className={`flex flex-col items-end relative ${className}`}>
			<p className="w-full font-semibold text-right">{name}</p>
			<input
				type={isPassword ? "password" : "text"}
				className={`w-full duration-300 border-2 p-3 mt-1 rounded-lg text-right outline-none bg-white ${
					status === "idle" && !disabled
						? `hover:border-blue focus:border-blue`
						: ""
				} ${borderColor(status)} ${
					disabled ? "placeholder:text-gray-300" : ""
				}`}
				placeholder={placeholder}
				disabled={disabled}
				onChange={(e) => {
					if (setText) setText(e.target.value);
					setStatus(
						validator
							? validator(e.target.value)
								? "ok"
								: "fail"
							: "idle"
					);
				}}
				dir={rtl ? "rtl" : "ltr"}
			/>

			<div
				className={`absolute bottom-4 left-3.5 ${
					disabled ? "text-gray-300" : "text-gray-500"
				}`}
			>
				{fieldIcon(status)}
			</div>
		</div>
	);
}
