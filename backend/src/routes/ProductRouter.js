import express from "express";
import {
	addProductController,
	deleteProductsController,
	fetchAllProductsController,
	fetchProductByIdController,
	fetchProducts,
} from "#controllers/ProductController";
import upload from "#middlewares/MulterMiddleware";
import { AdminAuthMiddleware } from "#middlewares/AdminAuthMiddleware";

const ProductRouter = express.Router();
ProductRouter.post(
	"/",
	AdminAuthMiddleware,
	upload.fields([
		{ name: "image1", maxCount: 1 },
		{ name: "image2", maxCount: 1 },
		{ name: "image3", maxCount: 1 },
		{ name: "image4", maxCount: 1 },
	]),
	addProductController
);

ProductRouter.get("/all", fetchAllProductsController);
ProductRouter.get("/", fetchProducts);
ProductRouter.delete(
	"/deleteProduct/:productId",
	AdminAuthMiddleware,
	deleteProductsController
);
ProductRouter.get("/:productId", fetchProductByIdController);

export default ProductRouter;
