class AppError extends Error {
	constructor(error, trace) {
		super();
		(this.trace = trace),
			(this.success = false),
			(this.message = error.message),
			Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;
