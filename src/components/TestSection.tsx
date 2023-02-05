interface Props {
	children: JSX.Element[] | JSX.Element;
}

export default function TestSection({ children }: Props) {
	return (
		<div className="flex flex-col gap-5 p-5 border-2 border-dashed border-purple rounded-lg">
			{children}
		</div>
	);
}
