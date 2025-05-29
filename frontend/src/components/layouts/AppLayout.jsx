import React from "react";
import { Outlet } from "react-router";
import Navbar from "@components/UI/Navbar";
import Footer from "../UI/Footer";
import NewsLetterBox from "../UI/NewsLetterBox";

const AppLayout = () => {
	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
			<Navbar />
			<Outlet />
			<NewsLetterBox />
			<Footer />
		</div>
	);
};

export default AppLayout;
