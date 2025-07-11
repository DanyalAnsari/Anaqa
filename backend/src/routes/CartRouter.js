import express from "express";
import {
	AddProductToCartController,
	UpdateProductInCartController,
	GetUsersCartController,
	ClearUserCartController,
	RemoveProductFromCartController,
} from "#controllers/CartController";
import { AuthMiddleware } from "#middlewares/AuthMiddleware";
const CartRouter = express.Router();

CartRouter.get("/", AuthMiddleware, GetUsersCartController);
CartRouter.post("/add", AuthMiddleware, AddProductToCartController);
CartRouter.post("/remove", AuthMiddleware, RemoveProductFromCartController);
CartRouter.put("/update", AuthMiddleware, UpdateProductInCartController);
CartRouter.delete("/clear", AuthMiddleware, ClearUserCartController);

export default CartRouter;
