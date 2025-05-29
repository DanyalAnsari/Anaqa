import React from "react";

const Card = ({ className, children }) => {
	return (
		<div
			className={`card card-compact border hover:border-primary transition-colors bg-base-100 hover:shadow ${className}`}
		>
			{children}
		</div>
	);
};

export const CardContent = ({ className, children }) => (
	<div className={`card-body items-center ${className}`}>
		{children}
	</div>
);
export const CardTitle = ({ className, children }) => (
	<h2 className={`card-title text-sm font-medium ${className}`}>{children}</h2>
);

export default Card;
