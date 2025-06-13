import ProductController from "#controllers/ProductController";
import validate from "#middlewares/ReqValidators";
import productSchema from "#services/validators/ProductJoiSchema";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/", ProductController.listProducts);
productRouter.post(
	"/",
	validate(productSchema.create),
	ProductController.addProduct
);
productRouter.get("/category", ProductController.listProductsByCategory);
productRouter.get(
	"/product_Id",
	validate(productSchema.productId, "params"),
	ProductController.getProductInfo
);
productRouter.patch(
	"/product_Id",
	validate(productSchema.productId, "params"),
	validate(productSchema.update),
	ProductController.updateProduct
);
productRouter.delete(
	"/product_Id",
	validate(productSchema.productId, "params"),
	ProductController.removeProduct
);

export default productRouter;
