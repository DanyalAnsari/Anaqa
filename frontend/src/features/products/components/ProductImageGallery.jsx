import useUiState from "@/app/hooks/useUiState";
import Button from "@/components/common/Buttons";
import { HoverImage } from "@/components/common/ImageUtil";
import { StatusBadge } from "@/components/common/typography/Badge";
import { Eye, Share2, TrendingUp } from "lucide-react";
import React from "react";

const ProductImageGallery = ({
	images,
	discount,
	bestseller,
}) => {
	const { selectedImage, changeSelectedImage } = useUiState();
	return (
		<div className="space-y-4">
			{/* Main Image */}
			<div className="relative bg-base-200 rounded-2xl overflow-hidden aspect-square">
				<HoverImage
					src={images[selectedImage]}
					alt="Product"
					className="h-full"
				/>

				{/* Badges */}
				<div className="absolute top-4 left-4 space-y-2">
					{bestseller && (
						<StatusBadge
							type="warning"
							className="shadow-lg flex items-center gap-1"
						>
							<TrendingUp className="w-3 h-3" />
							BESTSELLER
						</StatusBadge>
					)}
					{discount && (
						<StatusBadge type="error" className="shadow-lg">
							{discount}% OFF
						</StatusBadge>
					)}
				</div>

				{/* Quick Actions */}
				<div className="absolute top-4 right-4 space-y-2">
					<Button variant="icon" className=" bg-base-100/80 backdrop-blur-sm">
						<Eye className="w-4 h-4 text-neutral" />
					</Button>
					<Button variant="icon" className=" bg-base-100/80 backdrop-blur-sm">
						<Share2 className="w-4 h-4 text-neutral" />
					</Button>
				</div>
			</div>

			{/* Thumbnail Gallery */}
			<div className="grid grid-cols-4 gap-3">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() =>changeSelectedImage(index)}
						className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
							selectedImage === index
								? "border-primary shadow-lg"
								: "border-base-300 hover:border-secondary"
						}`}
					>
						<img
							src={image}
							alt={`Product ${index + 1}`}
							className="w-full h-full object-cover"
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default ProductImageGallery;
