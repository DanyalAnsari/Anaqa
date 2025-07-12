import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import constants from "@/utilities/appConstants";
import { LoadingSpinner } from "@/components/common/typography/LoadingComp";
import { useProduct } from "@/app/hooks/useProduct";
import GradientBackground from "@/components/layouts/containers/Gradients";
import Container, {
	GridContainer,
} from "@/components/layouts/containers/Container";
import Button from "@/components/common/Buttons";
import ProductImageGallery from "@/features/products/components/ProductImageGallery";
import ProductInfo from "@/features/products/components/ProductInfo";
import ProductInfoTab from "@/features/products/components/Tab/ProductInfoTab";
import RelatedProducts from "@/features/products/components/RelatedProducts";

// Mock data based on your API structure

const Product = () => {
	const { mockReviews, mockRelatedProducts } = constants;
	const { id } = useParams();
	const navigate = useNavigate();
	const { isLoading, product } = useProduct(id);

	return (
		<GradientBackground type="subtle" className="min-h-screen">
			<Container className="py-8">
				{/* Back Button */}
				<Button
					variant="secondary"
					className="btn-sm mb-8 group"
					action={() => navigate("/products")}
				>
					<ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
					Back to Collection
				</Button>

				{isLoading ? (
					<LoadingSpinner />
				) : (
					<div>
						{/* Main Product Section */}
						<GridContainer columns="two" className="gap-12 mb-20">
							<ProductImageGallery
								images={product.images}
								discount={product.discount}
								bestseller={product.bestseller}
							/>
							<ProductInfo product={product} />
						</GridContainer>

						{/* Product Details Tabs */}
						<div className="mb-20">
							<ProductInfoTab product={product} reviews={mockReviews} />
						</div>

						{/* Related Products */}
						<RelatedProducts products={mockRelatedProducts} />
					</div>
				)}
			</Container>
		</GradientBackground>
	);
};

export default Product;
