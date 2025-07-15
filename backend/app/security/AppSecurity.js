import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import sanitizeInput from "#middlewares/SanitizeInput";
import { FRONTEND_URL, NODE_ENV } from "#config/appConfig";

const appSecurity = (app) => {
	// Disable the `X-Powered-By` header which could give away information about the framework and its version.
	app.disable("x-powered-by");
	app.set("trust proxy", NODE_ENV === "production" ? true : false);
	app.set("trust proxy", 2);

	// // Helmet helps protect against common web exploits
	app.use(helmet());

	// // Optional Content Security Policy
	app.use(
		helmet.contentSecurityPolicy({
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "'unsafe-inline'"],
				styleSrc: ["'self'", "'unsafe-inline'"],
				imgSrc: ["'self'", "data:"],
			},
		})
	);

	// // CORS with whitelist
	// // Split the CORS_ORIGIN environment variable into an array and also include the frontend URL
	const allowedOrigins = FRONTEND_URL.trim();

	// // Use CORS middleware

	app.use(
		cors({
			origin: (origin, callback) => {
				// If the origin is in the whitelist, allow it
				if (!origin || allowedOrigins.includes(origin)) {
					return callback(null, true);
				}
				callback(new Error("Not allowed by CORS"));
			},

			credentials: true,
		})
	);

	// // Rate limiting middleware
	app.use(
		rateLimit({
			// Set the time window to 15 minutes
			windowMs: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
			// Set the maximum number of requests to 100
			max: process.env.RATE_LIMIT_MAX || 100,
			// Set the headers to be returned with the rate limit
			standardHeaders: true,
			legacyHeaders: false,
			trustProxy: true,
		})
	);

	app.use(
		"/api/auth",
		rateLimit({
			// Set the time window to 15 minutes
			windowMs: 15 * 60 * 1000,
			// Set the maximum number of requests to 100
			max: 100,
		})
	);
	// // HPP middleware
	app.use(hpp());

	// // MongoDB Sanitize middleware
	app.use(sanitizeInput);
};

export default appSecurity;
