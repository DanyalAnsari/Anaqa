import React from "react";
import { Outlet } from "react-router";
import Navbar from "@/components/UI/Navbar";
import Footer from "../UI/Footer";
import NewsLetterBox from "../UI/NewsLetterBox";
import { LayoutContainer } from "./containers/Container";

const AppLayout = () => {
	return (
		<LayoutContainer>
			<Navbar />
			<main>
				<Outlet />
			</main>
			<NewsLetterBox />
		</LayoutContainer>
	);
};

export default AppLayout;
