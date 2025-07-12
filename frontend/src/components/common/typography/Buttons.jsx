import React from "react";

export const CTAButton = ({ className = "", children, icon, ...props }) => {
	return (
		<button
			className={`btn btn-primary btn-lg group border-0 shadow-lg hover:shadow-xl hover:translate-x-1 transition-transform ${className}`}
			{...props}
		>
			{children}
			{icon && (
				<span className="ml-2 transition-transform group-hover:translate-x-1">
					{icon}
				</span>
			)}
		</button>
	);
};
