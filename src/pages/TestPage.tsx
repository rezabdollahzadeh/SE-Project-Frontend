import axios from "axios";
import AboutDeveloper from "components/AboutDeveloper";
import Alert from "components/Alert";
import CheckBox from "components/CheckBox";
import CollapsiblePanel from "components/CollapsiblePanel";
import CollapsiblePanel2 from "components/CollapsiblePanel2";
import ComboBox from "components/ComboBox";
import DiscountTokenItem from "components/DiscountTokenItem";
import Footer from "components/Footer";
import Header from "components/Header";
import InputField from "components/InputField";
import Loading from "components/Loading";
import PageController from "components/PageController";
import ProductItem from "components/ProductItem";
import RadioSection from "components/RadioSection";
import SearchField from "components/SearchField";
import SellerItem from "components/SellerItem";
import Toggle from "components/Toggle";
import { Login, Profile, ShoppingCart } from "iconsax-react";
import { MainContext } from "MainContext";
import { useContext, useState } from "react";
import Button from "../components/Button";
import TestSection from "../components/TestSection";

export default function TestPage() {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(5);
	const ctx = useContext(MainContext);

	return (
		<div className="w-full flex min-h-screen items-center gap-4 flex-col py-10">
			<TestSection>
				<DiscountTokenItem
					token={{
						id: "sample id",
						discount: "AMOUNT_100000",
						expirationDate: "2023-01-06T21:41:34.161",
						isEvent: false,
					}}
				/>
			</TestSection>
			<TestSection>
				<SellerItem
					seller={{
						id: "d2422126-10f8-44ed-aabd-64d96ffc89fe",
						name: "customer207777843",
						image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
						information: "Seller information",
						address: "Tabriz ...",
						likes: 15,
						dislikes: 10,
						restricted: true,
					}}
				/>

				<SellerItem
					seller={{
						id: "d2422126-10f8-44ed-aabd-64d96ffc89fe",
						name: "customer207777843",
						information: "Seller information",
						address: "Tabriz ...",
					}}
				/>
			</TestSection>
			<Alert
				text="این یک متن تست است این یک متن تست است این یک متن تست است این یک متن تست است  "
				status="ConnectionLoss"
			/>
			<TestSection>
				<PageController
					pagination={{
						page: page,
						totalPages: 10,
						perPage: 50,
						data: [],
					}}
					setPage={setPage}
				/>
			</TestSection>
			<TestSection>
				<RadioSection
					name="SampleRadio"
					options={[
						{
							label: "Option 1",
							value: "Option 1",
						},
						{
							label: "Option 2",
							value: "Option 2",
						},
						{
							label: "Option 3",
							value: "Option 3",
						},
					]}
					onSelect={(val: string) => {
						console.log(val);
					}}
				/>
			</TestSection>

			<TestSection>
				<AboutDeveloper
					name="محمد مهدی حجازی"
					role="مدیر پروژه"
					team="Manager"
				/>
			</TestSection>

			<TestSection>
				<Button
					text="ورود / ثبت نام"
					onClick={() => {
						axios
							.get("https://localhost:5000/profile/", {
								withCredentials: true,
							})
							.then((res) => {
								console.log(res);
								console.log(res.data);
							})
							.catch((err) => {
								console.log(err);
							});
					}}
					icon={<Login />}
					color="black"
				/>

				<Button
					text="ورود / ثبت نام"
					onClick={() => {
						ctx.showAlert({
							text: "sample Alert",
							status: "Question",
							onAccept() {
								console.log("Accepted");
							},
							onReject() {
								console.log("Rejected");
							},
						});
					}}
					icon={<Login />}
					filled
				/>

				<Button
					text="ورود / ثبت نام"
					onClick={() => {}}
					icon={<Login />}
				/>

				<Button
					text="ورود / ثبت نام"
					onClick={() => {}}
					icon={<Login />}
					color="red"
				/>

				<Button
					text="سبد خرید"
					onClick={() => {}}
					icon={<ShoppingCart />}
					notification={0}
					color="black"
					accent="blue"
				/>

				<Button
					text="سبد خرید"
					onClick={() => {}}
					icon={<ShoppingCart />}
					notification={1}
					filled
					color="cyan"
				/>

				<Button
					text="ورود / ثبت نام"
					onClick={() => {}}
					icon={<Login />}
					disabled
				/>
			</TestSection>
			<TestSection>
				<CheckBox text="این یک متن تست است" />
				<CheckBox text="این یک متن تست است" initial />
				<CheckBox text="این یک متن تست است" disabled />
			</TestSection>

			<TestSection>
				<Toggle text="این یک متن تست است" />
				<Toggle text="این یک متن تست است" initial />
				<Toggle text="این یک متن تست است" disabled />
			</TestSection>

			<TestSection>
				<InputField
					name="نام فیلد"
					placeholder="لطفا فیلد مورد نظر را وارد نمایید"
					icon={<Profile size={20} variant="Bold" />}
				/>

				<InputField
					name="نام فیلد"
					placeholder="لطفا فیلد مورد نظر را وارد نمایید"
				/>

				<InputField
					name="نام فیلد"
					placeholder="لطفا فیلد مورد نظر را وارد نمایید"
					icon={<Profile size={20} variant="Bold" />}
					disabled
				/>

				<SearchField text={search} setText={setSearch} />
			</TestSection>

			<TestSection>
				<CollapsiblePanel text="لطفا دسته بندی مورد نظر را انتخاب کنید">
					<CheckBox initial text="آیتم یک" />
					<CheckBox initial text="آیتم دو" />
					<CheckBox initial text="آیتم سه" />
					<CheckBox initial text="آیتم چهار" />
				</CollapsiblePanel>
				<CollapsiblePanel
					text="لطفا دسته بندی مورد نظر را انتخاب کنید"
					disabled
				>
					<CheckBox initial text="آیتم یک" />
					<CheckBox initial text="آیتم دو" />
					<CheckBox initial text="آیتم سه" />
					<CheckBox initial text="آیتم چهار" />
				</CollapsiblePanel>

				<CollapsiblePanel2 text=" دسته بندی مورد نظر را انتخاب کنید">
					<p>حواب</p>
				</CollapsiblePanel2>
			</TestSection>

			<Header />
			<Footer />

			<TestSection>
				<ProductItem
					product={{
						id: "sample",
						name: "گوشی شیائومی نوت 11",
						category: "Digital",
						image: "https://www.technolife.ir/image/color_image_TLP-3554_a7dae8_ca79bb9c-a389-45df-a811-6fedaf224c2e.png",
						description: "Yek gooshi khoob",
						likes: 10,
						dislikes: 5,
					}}
				/>
			</TestSection>

			<TestSection>
				<Loading />
				<Loading size={5} />
			</TestSection>

			<TestSection>
				<ComboBox
					name="Sample Combo"
					options={["sample1", "sample2"]}
					placeholder="please select"
					setSelected={(val: string) => {
						console.log(val);
					}}
				/>

				<ComboBox
					name="Sample Combo"
					options={["sample1", "sample2"]}
					placeholder="please select"
					setSelected={(val: string) => {
						console.log(val);
					}}
					disabled
				/>
			</TestSection>
		</div>
	);
}
