class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.excludedFields = ['page', 'sort', 'limit', 'fields'];
    this.page = Number(queryStr.page) || 1;
    this.limit = Number(queryStr.limit) || 10;
    this.queryFilter = {};
  }

  filter() {
    // Create a deep copy of the query string
    const queryObj = { ...this.queryStr };
    
    // Remove excluded fields
    this.excludedFields.forEach((field) => delete queryObj[field]);
    
    // Store original values before processing
    const minPrice = queryObj.minPrice ? Number(queryObj.minPrice) : null;
    const maxPrice = queryObj.maxPrice ? Number(queryObj.maxPrice) : null;
    const ratingFilter = queryObj.rating ? Number(queryObj.rating) : null;
    const categoriesFilter = queryObj.categories || null;
    
    // Remove special fields we'll handle separately
    delete queryObj.minPrice;
    delete queryObj.maxPrice;
    delete queryObj.rating;
    delete queryObj.categories;
    
    // ====== 1. Build base query without special filters =======
    this.queryFilter = { ...queryObj };
    
    // ====== 2. Apply each special filter directly to the mongo query =======
    
    // Apply price range filter directly to query when needed
    if (minPrice !== null && !isNaN(minPrice)) {
      this.query = this.query.where('price').gte(minPrice);
    }
    console.log("Final MongoDB query:",minPrice);
    
    if (maxPrice !== null && !isNaN(maxPrice)) {
      this.query = this.query.where('price').lt(maxPrice);
    }
    
    // Apply rating filter directly
    if (ratingFilter !== null && !isNaN(ratingFilter) && ratingFilter !== 0) {
      this.query = this.query.where('ratings.average').gt(ratingFilter);
    }
    
    // Apply categories filter directly
    if (categoriesFilter) {
      let categoriesArray = [];
      
      if (Array.isArray(categoriesFilter)) {
        categoriesArray = categoriesFilter;
      } else if (typeof categoriesFilter === "string") {
        categoriesArray = categoriesFilter
          .split(",")
          .map((category) => category.trim())
          .filter((category) => category.length > 0);
      }
      
      if (categoriesArray.length > 0) {
        this.query = this.query.where('category').in(categoriesArray);
        this.queryFilter.category = { $in: categoriesArray };
      }
    }
    
    // ====== 3. Apply remaining regular filters =======
    // Use the base query for the rest of the fields
    this.query = this.query.find(this.queryFilter);
    
    // Update queryFilter with special filters for count query
    if (minPrice !== null && !isNaN(minPrice)) {
      if (!this.queryFilter.price) this.queryFilter.price = {};
      this.queryFilter.price.$gte = minPrice;
    }
    
    if (maxPrice !== null && !isNaN(maxPrice)) {
      if (!this.queryFilter.price) this.queryFilter.price = {};
      this.queryFilter.price.$lte = maxPrice;
    }
    
    if (ratingFilter !== null && !isNaN(ratingFilter) && ratingFilter !== 0) {
      this.queryFilter["ratings.average"] = { $gte: ratingFilter };
    }
    
    
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // Default sort by newest
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // Exclude Mongoose's __v field by default
      this.query = this.query.select('-__v');
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
}


export default ApiFeatures;
