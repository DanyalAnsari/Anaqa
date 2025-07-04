import React from "react";
import Menu, { MobileMenu } from "@/components/common/Menu";
import Logo from "@/components/common/Logo";
import Search from "@/features/ui/Navbar/components/Search";
import Profile from "@/features/ui/Navbar/components/Profile";
import Cart from "@/features/ui/Navbar/components/Cart";

const Navbar = () => {
	return (
		<div className="w-full border-b border-base-200">
			<nav className="navbar bg-base-100 max-w-7xl mx-auto px-4">
				<div className="navbar-start">
					<Logo />
				</div>
				<div className="navbar-center hidden lg:flex">
					<Menu />
				</div>
				<div className="navbar-end gap-2">
					<Search />
					<Cart />
					<Profile />
					<div className="lg:hidden">
						<MobileMenu />
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
