import React from "react";
import { Link } from "react-router";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Logo from "../common/Logo";

const Footer = () => {
	return (
		<footer className="bg-base-200/50 border-t border-base-300/30">
			{/* Main Footer Content */}
			<div className="py-16 md:py-20">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
						{/* Company Info */}
						<div className="lg:col-span-2">
							<div className="mb-6">
								<Logo />
							</div>
							<p className="text-neutral leading-relaxed mb-6 max-w-md">
								We are committed to providing you with the best possible online
								shopping experience. Our team is dedicated to ensuring that your
								shopping journey is hassle-free and enjoyable.
							</p>
							
							{/* Contact Info */}
							<div className="space-y-3">
								<div className="flex items-center gap-3 text-neutral hover:text-primary transition-colors">
									<Phone className="w-4 h-4 text-primary" />
									<span className="text-sm">+91 1234567890</span>
								</div>
								<div className="flex items-center gap-3 text-neutral hover:text-primary transition-colors">
									<Mail className="w-4 h-4 text-primary" />
									<span className="text-sm">contact@gmail.com</span>
								</div>
								<div className="flex items-center gap-3 text-neutral hover:text-primary transition-colors">
									<MapPin className="w-4 h-4 text-primary" />
									<span className="text-sm">Lucknow, Uttar Pradesh, India</span>
								</div>
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<h3 className="text-lg font-semibold text-primary mb-6">Quick Links</h3>
							<ul className="space-y-3">
								{[
									{ name: "Home", path: "/" },
									{ name: "About Us", path: "/about" },
									{ name: "Shop", path: "/collection" },
									{ name: "Contact", path: "/contact" }
								].map((link) => (
									<li key={link.name}>
										<Link 
											to={link.path}
											className="text-neutral hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block transition-transform duration-300"
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Policies */}
						<div>
							<h3 className="text-lg font-semibold text-primary mb-6">Policies</h3>
							<ul className="space-y-3">
								{[
									{ name: "Privacy Policy", path: "/privacy" },
									{ name: "Terms of Service", path: "/terms" },
									{ name: "Shipping Policy", path: "/shipping" },
									{ name: "Return Policy", path: "/returns" }
								].map((link) => (
									<li key={link.name}>
										<Link 
											to={link.path}
											className="text-neutral hover:text-primary transition-colors text-sm hover:translate-x-1 inline-block transition-transform duration-300"
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Social Media */}
					<div className="mt-12 pt-8 border-t border-base-300/30">
						<div className="flex flex-col md:flex-row justify-between items-center gap-6">
							<div className="flex items-center gap-4">
								<span className="text-sm font-medium text-primary">Follow Us:</span>
								<div className="flex gap-3">
									{[
										{ icon: Facebook, label: "Facebook" },
										{ icon: Twitter, label: "Twitter" },
										{ icon: Instagram, label: "Instagram" },
										{ icon: Youtube, label: "YouTube" }
									].map(({ icon: Icon, label }) => (
										<a
											key={label}
											href="#"
											className="w-10 h-10 bg-base-100 border border-base-300/50 rounded-full flex items-center justify-center text-neutral hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-300 hover:scale-110"
											title={label}
										>
											<Icon className="w-4 h-4" />
										</a>
									))}
								</div>
							</div>
							
							{/* Newsletter CTA */}
							<div className="text-center md:text-right">
								<p className="text-sm text-neutral mb-2">
									Subscribe to get special offers & updates
								</p>
								<Link 
									to="/newsletter" 
									className="btn btn-primary btn-sm"
								>
									Subscribe Now
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="bg-base-300/20 border-t border-base-300/30">
				<div className="max-w-6xl mx-auto py-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-sm text-neutral text-center md:text-left">
							© {new Date().getFullYear()} ACME Industries Ltd. All rights reserved.
						</p>
						<div className="flex items-center gap-6 text-xs text-neutral">
							<span>Designed with ❤️ in India</span>
							<span>•</span>
							<span>Powered by React</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;