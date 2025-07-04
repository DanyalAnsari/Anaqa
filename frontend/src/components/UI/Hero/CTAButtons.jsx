import Button from "@/components/common/Buttons";
import { FlexContainer } from "@/components/layouts/containers/Container";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const CTAButtons = () => {
	const navigate = useNavigate();
	return (
		<FlexContainer
			direction="row"
			className="sm:flex-row gap-4 lg:justify-start mb-10"
		>
			<Button variant={"primary"} action={() => navigate("/products")}>
				Shop Collection
				<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
			</Button>
			<Button variant={"secondary"}>View Lookbook</Button>
		</FlexContainer>
	);
};

export default CTAButtons;
