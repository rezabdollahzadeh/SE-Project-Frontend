import { ArrowLeft2, SafeHome } from "iconsax-react";
import { useNavigate } from "react-router";

interface Props {
	text: string;
	bottomText?: string;
	className?: string;
}

export default function PageNavigator({ text, bottomText, className }: Props) {
	const navigate = useNavigate();

	return (
		<>
			<div className={`flex justify-end gap-1 p-5 ${className}`}>
				<p className="text-gray-400 underline-offset-2 cursor-pointer hover:underline">
					{text}
				</p>
				<ArrowLeft2 />
				<SafeHome
					variant="Bold"
					className="w-5 cursor-pointer"
					onClick={() => navigate("/")}
				/>
			</div>

			{bottomText && (
				<p className="text-right font-semibold mr-6 -mt-1">
					{bottomText}
				</p>
			)}
		</>
	);
}
