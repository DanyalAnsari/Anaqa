import mongoose from "mongoose";
import validators from "#utils/validators/MongooseValidators";

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User reference is required"],
			validate: {
				validator: validators.isValidObjectId,
				message: "Invalid user ID format",
			},
		},
		products: {
			type: Array,
			required: true,
		},
		amount: {
			type: Number,
			required: [true, "Total amount is required"],
			validate: {
				validator: validators.isPositiveNumber,
				message: "Total amount must be greater than 0",
			},
		},
		address: {
			type: {
				firstName: {
					type: String,
					required: [true, "First name is required"],
					trim: true,
					minlength: [2, "First name must be at least 2 characters"],
					maxlength: [50, "First name cannot exceed 50 characters"],
				},
				lastName: {
					type: String,
					required: [true, "Last name is required"],
					trim: true,
					minlength: [2, "Last name must be at least 2 characters"],
					maxlength: [50, "Last name cannot exceed 50 characters"],
				},
				email: {
					type: String,
					required: [true, "Email is required"],
					validate: {
						validator: validators.isEmail,
						message: "Please provide a valid email",
					},
				},
				street: {
					type: String,
					required: [true, "Street address is required"],
					trim: true,
					minlength: [5, "Street address must be at least 5 characters"],
					maxlength: [100, "Street address cannot exceed 100 characters"],
				},
				city: {
					type: String,
					required: [true, "City is required"],
					trim: true,
					minlength: [2, "City must be at least 2 characters"],
					maxlength: [50, "City cannot exceed 50 characters"],
				},
				state: {
					type: String,
					required: [true, "State is required"],
					trim: true,
				},
				zipcode: {
					type: String,
					required: [true, "Zip code is required"],
					validate: {
						validator: validators.isZipCode,
						message: "Please provide a valid zip code",
					},
				},
				country: {
					type: String,
					required: [true, "Country is required"],
					trim: true,
				},
				phone: {
					type: String,
					required: [true, "Phone number is required"],
					validate: {
						validator: validators.isPhone,
						message: "Please provide a valid phone number",
					},
				},
			},
			required: [true, "Address is required"],
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
			enum: ["Stripe", "Cash on Delivery"],
			default: "Cash on Delivery",
		},
		payment: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

orderSchema.pre("save", function (next) {
	if (this.status === "Delivered" && !this.deliveredAt) {
		this.deliveredAt = new Date();
	}
	next();
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
