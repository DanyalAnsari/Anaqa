import { User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const Profile = () => {
	const navigate = useNavigate();

	return (
		<div className="dropdown dropdown-end">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors"
				title="Account Menu"
			>
				<User className="w-5 h-5" />
			</div>
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
					<a className="hover:bg-base-200">My Orders</a>
				</li>
				<li>
					<a className="hover:bg-base-200">Wishlist</a>
				</li>
				<li>
					<a className="hover:bg-base-200">Settings</a>
				</li>

				<div className="divider my-1"></div>

				<li>
					<a
						onClick={() => navigate("/auth")}
						className="hover:bg-base-200 text-primary font-medium"
					>
						Sign In
					</a>
				</li>
				<li>
					<a className="hover:bg-base-200 text-error">Sign Out</a>
				</li>
			</ul>
		</div>
	);
};

export default Profile;
