import {
	AddProductToCartService,
	ClearUsersCartService,
	GetUsersCartService,
	RemoveFromCartService,
	UpdateProductInCartService,
} from "#services/CartService";
import ControllerErrorHandler from "#utils/helpers/ControllerErrorHandler";

export const AddProductToCartController = ControllerErrorHandler(
	async (req, res, next) => {
		const userId = req.user._id;
		const { productId, size, quantity } = req.body;
		const data = await AddProductToCartService({
			userId,
			productId,
			size,
			quantity,
		});

		return {
			statusCode: 201,
			message: "Successfully added product to cart",
			data,
		};
	}
);

export const RemoveProductFromCartController = ControllerErrorHandler(
	async (req, res, next) => {
		const userId = req.user._id;
		const { productId, size } = req.body;
		const data = await RemoveFromCartService({ userId, productId, size });
		return { message: "Successfully removed product to cart", data };
	}
);

export const UpdateProductInCartController = ControllerErrorHandler(
	async (req, res, next) => {
		const userId = req.user._id;
		const { productId, size, quantity } = req.body;
		const data = await UpdateProductInCartService({
			userId,
			productId,
			size,
			quantity,
		});
		return { message: "Successfully updated quantity in cart", data };
	}
);

export const GetUsersCartController = ControllerErrorHandler(
	async (req, res, next) => {
		const userId = req.user._id;
		const data = await GetUsersCartService({ userId });
		return { message: "Successfully fetched cart details", data };
	}
);

export const ClearUserCartController = ControllerErrorHandler(
	async (req, res, next) => {
		const userId = req.user._id;
		const data = await ClearUsersCartService({ userId });
		return { message: "Successfully cleared cart details", data };
	}
);
