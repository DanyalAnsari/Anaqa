import { ValidationException } from "#utils/errors/Exceptions";

const validate = (schema, property = "body") => {
	return (req, res, next) => {
		const { error } = schema.validate(req[property], {
			abortEarly: false,
			stripUnknown: true,
		});

		if (error) {
			const errorMessage = error.details
				.map((detail) => detail.message)
				.join(", ");

			throw ValidationException(errorMessage);
		}

		next();
	};
};
export default validate;
