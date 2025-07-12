import React from "react";

const Badge = ({ className, children }) => {
	return <span className={`badge font-medium text-sm ${className}`}>{children}</span>;
};

export default Badge;
