import productRepository from "#repository/ProductRepo";
import AppError from "#utils/errors/AppError";
import {
	BadRequestException,
	NotFoundException,
} from "#utils/errors/Exceptions";

export const addProductService = async (ProductData, imageFiles) => {
	try {
		const {
			name,
			description,
			price,
			category,
			subCategory,
			bestSeller,
			sizes,
		} = ProductData;

		const images = [
			imageFiles.image1?.[0],
			imageFiles.image2?.[0],
			imageFiles.image3?.[0],
			imageFiles.image4?.[0],
		].filter(Boolean); // Removes undefined value

		const imgUrls = images.map((image) => `/images/${image.path}`);

		//console.log("Uploaded Image URLs:", imageUrls);
		const product = await productRepository.create({
			name,
			description,
			price: Number(price),
			category,
			subCategory,
			bestSeller: Boolean(bestSeller),
			sizes: JSON.parse(sizes),
			image: imgUrls,
		});

		return product;
	} catch (error) {
		throw new AppError(error, "error in creating product");
	}
};

export const fetchAllProductsService = async () => {
	try {
		const allProducts = await productRepository.findAll();
		return allProducts;
	} catch (error) {
		throw new AppError(error, "error in fetching all the product");
	}
};

export const deleteProductsService = async (productId) => {
	try {
		if (!productId) {
			throw new BadRequestException("Product ID is required");
		}
		const deletedProduct = await productRepository.deleteById(productId);

		if (!deletedProduct) {
			throw new BadRequestException("Product not found or already deleted");
		}
		return deletedProduct;
	} catch (error) {
		throw new AppError(error, "error in deleting the product");
	}
};

export const findProductByIdService = async (productId) => {
	try {
		if (!productId) {
			throw new BadRequestException("Product ID is required");
		}

		const product = await productRepository.findById(productId);
		if (!product) {
			throw new NotFoundException("Product does not exist");
		}

		return product;
	} catch (error) {
		throw new AppError(error, "error in fetching  product by id");
	}
};
