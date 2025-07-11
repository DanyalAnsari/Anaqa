import validators from "#utils/validators/MongooseValidators";
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User ID is required"],
			validate: {
				validator: validators.isValidObjectId,
				message: "Invalid user ID format",
			},
		},
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: [true, "Product ID is required"],
					validate: {
						validator: validators.isValidObjectId,
						message: "Invalid product ID format",
					},
				},
				size: {
					type: String,
					required: [true, "Size is required"],
					trim: true,
				},
				quantity: {
					type: Number,
					required: [true, "Quantity is required"],
					min: [1, "Quantity must be at least 1"],
					validate: {
						validator: validators.isPositiveNumber,
						message: "Quantity must be greater than 0",
					},
				},
				price: {
					type: Number,
					required: [true, "Price is required"],
					validate: {
						validator: validators.isPositiveNumber,
						message: "Price must be greater than 0",
					},
				},
				name: {
					type: String,
					required: [true, "Product name is required"],
					trim: true,
				},
				image: {
					type: String,
					validate: {
						validator: validators.isValidURL,
						message: "Please provide valid image URL",
					},
				},
			},
		],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
	}
);

// Virtual for total cart value
CartSchema.virtual("totalValue").get(function () {
	return this.items.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
});

CartSchema.virtual("totalProducts").get(function () {
	return this.items.reduce(
		(total, item) => total + item.quantity,
		0
	);
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
