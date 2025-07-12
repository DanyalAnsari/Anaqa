import React from "react";
import { ImageOverlay, HoverImage } from "@/components/common/ImageUtil";
import { FloatingBadge } from "@/components/common/typography/Badge";

const HeroImage = () => {
	return (
		<div className="flex-1 relative">
			<div className="relative overflow-hidden rounded-xl shadow-xl border border-base-300/50">
				<HoverImage
					src={"/hero_img.png"}
					alt="Latest Fashion Collection"
					className="h-[420px] lg:h-[520px]"
				/>
				{/* Floating Badge */}
				<FloatingBadge className="top-6 left-6 bg-primary text-primary-content font-semibold ">
					New Collection
				</FloatingBadge>
				{/* Sale Badge */}
				<FloatingBadge className="top-6 right-6 font-bold">
					Up to 50% OFF
				</FloatingBadge>
				{/* Decorative overlay */}
				<ImageOverlay className="pointer-events-none" />
			</div>
		</div>
	);
};

export default HeroImage;
