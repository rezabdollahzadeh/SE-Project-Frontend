import { ArrowUp2 } from "iconsax-react";
import { useState } from "react";

interface Props {
	text: string;
	children: JSX.Element[] | JSX.Element;
}

export default function CollapsiblePanel2({ text, children }: Props) {
	const [closed, setClosed] = useState(true);

	const toggleClosed = () => setClosed((prev) => !prev);

	return (
		<div
			className={`w-full flex flex-col p-5 border-2 cursor-pointer rounded-lg duration-500 ${
				closed
					? "bg-white border-gray-300 gap-0"
					: "bg-[#E4F0FF] border-[#1EBCC5] gap-5"
			}`}
			onClick={toggleClosed}
		>
			<div className="flex justify-between">
				<ArrowUp2
					className={`duration-500 cursor-pointer ${
						closed ? "rotate-180" : ""
					}`}
				/>
				{text}
			</div>
			<div
				className={`flex gap-2 flex-col overflow-hidden ${
					closed
						? "max-h-0 opacity-0 duration-500"
						: "max-h-screen duration-500"
				}`}
				dir="rtl"
			>
				{children}
			</div>
		</div>
	);
}
