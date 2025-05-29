import { assets } from "@/assets/assets";
import React from "react";

const Hero = () => {
	return (
		<div className="hero border border-neutral p-0">
			<div className="hero-content lg:flex-row-reverse p-0">
				<img src={assets.hero_img} className="w-full sm:w-1/2 shadow-none" />
				<div className="w-full lg:w-1/2 flex flex-col items-center py-10 sm:py-0">
					<div>
						<div className="flex items-center gap-2">
							<p className="w-8 md:w-11 h-[2px] bg-neutral"></p>
							<p className="font-medium text-sm md:text-base ">
								Our Bestsellers
							</p>
						</div>
						<h1 className="poppins-medium text-3xl sm:py-3 lg:text-5xl leading-relaxed">
							Latest Arrivals
						</h1>
						<div className="flex items-center gap-2">
							<p className="font-semibold text-sm md:text-base">SHOP NOW</p>
							<p className="w-8 md:w-11 h-[2px] bg-neutral"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
