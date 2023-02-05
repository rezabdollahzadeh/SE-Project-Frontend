import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Pagination from "model/Pagination";

interface IndicatorProps {
	page: number;
	setPage: (page: number) => void;
}
function PageIndicator({ page, setPage }: IndicatorProps) {
	return (
		<p
			className="bg-blue/90 px-3 py-2 rounded-lg text-white cursor-pointer"
			onClick={() => setPage(page)}
		>
			{page}
		</p>
	);
}

interface Props {
	pagination: Pagination<any>;
	setPage: (page: number) => void;
}
export default function PageController({ pagination, setPage }: Props) {
	const setAndNavigatePage = (page: number) => {
		window.scrollTo(0, 240);
		setPage(page);
	};

	return (
		<div className="w-full justify-center flex gap-1 items-center font-semibold">
			{pagination.page < pagination.totalPages && (
				<div
					className="cursor-pointer"
					onClick={() => setAndNavigatePage(pagination.page + 1)}
				>
					<ArrowLeft2 color="#2388ff" />
				</div>
			)}

			{pagination.page <= pagination.totalPages - 2 && (
				<PageIndicator
					page={pagination.totalPages}
					setPage={setAndNavigatePage}
				/>
			)}

			{pagination.page <= pagination.totalPages - 3 && (
				<p className="px-2">...</p>
			)}

			{pagination.page <= pagination.totalPages - 1 && (
				<PageIndicator
					page={pagination.page + 1}
					setPage={setAndNavigatePage}
				/>
			)}

			<p className="bg-red/90 px-3 py-2 rounded-lg text-white cursor-pointer">
				{pagination.page}
			</p>

			{pagination.page >= 2 && (
				<PageIndicator page={pagination.page - 1} setPage={setPage} />
			)}

			{pagination.page >= 4 && <p className="px-2">...</p>}

			{pagination.page >= 3 && (
				<PageIndicator page={1} setPage={setAndNavigatePage} />
			)}

			{pagination.page > 1 && (
				<div
					className="cursor-pointer"
					onClick={() => setAndNavigatePage(pagination.page - 1)}
				>
					<ArrowRight2 color="#2388ff" />
				</div>
			)}
		</div>
	);
}
