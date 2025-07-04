import {
	HoverIconContainer,
	IconBaseContainer,
} from "@/components/layouts/containers/Container";
import React from "react";
import { H6 } from "./Headings";
import { TextBody } from "./Text";

// Loading Components
export const LoadingSpinner = ({ className = "", size = "lg", ...props }) => {
	const sizeClasses = {
		sm: "loading-sm",
		md: "loading-md",
		lg: "loading-lg",
	};

	return (
		<div
			className={`loading loading-spinner text-primary ${sizeClasses[size]} ${className}`}
			{...props}
		/>
	);
};

export const LoadingButton = ({
	className = "",
	loading = false,
	children,
	...props
}) => {
	return (
		<button
			className={`btn btn-primary btn-lg group border-0 shadow-lg hover:shadow-xl ${className}`}
			disabled={loading}
			{...props}
		>
			{loading ? (
				<>
					<LoadingSpinner size="sm" />
					<span className="ml-2">Loading...</span>
				</>
			) : (
				children
			)}
		</button>
	);
};

export const MessageBox = ({
	style = "info",
	message = "",
	description = "",
	children,
}) => {
	const styles = {
		info: "bg-info/10 border-info/20",
		error: "bg-error/10 border-error/20",
	};

	return (
		<div className="w-full py-12 max-w-md mx-auto">
			<HoverIconContainer className={`p-6 border ${styles[style]}`}>
				<IconBaseContainer
					className={`w-16 h-16 mb-4 bg-base-100 border-base-300/50`}
				>
					<span className="text-2xl">{children}</span>
				</IconBaseContainer>
				<H6 className="font-semibold text-primary mb-2">{message}</H6>
				<TextBody className="text-neutral text-sm">{description}</TextBody>
			</HoverIconContainer>
		</div>
	);
};
