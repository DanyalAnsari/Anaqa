import React from "react";
import { useRoutes } from "react-router";
import Routes from "./app/Routes";
import { Toaster } from "react-hot-toast";

function App() {
	const routing = useRoutes(Routes);
	return (
		<div>
			<Toaster />
			{routing}
		</div>
	);
}

export default App;
