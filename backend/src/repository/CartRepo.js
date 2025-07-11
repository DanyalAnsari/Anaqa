import Cart from "#models/CartModel";
import CrudRepository from "./CrudRepo.js";

const CartRepository = {
	...CrudRepository(Cart),
	findByUserId: async (userId) => {
		const cart = await Cart.findOne({ user: userId });
		return cart;
	},
	updateCartByUserId: async (userId, { parameter }) => {
		const cart = await Cart.findOneAndUpdate({ user: userId }, { parameter });
	},
	getCartWithDetails: async (id) => {
		const cart = await Cart.findById(id).populate("user", "name email ");

		return cart;
	},
};

export default CartRepository;
