import { SearchNormal1 } from "iconsax-react";

interface Props {
	text: string;
	setText?: (newText: string) => void;
	className?: string;
}

export default function SearchField({ text, setText, className }: Props) {
	return (
		<div className={`relative min-w-[300px] ${className}`}>
			<input
				type="text"
				className="duration-300 w-full p-3 pr-11 rounded-lg text-right outline-none bg-gray-200 placeholder:text-black"
				placeholder="جستجو"
				value={text}
				onChange={(e) => {
					if (setText) setText(e.target.value);
				}}
			/>

			<div className="h-full absolute right-5 top-0 flex items-center">
				<SearchNormal1 size={20} />
			</div>
		</div>
	);
}
