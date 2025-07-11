class ApiFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
		this.excludedFields = ["page", "sort", "limit", "fields"];
		this.page = Number(queryStr.page) || 1;
		this.limit = Number(queryStr.limit) || 10;
		this.queryFilter = {};
	}

	filter() {
		// Create a deep copy of the query string
		const queryObj = { ...this.queryStr };

		// Remove excluded fields
		this.excludedFields.forEach((field) => delete queryObj[field]);

		// Extract special filters
		const minPrice = queryObj.minPrice ? Number(queryObj.minPrice) : null;
		const maxPrice = queryObj.maxPrice ? Number(queryObj.maxPrice) : null;
		const category = queryObj.category || null;
		const subCategory = queryObj.subCategory || null;
		const featured = queryObj.featured || null;
		const bestseller = queryObj.bestseller || null;
		const sizes = queryObj.sizes || null;
		const search = queryObj.search || null;

		// Remove special fields from queryObj
		delete queryObj.minPrice;
		delete queryObj.maxPrice;
		delete queryObj.category;
		delete queryObj.subCategory;
		delete queryObj.featured;
		delete queryObj.bestseller;
		delete queryObj.sizes;
		delete queryObj.search;

		// ====== Build MongoDB query filters ======

		// Price range filter
		if (minPrice !== null && !isNaN(minPrice)) {
			this.query = this.query.where("price").gte(minPrice);
		}

		if (maxPrice !== null && !isNaN(maxPrice)) {
			this.query = this.query.where("price").lte(maxPrice);
		}

		// Category filter (exact match or array of categories)
		if (category) {
			let categoryArray = [];

			if (Array.isArray(category)) {
				categoryArray = category;
			} else if (typeof category === "string") {
				categoryArray = category
					.split(",")
					.map((cat) => cat.trim())
					.filter((cat) => cat.length > 0);
			}

			if (categoryArray.length > 0) {
				this.query = this.query.where("category").in(categoryArray);
			}
		}

		// SubCategory filter
		if (subCategory) {
			let subCategoryArray = [];

			if (Array.isArray(subCategory)) {
				subCategoryArray = subCategory;
			} else if (typeof subCategory === "string") {
				subCategoryArray = subCategory
					.split(",")
					.map((subCat) => subCat.trim())
					.filter((subCat) => subCat.length > 0);
			}

			if (subCategoryArray.length > 0) {
				this.query = this.query.where("subCategory").in(subCategoryArray);
			}
		}

		// Featured filter
		if (featured !== null) {
			const isFeatured = featured === "true" || featured === true;
			this.query = this.query.where("featured").equals(isFeatured);
		}

		// Bestseller filter
		if (bestseller !== null) {
			const isBestseller = bestseller === "true" || bestseller === true;
			this.query = this.query.where("bestseller").equals(isBestseller);
		}

		// Sizes filter (products that have any of the specified sizes)
		if (sizes) {
			let sizesArray = [];

			if (Array.isArray(sizes)) {
				sizesArray = sizes;
			} else if (typeof sizes === "string") {
				sizesArray = sizes
					.split(",")
					.map((size) => size.trim())
					.filter((size) => size.length > 0);
			}

			if (sizesArray.length > 0) {
				this.query = this.query.where("sizes").in(sizesArray);
			}
		}

		// Search filter (searches in name and description)
		if (search && search.trim().length > 0) {
			const searchRegex = new RegExp(search.trim(), "i");
			this.query = this.query.where({
				$or: [{ name: searchRegex }, { description: searchRegex }],
			});
		}

		// Apply remaining regular filters
		this.query = this.query.find(queryObj);

		return this;
	}

	sort() {
		if (this.queryStr.sort) {
			// Handle sorting: price, -price, name, -name, createdAt, -createdAt, etc.
			const sortBy = this.queryStr.sort.split(",").join(" ");
			this.query = this.query.sort(sortBy);
		} else {
			// Default sort by newest first
			this.query = this.query.sort("-createdAt");
		}
		return this;
	}

	limitFields() {
		if (this.queryStr.fields) {
			const fields = this.queryStr.fields.split(",").join(" ");
			this.query = this.query.select(fields);
		} else {
			// Exclude Mongoose's __v field by default
			this.query = this.query.select("-__v");
		}
		return this;
	}

	paginate() {
		const page = this.page;
		const limit = this.limit;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);
		return this;
	}

	// Helper method to get total count for pagination
	async getCount() {
		// Create a new query with the same filters but without pagination, sorting, and field selection
		const countQuery = this.query.model.find(this.query.getQuery());
		return await countQuery.countDocuments();
	}
}

export default ApiFeatures;
