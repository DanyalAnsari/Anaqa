import express from "express";
import compression from "compression";
import morgan from "morgan";
import favicon from "serve-favicon";
import path from "path";

const appMiddlewares = (app) => {
	// Middleware for parsing JSON bodies
	app.use(express.json({ limit: "10kb" }));

	// Middleware for parsing URL-encoded bodies
	app.use(express.urlencoded({ extended: true, limit: "10kb" }));

	// Middleware for serving static files
	app.use(express.static("public"));
	app.use(favicon(path.join(process.cwd(), "public", "favicon.ico")));

	// Compression
	app.use(compression());

	// Logging
	if (process.env.NODE_ENV === "development") {
		app.use(morgan("combined"));
	}
};

export default appMiddlewares;
