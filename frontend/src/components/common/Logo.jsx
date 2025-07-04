import React from "react";
import { Link } from "react-router";

const Logo = ({ className }) => (
	<Link to={"/"} className={`btn btn-ghost text-xl lg:text-2xl xl:text-3xl ${className}`}>
		Anaqa
	</Link>
);

export default Logo;
