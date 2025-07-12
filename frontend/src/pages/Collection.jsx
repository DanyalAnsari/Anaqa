import React from "react";
import Container, {
	GridContainer,
} from "@/components/layouts/containers/Container";
import { useProducts } from "@/app/hooks/useProducts";
import { SectionHeader } from "@/components/common/Headers";
import Sidebar from "@/features/products/components/Sidebar/Sidebar";
import useUiState from "@/app/hooks/useUiState";
import ControlBar from "@/features/products/components/Sidebar/ControlBar";
import NotFoundCard from "@/features/products/components/Sidebar/NotFoundCard";
import { LoadingComponent } from "@/components/common/typography/LoadingComp";
import ProductCard from "@/features/products/components/Card/ProductCard";

// Collection Page Component - Updated for consistency
const Collection = () => {
	const { viewMode } = useUiState();
	const { products, isLoading } = useProducts();

	if (isLoading) return <LoadingComponent />;

	return (
		<div className="min-h-screen bg-gradient-to-b from-base-200/30 to-base-100">
			<Container className="py-8">
				{/* Header */}
				<SectionHeader
					label={"SHOP ALL"}
					heading={"Our Collection"}
					description={"Discover our curated selection of premium products"}
				/>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Filters Sidebar */}
					<Sidebar />

					{/* Products Section */}
					<div className="flex-1">
						{/* Controls Bar */}
						<ControlBar filterProducts={products} />
						{/* Products Grid */}
						{products.length > 0 ? (
							<GridContainer columns={viewMode}>
								{products.map((product) => (
									<ProductCard
										key={product._id}
										product={product}
										variant={viewMode === "list" ? "list" : "default"}
									/>
								))}
							</GridContainer>
						) : (
							<NotFoundCard />
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Collection;
