import CrudRepository from "./CrudRepo.js";
import Order from "#models/OrderModel";

const OrderRepository = {
	...CrudRepository(Order),

	getOrderWithDetails: async (id) => {
		const Order = await Order.findById(id)
			.populate("userId", "name email ")
			.populate("products.productId", "name price description image");
		return Order;
	},
};
export default OrderRepository;
