import { Router } from "express";

import ProductRouter from "#routes/ProductRouter";
import CartRouter from "#routes/CartRouter";
import OrderRouter from "#routes/OrderRouter";
import UserRouter from "#routes/UserRouter";

const router = Router();

router.use("/products", ProductRouter);
router.use("/auth", UserRouter);
router.use("/cart", CartRouter);
router.use("/orders", OrderRouter);

export default router;
