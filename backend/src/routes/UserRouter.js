import express from 'express'
import { registerUserController, userLoginController } from '#controllers/UserController'
import { AdminAuthMiddleware } from '#middlewares/AdminAuthMiddleware';
const Router = express.Router()

Router.post("/signup", registerUserController)
Router.post("/signin", userLoginController)
Router.post("/login/admin",userLoginController);

export default Router