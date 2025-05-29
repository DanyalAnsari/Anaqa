import React from "react";
import Logo from "../common/Logo";

const Footer = () => {
	return (
		<footer className="flex flex-col justify-center items-center border-t border-secondary">
			<div className="footer sm:footer-horizontal grid-cols-[3fr_1fr_1fr] bg-base-100 text-base-content p-10">
				<aside className="w-full">
					<Logo />
					<p className="w-full md:w-2/3 text-gray-600">
						We are committed to providing you with the best possible online
						shopping experience. Our team is dedicated to ensuring that your
						shopping journey is hassle-free and enjoyable. If you have any
						questions or concerns, please don't hesitate to contact us.
					</p>
				</aside>

				<nav>
					<p className="text-xl font-medium mb-5">COMPANY</p>
					<ul className="flex flex-col gap-1 text-gray-600">
						<li>Home</li>
						<li>About</li>
						<li>Delivery</li>
						<li>Privacy Policy</li>
					</ul>
				</nav>

				<nav>
					<p className="text-xl font-medium mb-5">GET IN TOUCH</p>
					<ul className="flex flex-col gap-1 text-gray-600">
						<li>+91 1234567890</li>
						<li>contact@gmail.com</li>
					</ul>
				</nav>
			</div>
			<div className="divider"></div>
			<div className="footer sm:footer-horizontal footer-center bg-base-100 text-base-content">
				<aside>
					<p>
						Copyright © {new Date().getFullYear()} - All right reserved by ACME
						Industries Ltd
					</p>
				</aside>
			</div>
		</footer>
	);
};

export default Footer;
