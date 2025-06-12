import mongoose from "mongoose";
import validators from "#services/validators/MongooseValidators";

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Category name is a required field"],
			unique: true,
			trim: true,
			lowercase: true,
			minlength: [3, "Category name must be at least 3 characters"],
			maxlength: [50, "Category name cannot exceed 50 characters"],
			validate: validators.getCategoryNameValidation("Category name"),
		},
		description: {
			type: String,
			trim: true,
			maxlength: [500, "Description cannot exceed 500 characters"],
		},
		parent_category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			validate: {
				validator: validators.isValidObjectId,
				message: "Invalid parent category ID",
			},
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual for sub-categories
categorySchema.virtual("subcategories", {
	ref: "Category",
	localField: "_id",
	foreignField: "parent_category",
});

categorySchema.pre("save", async function (next) {
	if (this.parent_category) {
		const parentExists = await this.constructor.findById(this.parent_category);
		if (!parentExists) {
			return next(new Error("Parent category does not exist"));
		}
	}
	next();
});

const Category =
	mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
