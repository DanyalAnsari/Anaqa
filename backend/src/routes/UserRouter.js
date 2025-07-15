import express from "express";
import {
	registerUserController,
	tokenRefreshController,
	userLoginController,
	userLogoutController,
} from "#controllers/UserController";
import { AdminAuthMiddleware } from "#middlewares/AdminAuthMiddleware";
import { AuthMiddleware } from "#middlewares/AuthMiddleware";
const Router = express.Router();

Router.post("/signup", registerUserController);
Router.post("/signin", userLoginController);
Router.get("/refresh", tokenRefreshController);
Router.get("/logout", userLogoutController);
Router.post("/login/admin", userLoginController);

export default Router;
