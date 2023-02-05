interface Props {
	rows?: number;
	title?: string;
	className?: string;
	setText?: (val: string) => void;
}

export default function Textarea({
	rows = 3,
	title = "متن پیام",
	className,
	setText,
}: Props) {
	return (
		<div className={`flex flex-col items-end ${className}`}>
			<p className="font-semibold">{title}</p>
			<textarea
				name="comment"
				rows={rows}
				className="w-full duration-300 p-3 mt-1 resize-none border-gray-300 border-2 rounded-lg outline-none hover:border-blue focus:border-blue"
				dir="rtl"
				onChange={(e) => setText && setText(e.target.value)}
			/>
		</div>
	);
}
