import { useGetApi } from "hooks/useApi";
import Cart from "model/Cart";
import { DataOrError } from "model/DataOrError";
import { createContext, useEffect, useState } from "react";
import { AlertInterface } from "utils";
import User from "./model/User";

interface Context {
	loggedIn: boolean | undefined;
	profile: DataOrError<User>;
	currentCart: DataOrError<Cart>;
	alert: AlertInterface | undefined;
	showAlert: (alert: AlertInterface) => void;
	syncProfile: () => void;
	syncCart: () => void;
}

export const MainContext = createContext<Context>({
	loggedIn: undefined,
	profile: { loading: true },
	currentCart: { loading: true },
	alert: undefined,
	showAlert: () => {},
	syncProfile: () => {},
	syncCart: () => {},
});

export const ContextProvider = ({
	children,
}: {
	children: JSX.Element[] | JSX.Element;
}) => {
	const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);

	const [profile, syncProfile] = useGetApi<User>(
		"https://localhost:5000/profile/",
		(res) => {
			setLoggedIn(true);

			if (res.accessLevel === "customer") syncCart();
		},
		() => setLoggedIn(false)
	);

	const [currentCart, syncCart] = useGetApi<Cart>(
		"https://localhost:5000/profile/carts/current"
	);

	const [alert, setAlert] = useState<AlertInterface | undefined>(undefined);

	const showAlert = (alert: AlertInterface) => {
		setAlert({
			status: alert.status,
			text: alert.text,
			onAccept: () => {
				alert.onAccept && alert.onAccept();
				setAlert(undefined);
				setAlert(undefined);
			},
			onReject: () => {
				alert.onReject && alert.onReject();
				setAlert(undefined);
			},
		});
	};

	useEffect(() => {}, []);

	const ctx = {
		loggedIn,
		profile,
		currentCart,
		alert,
		showAlert,
		syncProfile,
		syncCart,
	};

	return <MainContext.Provider value={ctx}>{children}</MainContext.Provider>;
};
