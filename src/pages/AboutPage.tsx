import AboutDeveloper from "components/AboutDeveloper";
import PageNavigator from "components/PageNavigator";
import Xarrow from "react-xarrows";

export default function AboutPage() {
	return (
		<>
			<PageNavigator
				text="درباره ما"
				bottomText="اعضای تیم پروژه سون شاپ"
			/>

			<div className="flex flex-col px-5 pb-12 gap-20">
				<div className="flex justify-around">
					<AboutDeveloper
						name="محمد مهدی حجازی"
						role="مدیر پروژه"
						team="Manager"
						id="Manager"
					/>
				</div>

				<div className="flex justify-around">
					<AboutDeveloper
						name="محمد مهدی حجازی"
						role="برنامه نویس فرانت اند"
						team="Frontend"
						id="FrontHead"
					/>

					<AboutDeveloper
						name="عرفان زادسلطانی"
						role="برنامه نویس بک اند"
						team="Backend"
						id="BackHead"
					/>
				</div>

				<div className="flex justify-around">
					<AboutDeveloper
						name="هادی سلیمانی"
						role="طراح رابط کاربری"
						team="Frontend"
						id="Designer"
					/>
					<AboutDeveloper
						name="محمدرضا عبدالله زاده"
						role="برنامه نویس فرانت اند"
						team="Frontend"
						id="Front"
					/>

					<AboutDeveloper
						name="مهسا فرامرزی"
						role="برنامه نویس بک اند"
						team="Backend"
						id="Back1"
					/>
					<AboutDeveloper
						name="امیر کریمی نژاد"
						role="برنامه نویس بک اند"
						team="Backend"
						id="Back2"
					/>
				</div>

				{/* Manager Arrows */}

				<Xarrow
					start="Manager"
					end="FrontHead"
					startAnchor="bottom"
					endAnchor="top"
					color="gray"
					strokeWidth={3}
				/>

				<Xarrow
					start="Manager"
					end="BackHead"
					startAnchor="bottom"
					endAnchor="top"
					color="gray"
					strokeWidth={3}
				/>

				{/* Frontend Arrows */}

				<Xarrow
					start="FrontHead"
					end="Designer"
					startAnchor="bottom"
					endAnchor="top"
					color="gray"
					strokeWidth={3}
				/>

				<Xarrow
					start="FrontHead"
					end="Front"
					startAnchor="bottom"
					endAnchor="top"
					color="gray"
					strokeWidth={3}
				/>

				{/* Backend Arrows */}

				<Xarrow
					start="BackHead"
					end="Back1"
					startAnchor="bottom"
					endAnchor="top"
					color="gray"
					strokeWidth={3}
				/>

				<Xarrow
					start="BackHead"
					end="Back2"
					startAnchor="bottom"
					endAnchor="top"
					color="gray"
					strokeWidth={3}
				/>
			</div>
		</>
	);
}
