import { color } from "utils";

interface Props {
	text: string | undefined;
	color: color;
	className?: string;
}

export default function Tag({ text, color, className }: Props) {
	return (
		<p
			className={`text-gray-100 h-fit font-light text-md w-fit px-3 rounded-full bg-${color} ${className}`}
		>
			{text}
		</p>
	);
}
