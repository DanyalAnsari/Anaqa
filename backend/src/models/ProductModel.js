import validators from "#services/validators/MongooseValidators";
import mongoose from "mongoose";
import Category from "#models/CategoryModel";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter the product name."],
			trim: true,
			minlength: [3, "Product name must be at least 3 characters"],
			maxlength: [100, "Product name cannot exceed 100 characters"],
			validate: validators.getProductNameValidation("Product name"),
		},
		description: {
			type: String,
			required: [true, "Please enter product description."],
			trim: true,
			minlength: [10, "Description must be at least 10 characters"],
			maxlength: [1000, "Description cannot exceed 1000 characters"],
		},
		price: {
			type: Number,
			required: [true, "Provide product price."],
			validate: {
				validator: validators.isPositiveNumber,
				message: "Price must be greater than 0",
			},
		},
		discountedPrice: {
			type: Number,
		},
		stock: {
			type: Number,
			required: [true, "Provide product stock in numbers."],
			validate: {
				validator: validators.isNonNegativeInteger,
				message: "Stock must be a non-negative integer",
			},
		},
		images: [
			{
				type: String,
				validate: {
					validator: validators.isValidURL,
					message: "Please provide valid image URL",
				},
			},
		],
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: [true, "Please select a category."],
			validate: {
				validator: validators.isValidObjectId,
				message: "Invalid category ID format",
			},
		},
		subCategory: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: [true, "Please select a Sub-Category."],
			validate: {
				validator: validators.isValidObjectId,
				message: "Invalid sub-category ID format",
			},
		},
		sizes: {
			type: Array,
			required: [true, "]Please select product sizes."],
			validate: {
				validator: (value) => {
					return Array.isArray(value) && value.length > 0;
				},
				message: "Sizes must be an array with at least one size",
			},
		},
		featured: {
			type: Boolean,
			default: false,
		},
		bestseller: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		ratings: {
			average: {
				type: Number,
				default: 0,
				min: [0, "Rating cannot be less than 0"],
				max: [5, "Rating cannot exceed 5"],
			},
			count: {
				type: Number,
				default: 0,
			},
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

productSchema.virtual("inStock").get(function () {
	return this.stock > 0;
});

productSchema.statics.updateRating = async function (productId, rating) {
	const stats = await this.aggregate([
		{ $match: { _id: productId } },
		{
			$set: {
				"ratings.average": { $avg: "$ratings" },
				"ratings.count": { $sum: 1 },
			},
		},
	]);

	await this.findByIdAndUpdate(productId, {
		"ratings.average": stats[0]?.ratings.average || 0,
		"ratings.count": stats[0]?.ratings.count || 0,
	});
};

const Product =mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
