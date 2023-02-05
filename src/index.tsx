import { ContextProvider } from "MainContext";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./styles/tailwind.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<ContextProvider>
		<App />
	</ContextProvider>
	// </React.StrictMode>
);
