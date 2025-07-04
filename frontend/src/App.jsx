import React from "react";
import { useRoutes } from "react-router";
import Routes from "./app/Routes";

function App() {
	const routing = useRoutes(Routes);
	return <div>{routing}</div>;
}

export default App;
