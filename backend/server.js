import app from "./app/app.js";
import DB from "./database/mongo.js";
import { NODE_ENV, PORT } from "#config/appConfig";

const initializeServer = async (app) => {
	try {
		await DB.connect();
		// Start server
		const server = app.listen(PORT, () => {
			console.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
		});

		// Handle unhandled promise rejections
		process.on("unhandledRejection", (err) => {
			console.error("UNHANDLED REJECTION! 💥 Shutting down...");
			console.error(err.name, err.message);
			console.error(err.stack);

			gracefulShutdown(server);
		});

		// Handle uncaught exceptions
		process.on("uncaughtException", (err) => {
			console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
			console.error(err.name, err.message);
			console.error(err.stack);

			gracefulShutdown(server);
		});

		// Handle SIGTERM
		process.on("SIGTERM", () => {
			console.info("SIGTERM received. Shutting down gracefully");
			gracefulShutdown(server);
		});

		// Handle SIGINT
		process.on("SIGINT", () => {
			console.info("SIGINT received. Shutting down gracefully");
			gracefulShutdown(server);
		});
	} catch (error) {
		console.error(err);
		console.error("Failed to start server:", error);
		process.exit(1);
	}
};

// Graceful shutdown function
async function gracefulShutdown(server) {
	try {
		await server.close();
		console.info("Server closed");

		await DB.close();
		console.info("Database connection closed");

		process.exit(0);
	} catch (error) {
		console.error("Error during graceful shutdown:", error);
		process.exit(1);
	}
}

initializeServer(app);
