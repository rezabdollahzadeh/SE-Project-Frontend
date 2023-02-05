import { Star, Star1 } from "iconsax-react";
import DiscountToken from "model/DiscountToken";
import { ReactNode } from "react";

interface SectionProps {
	children: ReactNode;
	className?: string;
}
function Section({ children, className }: SectionProps) {
	return (
		<div className={`bg-orange p-3 relative overflow-hidden ${className}`}>
			<div className="bg-white rounded-full w-6 h-6 absolute -top-3 -left-3" />
			<div className="bg-white rounded-full w-6 h-6 absolute -top-3 -right-3" />
			<div className="bg-white rounded-full w-6 h-6 absolute -bottom-3 -left-3" />
			<div className="bg-white rounded-full w-6 h-6 absolute -bottom-3 -right-3" />
			<div className="h-full bg-white/10 text-center text-white p-2 border-2 border-white border-dashed rounded-m flex flex-col items-center justify-center gap-1">
				{children}
			</div>
		</div>
	);
}

interface Props {
	token: DiscountToken;
	className?: string;
}
export default function DiscountTokenItem({ token, className }: Props) {
	return (
		<div
			className={`flex flex-row w-full cursor-pointer relative ${className}`}
			onClick={() => navigator.clipboard.writeText(token.id)}
		>
			<Section>
				<p dir="rtl" className="break-words">
					{getDiscountText(token)}
				</p>
			</Section>
			<Section>
				<p dir="rtl" className="font-semibold break-words">
					کد تخفیف: <span className="font-normal">{token.id}</span>
				</p>
				<p dir="rtl" className="font-semibold break-words">
					تاریخ انقضا:{" "}
					<span className="font-normal">
						{new Date(token.expirationDate).toLocaleDateString()}
					</span>
				</p>
			</Section>

			{token.isEvent && (
				<Star1
					variant="Bold"
					size={40}
					color="#ffee02"
					className="absolute top-4 right-4 -rotate-12"
				/>
			)}
		</div>
	);
}

function getDiscountText(token: DiscountToken): string {
	if (token.discount.includes("PERCENT")) {
		const percent = parseFloat(token.discount.substring(8));
		return `${percent}% تخفیف`;
	} else if (token.discount.includes("AMOUNT")) {
		const amount = parseFloat(token.discount.substring(7));
		return `${amount} تومان تخفیف`;
	}

	return "کد نامعتبر میباشد";
}
