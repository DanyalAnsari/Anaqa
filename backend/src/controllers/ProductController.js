import ControllerErrorHandler from "#utils/helpers/ControllerErrorHandler";
import Product from "#models/ProductModel";
import ApiFeatures from "#utils/ApiFeatures";
import { NotFoundException, ValidationException } from "#utils/Exceptions";
import FileHandler from "#utils/helpers/FileHandler";

const ProductController = {
	// List products function
	listProducts: ControllerErrorHandler(async (req, res, next) => {
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

	// Get products by category function
	listProductsByCategory: ControllerErrorHandler(async (req, res, next) => {
		const query = { categories: req.params };
		const features = new ApiFeatures(Product.find(query), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const [products, totalProducts] = await Promise.all([
			features.query.populate("category", "name").exec(),
			Product.countDocuments(query),
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

	// Get product by ID function
	getProductInfo: ControllerErrorHandler(async (req, res, next) => {
		const product = await Product.findById(req.params.id).populate(
			"category",
			"name"
		);

		if (!product) {
			throw new NotFoundException("Product not found");
		}

		return {
			statusCode: 200,
			data: { product },
		};
	}),

	// Add product function
	addProduct: ControllerErrorHandler(async (req, res, next) => {
		const {
			name,
			description,
			price,
			discountedPrice,
			stock,
			category,
			subCategory,
			sizes,
			bestseller = false,
		} = req.body;

		// Validate required files
		if (!req.files || Object.keys(req.files).length === 0) {
			throw new ValidationException("At least one product image is required");
		}

		// Save images locally
		const imageUrls = await FileHandler._saveProductImages(req.files);

		if (imageUrls.length === 0) {
			throw new ValidationException("At least one product image is required");
		}

		// Create product
		const product = await Product.create({
			name,
			description,
			price,
			discountedPrice,
			stock,
			images: imageUrls,
			category,
			subCategory,
			sizes,
			bestseller,
		});

		return {
			statusCode: 201,
			data: {
				product: {
					id: product._id,
					name: product.name,
					price: product.price,
					discountedPrice: product.discountedPrice,
					stock: product.stock,
					images: product.images,
				},
			},
		};
	}),

	// Update product function
	updateProduct: ControllerErrorHandler(async (req, res, next) => {
		const product = await Product.findById(req.params.id);

		if (!product) {
			throw new NotFoundException("Product not found");
		}

		const updateData = { ...req.body };

		// Handle new image uploads
		if (req.files && Object.keys(req.files).length > 0) {
			const newImageUrls = await ProductController._saveProductImages(
				req.files
			);

			if (newImageUrls.length > 0) {
				updateData.images = [...(product.images || []), ...newImageUrls];
			}
		}

		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			updateData,
			{ new: true, runValidators: true }
		);

		return {
			statusCode: 200,
			data: { product: updatedProduct },
		};
	}),

	// Remove product function
	removeProduct: ControllerErrorHandler(async (req, res, next) => {
		const product = await Product.findById(req.params.Product_Id);

		if (!product) {
			throw new NotFoundException("Product not found");
		}

		// Delete associated images
		await ProductController._deleteProductImages(product.images);

		// Delete product from database
		await Product.findByIdAndDelete(req.params.Product_Id);

		return {
			statusCode: 204,
			data: { success: true },
		};
	}),
};

export default ProductController;
