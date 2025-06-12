import ControllerErrorHandler from "#utils/helpers/ControllerErrorHandler";
import Product from "#models/ProductModel";
import ApiFeatures from "#utils/ApiFeatures";

const ProductController = {
	listProducts: ControllerErrorHandler(async (req, res, next) => {
		const query = { categories: req.params };
		const features = new ApiFeatures(Product.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const [products, totalProducts] = await Promise.all([
			features.query.populate("category", "name").exec(),
			Product.countDocuments(features.queryFilter || {}),
		]);

		return {
			statusCode: 200,
			data: {
				products,
				pagination: {
					total: totalProducts,
					page: features.page,
					pages: Math.ceil(totalProducts / (features.limit || 10)),
				},
			},
		};
	}),
};

export default ProductController;
