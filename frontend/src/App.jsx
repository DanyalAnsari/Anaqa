import React, { useEffect } from "react";
import { useLocation, useRoutes } from "react-router";
import Routes from "./app/Routes";
import { Toaster } from "react-hot-toast";
import Footer from "./components/UI/Footer";

function App() {
	const routing = useRoutes(Routes);
	const pathname = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return (
		<div>
			<Toaster />
			{routing}
			<Footer />
		</div>
	);
}

export default App;
