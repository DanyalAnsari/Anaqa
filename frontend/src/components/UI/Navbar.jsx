import React from "react";
import Logo from "@/components/common/Logo";
import Search from "@/features/ui/Navbar/components/Search";
import Profile from "@/features/ui/Navbar/components/Profile";
import Cart from "@/features/ui/Navbar/components/Cart";
import Menu, { MobileMenu } from "../common/Menu";

// Main Navbar Component
const Navbar = () => {
	return (
		<div className="w-full border-b border-base-200 sticky top-0 bg-base-100 z-30">
			<nav className="navbar bg-base-100 max-w-7xl mx-auto px-4">
				<div className="navbar-start md:hidden">
					<MobileMenu />
				</div>
				<div className="navbar-start">
					<Logo />
				</div>

				<div className="navbar-center hidden lg:flex">
					<Menu />
				</div>

				<div className="navbar-end gap-2">
					<div className="hidden sm:flex">
						<Search />
					</div>
					<Cart />
					<Profile />
				</div>
			</nav>

			{/* Mobile Search Bar */}
			<div className="sm:hidden px-4 py-2 border-t border-base-200">
				<Search />
			</div>
		</div>
	);
};

export default Navbar;
