import React from "react";

// Input Components
export const Input = ({ className = "", label, error, ...props }) => {
	return (
		<div className="form-control w-full">
			{label && (
				<label className="label">
					<span className="label-text text-sm font-medium text-primary">
						{label}
					</span>
				</label>
			)}
			<input
				className={`input input-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:outline-none ${
					error ? "input-error" : ""
				} ${className}`}
				{...props}
			/>
			{error && (
				<label className="label">
					<span className="label-text-alt text-error text-xs">{error}</span>
				</label>
			)}
		</div>
	);
};

export const SearchInput = ({
	className = "",
	placeholder = "Search...",
	...props
}) => {
	return (
		<div className="relative">
			<input
				className={`input input-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:outline-none pl-10 ${className}`}
				placeholder={placeholder}
				{...props}
			/>
			<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
		</div>
	);
};

export const Select = ({
	className = "",
	label,
	error,
	options = [],
	...props
}) => {
	return (
		<div className="form-control w-full">
			{label && (
				<label className="label">
					<span className="label-text text-sm font-medium text-primary">
						{label}
					</span>
				</label>
			)}
			<select
				className={`select select-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:outline-none ${
					error ? "select-error" : ""
				} ${className}`}
				{...props}
			>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error && (
				<label className="label">
					<span className="label-text-alt text-error text-xs">{error}</span>
				</label>
			)}
		</div>
	);
};

// Tab Components
export const TabContainer = ({ className = "", children, ...props }) => {
	return (
		<div
			role="tablist"
			className={`tabs tabs-boxed bg-base-200/50 p-2 rounded-2xl border border-base-300/30 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export const Tab = ({ className = "", active = false, children, ...props }) => {
	return (
		<input
			type="radio"
			role="tab"
			className={`tab font-semibold text-sm text-neutral data-[checked]:bg-primary data-[checked]:text-primary-content data-[checked]:shadow-lg  transition-all duration-300 rounded-xl ${className}`}
			{...props}
		>
			{children}
		</input>
	);
};

export const TabContent = ({ className = "", children, ...props }) => {
	return (
		<div role="tabpanel" className={`tab-content py-8 ${className}`} {...props}>
			{children}
		</div>
	);
};

// Navigation Components
export const NavLink = ({
	className = "",
	active = false,
	children,
	...props
}) => {
	return (
		<a
			className={`text-neutral hover:text-primary transition-colors duration-300 ${
				active ? "text-primary font-medium" : ""
			} ${className}`}
			{...props}
		>
			{children}
		</a>
	);
};

export const Breadcrumb = ({ className = "", items = [], ...props }) => {
	return (
		<div className={`text-sm breadcrumbs ${className}`} {...props}>
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						{item.href ? (
							<a href={item.href} className="text-neutral hover:text-primary">
								{item.label}
							</a>
						) : (
							<span className="text-primary">{item.label}</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

// Rating Component
export const StarRating = ({
	className = "",
	rating = 0,
	maxRating = 5,
	size = "sm",
	...props
}) => {
	const sizeClasses = {
		xs: "w-3 h-3",
		sm: "w-4 h-4",
		md: "w-5 h-5",
		lg: "w-6 h-6",
	};

	return (
		<div className={`flex items-center gap-1 ${className}`} {...props}>
			{[...Array(maxRating)].map((_, index) => (
				<svg
					key={index}
					className={`${sizeClasses[size]} ${
						index < rating
							? "text-warning fill-current"
							: "text-base-300 fill-current"
					}`}
					viewBox="0 0 24 24"
				>
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			))}
		</div>
	);
};
