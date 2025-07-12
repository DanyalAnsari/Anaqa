import { Search } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router";

// Input Components
export const Input = ({ className = "", label, ...props }) => {
	return (
		<label className="floating-label">
			<input
				className={`input input-md focus:border-primary focus:outline-none ${className}`}
				{...props}
			/>
			{label && <span>{label}</span>}
		</label>
	);
};

export const SearchInput = ({ className = "", ...props }) => {
	return (
		<label
			className={`input input-md focus:border-primary focus:outline-0 ${className}`}
		>
			<span className="label">
				<Search className="w-4 h-4 text-neutral" />
			</span>
			<input type="text" {...props} />
		</label>
	);
};

export const Select = ({ className = "", label, options = [], ...props }) => {
	return (
		<label className="label">
			{label && (
				<span className="text-sm font-medium text-primary">{label}</span>
			)}
			<select
				className={`select rounded-xl 
					select-sm bg-base-100 text-neutral focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
				{...props}
			>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
				
			</select>
		</label>
	);
};

// Tab Components
export const TabContainer = ({ className = "", children, ...props }) => {
	return (
		<div
			role="tablist"
			className={`tabs tabs-box gap-1 bg-base-200/50 p-2 rounded-2xl border border-base-300/30 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export const Tab = ({ className = "", children, ...props }) => {
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
export const NavLinkComp = ({ className = "", children, ...props }) => {
	return (
		<NavLink
			className={`text-neutral hover:text-primary transition-colors duration-300 ${className}`}
			{...props}
		>
			{children}
		</NavLink>
	);
};

export const Breadcrumb = ({ className = "", items = [], ...props }) => {
	return (
		<div className={`text-sm breadcrumbs ${className}`} {...props}>
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						{item.href ? (
							<Link to={item.href} className="text-neutral hover:text-primary">
								<span className="capitalize">{item.label}</span>
							</Link>
						) : (
							<span className="text-primary capitalize">{item.label}</span>
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
	const sizes = {
		xs: "rating-xs",
		sm: "rating-sm",
		md: "rating-md",
		lg: "rating-lg",
	};

	return (
		<div className={`rating ${sizes[size]}`}>
			{[...Array(maxRating)].map((_, index) => {
				return (
					<div
						key={index}
						aria-label={`${index + 1}-star`}
						className={`mask mask-star bg-warning ${className} `}
						aria-current={`${rating === index + 1}`}
						{...props}
					></div>
				);
			})}
		</div>
	);
};

export const StarRatingInput = ({
	className = "",
	rating = 0,
	maxRating = 5,
	size = "sm",
	onChange,
	...props
}) => {
	const sizes = {
		xs: "rating-xs",
		sm: "rating-sm",
		md: "rating-md",
		lg: "rating-lg",
	};

	return (
		<div className={`rating ${sizes[size]} ${className}`}>
			{[...Array(maxRating)].map((_, index) => {
				const starValue = index + 1;
				return (
					<input
						type="radio"
						key={index}
						value={starValue}
						aria-label={`${starValue}-star`}
						className="mask mask-star bg-warning"
						checked={rating === starValue}
						onChange={onChange}
						{...props}
					/>
				);
			})}
		</div>
	);
};
