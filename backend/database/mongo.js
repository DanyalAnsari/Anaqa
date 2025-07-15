import logger from "#utils/logger";
import mongoose from "mongoose";
import { MONGO_DB_URI, MONGO_DB_NAME, NODE_ENV } from "#config/appConfig";

const options = {
	serverSelectionTimeoutMS: 5000,
	socketTimeoutMS: 45000,
	family: 4,
	autoIndex: NODE_ENV !== "production",
	maxPoolSize: 10,
	minPoolSize: 5,
	retryWrites: true,
	retryReads: true,
	appName: MONGO_DB_NAME,
};

const DB = {
	connect: async () => {
		try {
			const uri = MONGO_DB_URI || "mongodb://localhost:27017/";
			const dbName = MONGO_DB_NAME || "Anaqa";

			const conn = await mongoose.connect(`${uri}${dbName}`, options);

			logger.info(`MongoDB Connected: ${conn.connection.host}`);

			// Monitor connection pool events
			conn.connection.on("connecting", () => {
				logger.info("Establishing database connection...");
			});

			conn.connection.on("connected", () => {
				logger.info("Database connection established");
			});

			conn.connection.on("disconnecting", () => {
				logger.warn("Database disconnecting...");
			});

			conn.connection.on("disconnected", () => {
				logger.warn("Database disconnected");
			});

			conn.connection.on("error", (err) => {
				logger.error("Database connection error:", err);
			});

			conn.connection.on("fullsetup", () => {
				logger.info("MongoDB replica set connected");
			});

			return conn;
		} catch (error) {
			logger.error("Database connection failed:", error);
			throw error;
		}
	},
	close: async () => {
		try {
			await mongoose.connection.close();
			logger.info("Database connection closed successfully");
		} catch (error) {
			logger.error("Error closing database connection:", error);
			throw error;
		}
	},
	health: async () => {
		try {
			const status = await mongoose.connection.db.admin().ping();
			return {
				status: status.ok === 1 ? "healthy" : "unhealthy",
				latency: status.ok === 1 ? status.operationTime : null,
				connectionState: mongoose.connection.readyState,
			};
		} catch (error) {
			logger.error("Database health check failed:", error);
			return {
				status: "unhealthy",
				error: error.message,
				connectionState: mongoose.connection.readyState,
			};
		}
	},
};

export default DB;
