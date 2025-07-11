import {
	allOrdersService,
	placeOrderCODService,
	placeOrderStripeService,
	updateStatusService,
	usersOrdersService,
	verifyStripeService,
} from "#services/OrderService";
import ControllerErrorHandler from "#utils/helpers/ControllerErrorHandler";

export const placeOrderCODController = ControllerErrorHandler(
	async (req, res, next) => {
		const orderObject = {
			userId: req.user?._id.toString(),
			products: req.body?.products,
			amount: req.body?.amount,
			address: req.body?.address,
			paymentMethod: "Cash on Delivery",
			payment: false,
		};
		const data = await placeOrderCODService(orderObject);

		return { statusCode: 201, message: "Order created successfully", data };
	}
);

export const usersOrderDetailsController = ControllerErrorHandler(
	async (req, res, next) => {
		const userId = req.user;
		const data = await usersOrdersService(userId);

		return {
			message: "successfully fetched users order details",
			data,
		};
	}
);

export const adminOrderListController = ControllerErrorHandler(
	async (req, res, next) => {
		const data = await allOrdersService();
		return {
			message: "successfully fetched admins order details",
			data,
		};
	}
);

export const updateStatusController = ControllerErrorHandler(
	async (req, res, next) => {
		const { orderId, status } = req.body;

		const data = await updateStatusService(orderId, status);
		return {
			message: "successfully updated status",
			data,
		};
	}
);

export const placeOrderStripeController = ControllerErrorHandler(
	async (req, res, next) => {
		const user = req.user;
		const origin = req.headers?.origin;

		const orderObject = {
			userId: req.user?._id.toString(),
			products: req.body?.products,
			amount: req.body?.amount,
			address: req.body?.address,
			paymentMethod: "Stripe",
			payment: false,
		};

		// Call service layer to create order and get Stripe session URL
		const data = await placeOrderStripeService(orderObject, user, origin);

		return {
			message: "Stripe checkout session created successfully",
			data,
		};
	}
);

export const verifyStripeController = ControllerErrorHandler(
	async (req, res, next) => {
		const userId = req.user._id;
		const { orderId, success } = req.body;

		const data = await verifyStripeService({ orderId, userId, success });

		return {
			message: "Successfully completed stripe verification",
			data,
		};
	}
);
