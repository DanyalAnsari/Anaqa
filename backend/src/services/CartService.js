import productRepository from "#repository/ProductRepo";
import UserRepository from "#repository/UserRepo";
import {
	BadRequestException,
	NotFoundException,
} from "#utils/errors/Exceptions";
import CartRepository from "#repository/CartRepo";
import Cart from "#models/CartModel";

export const AddProductToCartService = async ({
	userId,
	productId,
	quantity,
	size,
}) => {
	try {
		const user = await UserRepository.findById(userId);
		if (!user) {
			throw new NotFoundException("User not found");
		}

		const product = await productRepository.findById(productId);
		if (!product) {
			throw new NotFoundException("Product not found");
		}

		if (!product.sizes.includes(size)) {
			throw new BadRequestException("Invalid size for this product");
		}

		let cart = await Cart.findOne({ user: userId });

		if (!cart) {
			cart = new Cart({ user: userId, items: [] });
		}

		const existingItemIndex = cart.items.findIndex(
			(item) => item.product.equals(productId) && item.size === size
		);
		if (existingItemIndex >= 0) {
			cart.items[existingItemIndex].quantity += quantity;
		} else {
			cart.items.push({
				product: productId,
				size,
				quantity,
				price: product.price,
				name: product.name,
				image: product.images[0],
			});
		}
		await cart.save();
		return cart;
	} catch (error) {
		throw error;
	}
};

export const UpdateProductInCartService = async ({
	userId,
	productId,
	size,
	quantity,
}) => {
	try {
		const user = await UserRepository.findById(userId);
		if (!user) {
			throw new NotFoundException("User not found");
		}

		const product = await productRepository.findById(productId);
		if (!product) {
			throw new NotFoundException("Product not found");
		}

		const cart = await Cart.findOne({ user: user._id });

		if (!cart) {
			throw new NotFoundException("Cart not found");
		}

		const itemIndex = cart.items.findIndex(
			(item) => item.product.equals(product._id) && item.size === size
		);

		if (itemIndex === -1) {
			throw new NotFoundException("Item not found in cart");
		}

		cart.items[itemIndex].quantity = quantity;
		await cart.save();
		return cart;
	} catch (error) {
		throw error;
	}
};

export const RemoveFromCartService = async ({userId, productId, size}) => {
	try {
		const cart = await Cart.findOne({ user: userId });

		if (!cart) {
			throw new NotFoundException("Cart not found");
		}

		cart.items = cart.items.filter(
			(item) => !(item.product.equals(productId) && item.size === size)
		);

		await cart.save();
		return cart;
	} catch (error) {
		throw error;
	}
};

export const GetUsersCartService = async ({ userId }) => {
	try {
		const cart = await CartRepository.findByUserId(userId);
		if (!cart) {
			throw new NotFoundException("User not found");
		}

		return cart;
	} catch (error) {
		throw error;
	}
};

export const ClearUsersCartService = async ({ userId }) => {
	try {
		const user = await UserRepository.findById(userId);
		if (!user) {
			throw new NotFoundException("User not found");
		}

		const cart = await CartRepository.findByUserId(userId);
		if (!cart) {
			throw new NotFoundException("User not found");
		}

		const clearCart = await CartRepository.update(cart._id, { items: [] });

		return clearCart;
	} catch (error) {
		throw error;
	}
};
