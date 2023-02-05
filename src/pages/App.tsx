import Alert from "components/Alert";
import { MainContext } from "MainContext";
import { useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes/Routes";

function App() {
	const ctx = useContext(MainContext);

	useEffect(() => {
		ctx.syncProfile();

		setInterval(() => {
			ctx.syncProfile();
		}, 60 * 1000);
	}, []);

	useEffect(() => {
		document.body.style.overflowY = ctx.alert ? "hidden" : "scroll";
	}, [ctx.alert]);

	return (
		<>
			<RouterProvider router={router} />

			<div
				className={`w-screen h-screen fixed top-0 left-0 z-50 bg-black/25 flex justify-center items-center ease-in-out duration-300 ${
					ctx.alert ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
			>
				{ctx.alert !== undefined && (
					<Alert
						text={ctx.alert.text}
						status={ctx.alert.status}
						onAccept={ctx.alert.onAccept}
						onReject={ctx.alert.onReject}
					/>
				)}
			</div>
		</>
	);
}

export default App;
