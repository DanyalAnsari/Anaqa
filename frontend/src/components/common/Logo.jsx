import { assets } from "@/assets/assets";
import React from "react";
import { Link } from "react-router";

const Logo = ({ className }) => (
	<Link to={"/"}>
		<img src={assets.logo} className={`w-24 lg:w-32 ${className}`} alt="logo" />
	</Link>
);

export default Logo;
