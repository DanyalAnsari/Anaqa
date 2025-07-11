import validators from "#utils/validators/MongooseValidators";
import mongoose from "mongoose";

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
			type: String,
			required: [true, "category is required"],
		},
		subCategory: {
			type: String,
			required: [true, "subCategory is required"],
		},
		sizes: {
			type: Array,
			required: [true, "Please select product sizes."],
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
	},
	{
		timestamps: true,
	}
);


const Product =
	mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
