import React from "react";
import Menu, { MobileMenu } from "@components/common/Menu";
import Logo from "@components/common/Logo";
import { Search, ShoppingCart, User } from "lucide-react";

const Navbar = () => {
	return (
		<nav className="navbar bg-base-100">
			<div className="navbar-start">
				<Logo />
			</div>
			<div className="navbar-center hidden lg:flex">
				<Menu />
			</div>
			<div className="navbar-end">
				<SearchButton />
				<ProfileButton />
				<CartButton />
				<MobileMenu />
			</div>
		</nav>
	);
};

const CartButton = () => {
	return (
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
				<div className="indicator">
					<ShoppingCart />
					<span className="badge badge-sm indicator-item">8</span>
				</div>
			</div>
			<div
				tabIndex={0}
				className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
			>
				<div className="card-body">
					<span className="text-lg font-bold">8 Items</span>
					<span className="text-info">Subtotal: $999</span>
					<div className="card-actions">
						<button className="btn btn-primary btn-block">View cart</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const SearchButton = () => {
	return (
		<div className="dropdown dropdown-end">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-circle avatar"
			>
				<Search />
			</div>
			<ul
				tabIndex={0}
				className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
			></ul>
		</div>
	);
};

const ProfileButton = () => {
	return (
		<div className="dropdown dropdown-end">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-circle avatar"
			>
				<User />
			</div>
			<ul
				tabIndex={0}
				className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
			>
				<li>
					<a className="justify-between">
						Profile
						<span className="badge">New</span>
					</a>
				</li>
				<li>
					<a>Settings</a>
				</li>
				<li>
					<a>Logout</a>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
