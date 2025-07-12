export const formatProductData = (product) => {
	if (!product) return null;
	return {
		id: product._id,
		name: product.name,
		description: product.description,
		price: product.price,
		images: product.images || [],
		mainImage: product.images?.[0] || "/placeholder-product.jpg",
		category: product.category,
		subCategory: product.subCategory,
		sizes: product.sizes || [],
		bestseller: product.bestseller,
		featured: product.featured,
		createdAt: product.createdAt,
		updatedAt: product.updatedAt,
	};
};

export const buildProductQueryParams = (filters = {}) => {
	const {
		search,
		category,
		subCategory,
		minPrice,
		maxPrice,
		sizes,
		sort,
		bestseller,
		featured,
		page = 1,
		limit = 12,
		...otherFilters
	} = filters;

	const params = {
		page: Number(page),
		limit: Number(limit),
	};

	// Add search (trim whitespace)
	if (search && search.trim()) {
		params.search = search.trim();
	}

	// Add category filter (handle arrays and strings)
	if (category) {
		if (Array.isArray(category)) {
			params.category = category.join(",");
		} else {
			params.category = category;
		}
	}

	// Add subCategory filter (handle arrays and strings)
	if (subCategory) {
		if (Array.isArray(subCategory)) {
			params.subCategory = subCategory.join(",");
		} else {
			params.subCategory = subCategory;
		}
	}

	// Add price range filters (ensure they're numbers)
	if (minPrice !== undefined && minPrice !== null && minPrice !== "") {
		const min = Number(minPrice);
		if (!isNaN(min) && min >= 0) {
			params.minPrice = min;
		}
	}

	if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "") {
		const max = Number(maxPrice);
		if (!isNaN(max) && max >= 0) {
			params.maxPrice = max;
		}
	}

	// Add sizes filter (handle arrays and strings)
	if (sizes) {
		if (Array.isArray(sizes)) {
			params.sizes = sizes.join(",");
		} else {
			params.sizes = sizes;
		}
	}

	// Add sort parameter
	if (sort) {
		params.sort = sort;
	}

	// Add boolean filters (ensure proper boolean handling)
	if (bestseller !== undefined && bestseller !== null) {
		params.bestseller = bestseller ? "true" : "false";
	}

	if (featured !== undefined && featured !== null) {
		params.featured = featured ? "true" : "false";
	}

	// Add any other filters (with better validation)
	Object.entries(otherFilters).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== "") {
			// Handle arrays by joining them
			if (Array.isArray(value)) {
				params[key] = value.join(",");
			} else {
				params[key] = value;
			}
		}
	});

	return params;
};

// Helper function to build URL search params
export const buildUrlParams = (params) => {
	const urlParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined || value === null) return;

		if (Array.isArray(value)) {
			value.forEach((v) => urlParams.append(key, v));
		} else {
			urlParams.append(key, value.toString());
		}
	});

	return urlParams.toString();
};

export const getStatusIcon = (status) => {
	switch (status.toLowerCase()) {
		case "delivered":
			return "✓";
		case "shipped":
			return "🚚";
		case "processing":
		case "pending":
			return "⏳";
		case "cancelled":
			return "❌";
		default:
			return "📦";
	}
};

export const getStatusColor = (status) => {
	switch (status.toLowerCase()) {
		case "delivered":
			return "success";
		case "shipped":
			return "info";
		case "processing":
		case "pending":
			return "warning";
		case "cancelled":
			return "error";
		default:
			return "neutral";
	}
};
