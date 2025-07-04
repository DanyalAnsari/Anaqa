import React from "react";

const GradientBackground = ({
	className = "",
	type = "hero",
	children,
	...props
}) => {
	const gradientClasses = {
		hero: "bg-gradient-to-br from-base-100 via-base-200 to-base-300",
		subtle: "bg-gradient-to-b from-base-200/30 to-base-100",
		section: "bg-gradient-to-b from-base-100 to-base-200/50",
		card: "bg-gradient-to-br from-info/5 to-info/10",
	};

	return (
		<div className={`${gradientClasses[type]} ${className}`} {...props}>
			{children}
		</div>
	);
};

export default GradientBackground;
