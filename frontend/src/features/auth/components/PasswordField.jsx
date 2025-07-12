import React, { useCallback, useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordField = ({ register, errors }) => {
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = useCallback(() => {
		setShowPassword((prev) => !prev);
	}, []);
	return (
		<fieldset className="fieldset">
			<label className="label">
				<span className="label-text text-primary font-medium flex items-center gap-2">
					<Lock className="w-4 h-4" />
					Password
				</span>
			</label>
			<div className="relative">
				<input
					type={showPassword ? "text" : "password"}
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 6,
							message: "Password must be at least 6 characters",
						},
					})}
					className={`input w-full pr-12 transition-all duration-300 ${
						errors.password ? "input-error" : "input-primary"
					}`}
					placeholder="Enter your password"
				/>
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute right-3 top-1/2 z-20 transform -translate-y-1/2 btn btn-ghost btn-sm btn-circle hover:bg-base-200"
				>
					{showPassword ? (
						<EyeOff className="w-5 h-5" />
					) : (
						<Eye className="w-5 h-5" />
					)}
				</button>
			</div>
			{errors.password && (
				<div className="label">
					<span className="label-text-alt text-error">
						{errors.password.message}
					</span>
				</div>
			)}
		</fieldset>
	);
};

export default PasswordField;
