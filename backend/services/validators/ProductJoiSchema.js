import Joi from "joi";
import mongoose from "mongoose";

// Utility function to validate MongoDB ObjectId
const validateObjectId = (value, helpers) => {
	if (!mongoose.Types.ObjectId.isValid(value)) {
		return helpers.error("any.invalid");
	}
	return value;
};

const productSchema = {
	create: Joi.object({
		name: Joi.string().min(3).max(100).required().messages({
			"string.empty": "Product name is required",
			"string.min": "Product name must be at least 3 characters long",
			"string.max": "Product name cannot exceed 100 characters",
		}),
		description: Joi.string().min(10).max(1000).required().messages({
			"string.empty": "Product description is required",
			"string.min": "Description must be at least 10 characters long",
			"string.max": "Description cannot exceed 1000 characters",
		}),
		price: Joi.number().positive().required().messages({
			"number.base": "Price must be a number",
			"number.positive": "Price must be greater than 0",
			"any.required": "Price is required",
		}),
		discountedPrice: Joi.number().positive().less(Joi.ref("price")).messages({
			"number.base": "Discounted price must be a number",
			"number.positive": "Discounted price must be greater than 0",
			"number.less": "Discounted price must be less than regular price",
		}),
		stock: Joi.number().integer().min(0).required().messages({
			"number.base": "Stock must be a number",
			"number.integer": "Stock must be an integer",
			"number.min": "Stock cannot be negative",
			"any.required": "Stock is required",
		}),
		category: Joi.string()
			.custom(validateObjectId, "validate MongoDB ObjectId")
			.required()
			.messages({
				"any.required": "Category is required",
				"any.invalid": "Category must be a valid ID",
			}),
		subCategory: Joi.string()
			.custom(validateObjectId, "validate MongoDB ObjectId")
			.required()
			.messages({
				"any.required": "Sub-category is required",
				"any.invalid": "Sub-category must be a valid ID",
			}),
		sizes: Joi.array().items(Joi.string()).min(1).required().messages({
			"array.base": "Sizes must be an array",
			"array.min": "At least one size is required",
			"any.required": "Sizes are required",
		}),
		bestseller: Joi.boolean(),
		isActive: Joi.boolean(),
	}),

	update: Joi.object({
		name: Joi.string().min(3).max(100).messages({
			"string.min": "Product name must be at least 3 characters long",
			"string.max": "Product name cannot exceed 100 characters",
		}),
		description: Joi.string().min(10).max(1000).messages({
			"string.min": "Description must be at least 10 characters long",
			"string.max": "Description cannot exceed 1000 characters",
		}),
		price: Joi.number().positive().messages({
			"number.base": "Price must be a number",
			"number.positive": "Price must be greater than 0",
		}),
		discountedPrice: Joi.number().positive().less(Joi.ref("price")).messages({
			"number.base": "Discounted price must be a number",
			"number.positive": "Discounted price must be greater than 0",
			"number.less": "Discounted price must be less than regular price",
		}),
		stock: Joi.number().integer().min(0).messages({
			"number.base": "Stock must be a number",
			"number.integer": "Stock must be an integer",
			"number.min": "Stock cannot be negative",
		}),
		category: Joi.string()
			.custom(validateObjectId, "validate MongoDB ObjectId")
			.messages({
				"any.invalid": "Category must be a valid ID",
			}),
		subCategory: Joi.string()
			.custom(validateObjectId, "validate MongoDB ObjectId")
			.messages({
				"any.invalid": "Sub-category must be a valid ID",
			}),
		sizes: Joi.array().items(Joi.string()).min(1).messages({
			"array.base": "Sizes must be an array",
			"array.min": "At least one size is required",
		}),
		bestseller: Joi.boolean(),
		isActive: Joi.boolean(),
	}),

	productId: Joi.object({
		id: Joi.string()
			.custom(validateObjectId, "validate MongoDB ObjectId")
			.required()
			.messages({
				"any.required": "Product ID is required",
				"any.invalid": "Invalid product ID format",
			}),
	}),
};

export default productSchema;
