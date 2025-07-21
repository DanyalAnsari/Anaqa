import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validators from "#utils/validators/MongooseValidators";
import AppError from "#utils/errors/AppError";
import {
	BadRequestException,
	InternalServerException,
	UnauthorizedException,
} from "#utils/errors/Exceptions";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter your name"],
			trim: true,
			minlength: [2, "Name must be at least 2 characters long"],
			maxlength: [50, "Name cannot exceed 50 characters"],
			validate: validators.getNameValidation("Name"),
		},
		email: {
			type: String,
			required: [true, "Please enter your email"],
			unique: true,
			trim: true,
			lowercase: true,
			validate: [validators.isEmail, "Please enter a valid email"],
		},
		password: {
			type: String,
			required: [true, "Please enter a password"],
			minlength: [8, "Password must be at least 8 characters long"],
			select: false,
		},
		role: {
			type: String,
			enum: {
				values: ["Customer", "Vendor", "Admin"],
				message: "Invalid role specified",
			},
			default: "Customer",
		},
	},
	{ minimize: false }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		this.password = await bcrypt.hash(this.password, 8);
		next();
	} catch (error) {
		next(error);
	}
});

async function comparePassword(candidatePassword) {
	if (typeof candidatePassword !== "string") {
		return false;
	}

	if (!this.password) {
		return false;
	}

	try {
		const isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch (error) {
		console.error("Password comparison error:", error);
		return false;
	}
}

userSchema.methods = { comparePassword };

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
