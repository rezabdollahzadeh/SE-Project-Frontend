import { useState } from "react";

interface Props {
	name: string;
	options: {
		label: string;
		value: any;
	}[];
	initial?: number;
	onSelect?: (val: string) => void;
	className?: string;
}

export default function RadioSection({
	name,
	options,
	initial = -1,
	onSelect,
	className,
}: Props) {
	const [selected, setSelected] = useState(initial);

	return (
		<div className={`flex flex-col w-full items-end ${className}`}>
			{options.map((option, i) => (
				<div
					key={i}
					onClick={() => {
						setSelected(i);
						onSelect && onSelect(option.value);
					}}
					className="flex items-center gap-2 cursor-pointer p-1"
				>
					<p>{option.label}</p>

					<input
						type="radio"
						id={name + i}
						name={name}
						value={option.value}
						onSelect={() => {
							setSelected(i);
							onSelect && onSelect(option.value);
						}}
						checked={selected === i}
						onChange={() => {}}
						className="w-4 h-4 accent-blue cursor-pointer"
					/>
				</div>
			))}
		</div>
	);
}
