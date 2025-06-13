import { Router } from "express";
import * as Exceptions from "#utils/Exceptions";
import productRouter from "#routes/ProductRouter";

const router = Router();

// Product Route
router.use("/products", productRouter);

// Throwing custom AppError
router.get("/bad", (req, res, next) => {
	next(new Exceptions.BadRequestException("This is a bad request"));
});

// Native async error caught by express-async-errors
router.get("/crash", async (req, res) => {
	throw new Error("Something failed!");
});

export default router;
