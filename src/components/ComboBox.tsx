import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";

interface Props {
	name: string;
	options: string[];
	placeholder: string;
	disabled?: boolean;
	selected?: string | undefined;
	setSelected: (newVal: string) => void;
	className?: string;
}

export default function ComboBox({
	name,
	options,
	placeholder,
	disabled = false,
	selected,
	setSelected,
	className,
}: Props) {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => setVisible((prev) => !prev);

	return (
		<div
			className={`flex flex-col items-end relative text-right ${className}`}
		>
			<p className="font-semibold"> {name}</p>
			<div
				className={`w-full duration-300 border-2 p-3 mt-1 rounded-lg bg-white cursor-pointer flex justify-between items-center ${
					disabled
						? "border-gray-200 text-gray-300"
						: visible
						? "border-blue"
						: "border-gray-300"
				}`}
				onClick={() => !disabled && toggleVisible()}
			>
				<ArrowDown2 size={20} />
				<p className="truncate" dir="rtl">
					{selected || placeholder}
				</p>
			</div>

			{visible && (
				<div className="absolute w-full min-h-[10px] max-h-48 overflow-y-scroll z-10 bottom-0 border-2 px-2 border-gray-300 rounded-lg bg-white translate-y-full last-child:border-b-0">
					{options.map((opt, i) => (
						<p
							dir="rtl"
							key={opt}
							className={`border-gray-300 px-3 py-2.5 cursor-pointer ${
								i !== 0 && "border-t-2"
							}`}
							onClick={() => {
								// setSelected(opt);
								toggleVisible();
								setSelected(opt);
							}}
						>
							{opt}
						</p>
					))}
				</div>
			)}
		</div>
	);
}
