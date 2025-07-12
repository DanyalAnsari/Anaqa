import React from "react";

const Button = ({
	className = "",
	variant = "primary",
	animated = false,
	condition,
	action,
	children,
	...props
}) => {
	const condStyle = condition
		? "btn-active shadow-lg"
		: "border-base-300 bg-base-100 text-neutral hover:border-secondary";

	action = action || (() => {});
	const buttonClass = variation[variant];
	return (
		<button
			className={`${buttonClass} ${animated ? animation : ""}  ${
				variant === "sizeBtn" && condStyle
			}  ${className}`}
			onClick={action}
			{...props}
		>
			{children}
		</button>
	);
};

const animation =
	"opacity-0 group-hover:opacity-100 transform transition-all duration-300";

const variation = {
	primary:
		"btn btn-primary btn-lg group no-animation shadow-lg hover:shadow-xl",
	secondary:
		"btn btn-outline btn-lg border-secondary text-secondary hover:bg-secondary hover:text-secondary-content hover:border-secondary",
	outline:
		"btn btn-outline btn-lg hover:bg-primary hover:text-primary-content no-animation shadow-lg hover:shadow-xl",
	small: "btn btn-outline btn-primary btn-sm hover:btn-primary",
	"number-r": "hover:bg-base-200 transition-colors rounded-r-xl",
	"number-l": "hover:bg-base-200 transition-colors rounded-l-xl",
	sizeBtn:
		"btn btn-outline btn-primary btn-lg btn-square border-2 transition-all duration-300",
	icon: "btn btn-ghost btn-md btn-circle flex items-center justify-center transition-all duration-300 hover:bg-base-200",
	link: "btn btn-link btn-sm text-secondary hover:text-primary normal-case",
};

export default Button;
