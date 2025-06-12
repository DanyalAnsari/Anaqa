import mongoose from "mongoose";
import validators from "#services/validators/MongooseValidators"; 

// Order Item Schema
const OrderItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: [true, "Product reference is required"],
		validate: {
			validator: validators.isValidObjectId,
			message: "Invalid product ID format",
		},
	},
	quantity: {
		type: Number,
		required: [true, "Quantity is required"],
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
		minlength: [3, "Product name must be at least 3 characters"],
		maxlength: [100, "Product name cannot exceed 100 characters"],
	},
});

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User reference is required"],
			validate: {
				validator: validators.isValidObjectId,
				message: "Invalid user ID format",
			},
		},
		items: {
			type: [OrderItemSchema],
			required: [true, "Order must contain at least one item"],
			validate: {
				validator: (items) => items.length > 0,
				message: "Order must contain at least one item",
			},
		},
		totalAmount: {
			type: Number,
			required: [true, "Total amount is required"],
			validate: {
				validator: validators.isPositiveNumber,
				message: "Total amount must be greater than 0",
			},
		},
		shippingAddress: {
			street: {
				type: String,
				required: [true, "Street address is required"],
				trim: true,
				maxlength: [100, "Street address cannot exceed 100 characters"],
			},
			city: {
				type: String,
				required: [true, "City is required"],
				trim: true,
				validate: validators.getNameValidation("City"),
			},
			state: {
				type: String,
				required: [true, "State is required"],
				trim: true,
				validate: validators.getNameValidation("State"),
			},
			zipCode: {
				type: String,
				required: [true, "ZIP code is required"],
				validate: {
					validator: validators.isZipCode,
					message: "Invalid ZIP code format",
				},
			},
			country: {
				type: String,
				required: [true, "Country is required"],
				trim: true,
				validate: validators.getNameValidation("Country"),
			},
		},
		status: {
			type: String,
			enum: {
				values: ["Pending", "Processing", "Shipped", "Delivered", "Canceled"],
				message: "Invalid order status",
			},
			default: "Pending",
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		payment: {
			type: Boolean,
			required: true,
			default: false,
		},
		isDelivered: {
			type: Boolean,
			default: false,
		},
		deliveredAt: {
			type: Date,
			validate: {
				validator: function (value) {
					return !value || value <= new Date();
				},
				message: "Delivery date cannot be in the future",
			},
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

orderSchema.pre("save", function (next) {
	if (this.isDelivered && !this.deliveredAt) {
		this.deliveredAt = new Date();
	}
	next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
