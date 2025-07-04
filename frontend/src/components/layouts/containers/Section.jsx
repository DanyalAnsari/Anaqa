import React from "react";

const Section = ({ className, variant, children }) => {
	const sectionClass = sectionVariant[variant] || sectionVariant.medium;
	return (
		<section className={`${sectionClass} ${className}`}>{children}</section>
	);
};

const sectionVariant = {
	large: "py-20",
	medium: "py-16",
	small: "py-12",
};

export default Section;
