interface IconProps {
	color: string;
}

function UserIcon({ color }: IconProps) {
	return (
		<svg
			width="50"
			height="42"
			viewBox="0 0 50 42"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0.5 41.5C3.5 37.6667 12.6 30 25 30C37.4 30 46.5 37.6667 49.5 41.5"
				strokeWidth={1.5}
				stroke={color}
			/>
			<circle cx="25" cy="15" r="14.5" strokeWidth={1.5} stroke={color} />
			<path
				d="M17.5 16C17.5 18.5 19.5 23 25 23C30.5 23 32.5 18.5 32.5 16"
				strokeWidth={1.5}
				stroke={color}
			/>
		</svg>
	);
}

interface Props {
	name: string;
	role: string;
	id?: string;
	team: "Manager" | "Frontend" | "Backend";
}

export default function AboutDeveloper({ name, role, id, team }: Props) {
	const color =
		team === "Backend"
			? "#e05a33"
			: team === "Frontend"
			? "#4da660"
			: "#8c4cf6";

	const bgColor =
		team === "Backend"
			? "bg-[#e05a33]"
			: team === "Frontend"
			? "bg-[#4da660]"
			: "bg-[#8c4cf6]";

	const bgColor10 =
		team === "Backend"
			? "bg-[#e05a33]/10"
			: team === "Frontend"
			? "bg-[#4da660]/10"
			: "bg-[#8c4cf6]/10";

	const bgColor20 =
		team === "Backend"
			? "bg-[#e05a33]/20"
			: team === "Frontend"
			? "bg-[#4da660]/20"
			: "bg-[#8c4cf6]/20";

	const teamText =
		team === "Backend"
			? "بک اند"
			: team === "Frontend"
			? "فرانت اند"
			: "سون شاپ";

	return (
		<div
			id={id}
			className="bg-white border-gray-200 border drop-shadow-md rounded-2xl overflow-hidden flex flex-col items-center gap-2 px-8 py-7 relative"
		>
			<div className={`w-full h-1.5 absolute top-0 ${bgColor}`} />
			<div
				className={`w-16 h-16 my-1 rounded-full ${bgColor20} border-2 border-black/5 flex justify-center items-center overflow-hidden`}
			>
				<UserIcon color={color} />
			</div>
			<p className="my-1.5">{name}</p>

			<div className="flex gap-3 items-center">
				<p
					className={`font-semibold text-xs px-5 py-0.5 rounded-sm ${bgColor10}`}
				>
					ROLE
				</p>
				<p className="text-sm text-left w-32">{role}</p>
			</div>
			<div className="flex gap-3 items-center">
				<p
					className={`font-semibold text-xs px-5 py-0.5 rounded-sm ${bgColor10}`}
				>
					TEAM
				</p>
				<p className="text-sm text-left w-32">{teamText}</p>
			</div>
		</div>
	);
}
