import express from "express";

import { AdminAuthMiddleware } from "#middlewares/AdminAuthMiddleware";
import { AuthMiddleware } from "#middlewares/AuthMiddleware";
import {
	adminOrderListController,
	placeOrderCODController,
	placeOrderStripeController,
	updateStatusController,
	usersOrderDetailsController,
	verifyStripeController,
} from "#controllers/OrderController";

const OrderRouter = express.Router();
//admin
OrderRouter.get("/list-orders", AdminAuthMiddleware, adminOrderListController);
OrderRouter.post("/status", AdminAuthMiddleware, updateStatusController);

//payment
OrderRouter.post("/cod", AuthMiddleware, placeOrderCODController);
OrderRouter.post("/stripe", AuthMiddleware, placeOrderStripeController);
//user
OrderRouter.get("/", AuthMiddleware, usersOrderDetailsController);
//verify payment
OrderRouter.post("/verify", AuthMiddleware, verifyStripeController);

export default OrderRouter;
