import React from "react";

const FormField = ({
	icon,
	label,
	type,
	name,
	register,
	errors,
	validation,
	placeholder,
}) => (
	<fieldset className="fieldset">
		<label className="label">
			<span className="label-text text-primary font-medium flex items-center gap-2">
				{icon}
				{label}
			</span>
		</label>
		<input
			type={type}
			{...register(name, validation)}
			className={`input w-full transition-all duration-300 ${
				errors[name] ? "input-error" : "input-primary"
			}`}
			placeholder={placeholder}
		/>
		{errors[name] && (
			<div className="label">
				<span className="label text-error">{errors[name].message}</span>
			</div>
		)}
	</fieldset>
);

export default FormField;
