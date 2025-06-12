import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validators from "#services/validators/MongooseValidators";

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
			index: true,
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
				values: ["Customer", "Vendor", "Admin", "Superadmin"],
				message: "Invalid role specified",
			},
			default: "Customer",
		},
		cartData: {
			type: Object,
			default: {},
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

UserSchema.methods = {
	// Create password reset token
	createResetPasswordToken() {
		const resetToken = crypto.randomBytes(32).toString("hex");

		this.password_reset_token = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");

		this.password_reset_token_expires = Date.now() + 10 * 60 * 1000; // 10 minutes

		return resetToken;
	},

	// Compare password for login
	async comparePassword(candidatePassword) {
		return await bcrypt.compare(candidatePassword, this.password);
	},

	// Check if password was changed after JWT was issued
	async isPasswordChanged(JWTTimestamp) {
		if (!this.updatedAt) return false;

		const passwordChangeTime = parseInt(this.updatedAt.getTime() / 1000, 10);
		return passwordChangeTime > JWTTimestamp;
	},
};

const User = mongoose.model("User", userSchema);

export default User;
