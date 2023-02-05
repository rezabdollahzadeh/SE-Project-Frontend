import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";

interface Props {
	text: string;
	icon?: JSX.Element;
	children: JSX.Element[] | JSX.Element;
}

export default function Dropdown({ text, icon, children }: Props) {
	const [menuHovered, setMenuHovered] = useState(false);
	const [panelHovered, setPanelHovered] = useState(false);

	return (
		<div
			className="flex flex-row gap-1 items-center p-2 cursor-pointer"
			onMouseEnter={() => setMenuHovered(true)}
			onMouseLeave={() => setTimeout(() => setMenuHovered(false), 100)}
		>
			<ArrowDown2
				size={16}
				className={`duration-300 ${
					menuHovered || panelHovered ? "rotate-180" : ""
				}`}
			/>
			<p className="mr-1 text-md">{text}</p>

			{icon}

			<div
				className={`absolute bottom-0 right-0 translate-y-[100%] w-screen pr-10 pl-14 pt-1 ease duration-300 ${
					menuHovered || panelHovered
						? "opacity-100"
						: "opacity-0 pointer-events-none"
				}`}
			>
				<div
					className="w-full bg-white rounded-lg shadow-[2px_2px_10px_1px_rgba(50,50,50,0.3)] p-5"
					onMouseEnter={() => setPanelHovered(true)}
					onMouseLeave={() => setPanelHovered(false)}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
