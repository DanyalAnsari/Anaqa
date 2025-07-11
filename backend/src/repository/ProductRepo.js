import CrudRepository from "#repository/CrudRepo";
import Product from "#models/ProductModel";

const productRepository = {
	...CrudRepository(Product),
};

export default productRepository;

