import Product from "#models/ProductModel";
import {
	addProductService,
	deleteProductsService,
	fetchAllProductsService,
	findProductByIdService,
} from "#services/ProductService";
import ApiFeatures from "#utils/ApiFeatures";
import ControllerErrorHandler from "#utils/helpers/ControllerErrorHandler";

export const addProductController = ControllerErrorHandler(
	async (req, res, next) => {
		const ProductResponse = await addProductService(req.body, req.files);
		return (data = {
			message: "Product created successfully",
			ProductResponse,
		});
	}
);

export const fetchAllProductsController = ControllerErrorHandler(
	async (req, res, next) => {
		const allProductsResponse = await fetchAllProductsService();
		return {
			message: "Successfully fetched all the products",
			data: allProductsResponse,
		};
	}
);

export const fetchProducts = ControllerErrorHandler(async (req, res, next) => {
	// Handle text search
	if (req.query.search) {
		req.query.$text = { $search: req.query.search };
		delete req.query.search;
	}
	const features = new ApiFeatures(Product.find(), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate();

	const products = await features.query;

	// For pagination info
	const totalProducts = await features.getCount();
	const totalPages = Math.ceil(totalProducts / features.limit);

	return {
		message: "Successfully fetched all products",
		data: products,
		pagination: {
			totalProducts,
			totalPages,
			currentPage: features.page,
			limit: features.limit,
		},
	};
});

export const deleteProductsController = ControllerErrorHandler(
	async (req, res, next) => {
		const deleteProductResponse = await deleteProductsService(
			req.params.productId
		);

		return (data = {
			message: "Successfully deleted the products",
			deleteProductResponse,
		});
	}
);

export const fetchProductByIdController = ControllerErrorHandler(
	async (req, res, next) => {
		const productId = req.params.productId;
		const product = await findProductByIdService(productId);
		return {
			message: "Successfully fetched product",
			data: product,
		};
	}
);
