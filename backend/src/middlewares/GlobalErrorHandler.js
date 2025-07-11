import ClientError from "#utils/errors/ClientError";
import logger from "#utils/logger";
import createHttpError from "http-errors";

function globalErrorHandler(err, req, res, next) {
	if (!(err instanceof ClientError)) {
		logger.error(`[UNKNOWN] ${err.stack || err}`);
		err = createHttpError(500, "Internal Server Error");
	} else {
		logger.error(`[${err.statusCode}] ${err.message}`);
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.expose ? err.message : "Something went wrong",
		error: process.env.NODE_ENV === "development" ? err.stack : undefined,
	});
}

export default globalErrorHandler;

// This middleware handles errors globally in the application.
