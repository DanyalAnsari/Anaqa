import Stripe from "stripe";
import { STRIPE_SECRET_KEY, DELIVERY_FEE } from "#config/appConfig";
import OrderRepository from "#repository/OrderRepo";
import UserRepository from "#repository/UserRepo";
import Order from "#models/OrderModel";
import AppError from "#utils/errors/AppError";
import {
	BadRequestException,
	NotFoundException,
} from "#utils/errors/Exceptions";
import { ClearUsersCartService } from "./CartService.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const placeOrderCODService = async (orderObject) => {
	try {
		const { userId } = orderObject;
		if (!userId) {
			throw new BadRequestException(
				"A valid user ID is required to place an order"
			);
		}

		const order = await OrderRepository.create(orderObject);
		await ClearUsersCartService({ userId });

		return order;
	} catch (error) {
		throw error;
	}
};

export const placeOrderStripeService = async (orderData, user, origin) => {
	try {
		if (!orderData.userId) {
			throw new BadRequestException(
				"A valid user ID is required to place an order"
			);
		}

		const order = await OrderRepository.create(orderData);

		try {
			// Create properly indexed array for line items
			const lineItems = [
				// Products first
				...orderData.products.map((product) => ({
					price_data: {
						currency: "usd",
						product_data: {
							name: product.name,
							images: product.image ? [product.image] : [],
						},
						unit_amount: Math.round(product.price * 100), // Convert to cents
					},
					quantity: product.quantity,
				})),
				// Delivery fee as separate item
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "Delivery Charge",
						},
						unit_amount: Math.round(DELIVERY_FEE * 100), // Convert to cents
					},
					quantity: 1,
				},
			];

			const session = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				mode: "payment",
				line_items: lineItems,
				success_url: `${origin}/verify?success=true&orderId=${order._id.toString()}`,
				cancel_url: `${origin}/verify?success=false&orderId=${order._id.toString()}`,
				customer_email: user?.email,
				metadata: {
					order_id: order._id.toString(),
					user_id: user?.id.toString(),
				},
			});

			return {
				_id: order._id.toString(),
				userId: order.userId.toString(),
				products: order.products.map((product) => ({
					name: product.name,
					price: product.price,
					quantity: product.quantity,
					size: product.size,
				})),
				amount: order.amount,
				address: order.address,
				paymentMethod: order.paymentMethod,
				payment: order.payment,
				status: order.status,
				createdAt: order.createdAt,
				updatedAt: order.updatedAt,
				checkoutUrl: session.url,
			};
		} catch (error) {
			console.error("Stripe session creation error:", error);
			throw new AppError(error, "Stripe session creation failed");
		}
	} catch (error) {
		console.error("Order creation error:", error);
		throw error;
	}
};

export const verifyStripeService = async ({ orderId, userId, success }) => {
	try {
		if (success === "true") {
			const order = await OrderRepository.update(orderId, { payment: true });
			await ClearUsersCartService({ userId });

			return order;
		}

		if (success === "false") {
			const order = await OrderRepository.deleteById(orderId);
			return order;
		}
	} catch (error) {
		throw error;
	}
};

// for admin

export const allOrdersService = async () => {
	try {
		const response = await Order.find().sort({ createdAt: -1 });
		return response;
	} catch (error) {
		throw error;
	}
};

export const usersOrdersService = async (id) => {
	try {
		if (!id) {
			throw new NotFoundException("User's Id not found");
		}
		const orders = await Order.find({ userId: id }).sort({ createdAt: -1 });

		return orders;
	} catch (error) {
		throw error;
	}
};

export const updateStatusService = async (orderId, status) => {
	try {
		if (!status) {
			throw new BadRequestException(
				"A valid status is required to update the order"
			);
		}

		if (!orderId) {
			throw new BadRequestException(
				"A valid order ID is required to update the order status"
			);
		}

		const order = await Order.findById(orderId);
		if (!order) {
			throw new NotFoundException("Order not found");
		}

		const updatedOrder = await OrderRepository.update(orderId, { status });

		return updatedOrder;
	} catch (error) {
		throw error;
	}
};
