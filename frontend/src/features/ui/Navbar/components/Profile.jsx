import { useAuth } from "@/app/hooks/useAuth";
import Button from "@/components/common/Buttons";
import { NavLinkComp } from "@/components/common/Input";
import { Avatar } from "@/components/common/typography/Badge";
import { User } from "lucide-react";
import React from "react";

const Profile = () => {
	const { isAuthenticated, user, handleLogout } = useAuth();

	return (
		<div className="dropdown dropdown-end dropdown-bottom">
			<Button
				tabIndex={0}
				role="button"
				variant="icon"
				className="shadow-2xs"
				title="Account Menu"
			>
				{isAuthenticated ? (
					<Avatar>{user.name.charAt(0)}</Avatar>
				) : (
					<User className="w-5 h-5" />
				)}
			</Button>
			<ul
				tabIndex={0}
				className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-2 shadow-lg border border-base-200"
			>
				<li className="menu-title">
					<span>Account</span>
				</li>
				<li>
					<a className="flex justify-between items-center hover:bg-base-200">
						<span>Profile</span>
						<span className="badge badge-secondary badge-xs">New</span>
					</a>
				</li>
				<li>
					<NavLinkComp to={"/orders"} className="hover:bg-base-200">
						My Orders
					</NavLinkComp>
				</li>

				<li>
					<a className="hover:bg-base-200">Wishlist</a>
				</li>
				<li>
					<a className="hover:bg-base-200">Settings</a>
				</li>

				<div className="divider my-1"></div>
				{isAuthenticated ? (
					<li className="hover:bg-base-200 text-error" onClick={handleLogout}>
						<a>Sign Out</a>
					</li>
				) : (
					<li>
						<NavLinkComp to={"/auth"} className="hover:bg-base-200">
							Sign In
						</NavLinkComp>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Profile;
