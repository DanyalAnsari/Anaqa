import constants from "@/utilities/appConstants";
import React from "react";
import { NavLinkComp } from "./Input";

const Menu = () => {
	return (
		<ul className="menu menu-horizontal px-1">
			{constants.menu.map(({ path, label }) => (
				<li key={path}>
					<NavLinkComp
						to={path}
						className="flex flex-col items-center gap-1 font-medium"
					>
						{label}
						<hr className="w-1/2 border-none h-[1.5px] bg-primary hidden" />
					</NavLinkComp>
				</li>
			))}
		</ul>
	);
};

export const MobileMenu = () => {
	return (
		<div className="dropdown dropdown-start">
			<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</div>
			<ul
				tabIndex={0}
				className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 md:w-52 p-2 shadow"
			>
				{constants.menu.map(({ path, label }) => (
					<li key={path}>
						<NavLinkComp to={path}>
							<p>{label}</p>
						</NavLinkComp>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Menu;
