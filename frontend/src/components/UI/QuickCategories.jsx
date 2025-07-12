import React from "react";
import Container, {
	GridContainer,
	HoverIconContainer,
	IconBaseContainer,
	SectionContainer,
} from "../layouts/containers/Container";
import { H5 } from "../common/typography/Headings";
import { TextBody } from "../common/typography/Text";
import GradientBackground from "../layouts/containers/Gradients";
import { SectionHeader } from "../common/Headers";

const QuickCategories = () => {
	return (
		<GradientBackground type="section">
			<Container>
				<SectionContainer>
					<SectionHeader
						label={"Categories"}
						heading={"Shop by Style"}
						description={"Find exactly what matches your aesthetic"}
					/>
					<GridContainer columns="categories">
						{categories.map((category) => (
							<HoverIconContainer
								key={category.name}
								className={`${category.bg} ${category.hover} ${category.border} p-8 flex-col group`}
							>
								<IconBaseContainer className="w-16 h-16 bg-base-100 mb-4 border-base-300/50">
									<span className="text-3xl">{category.emoji}</span>
								</IconBaseContainer>
								<H5 className="mb-1">{category.name}</H5>
								<TextBody variant={"small"}>Explore collection</TextBody>
							</HoverIconContainer>
						))}
					</GridContainer>
				</SectionContainer>
			</Container>
		</GradientBackground>
	);
};

const categories = [
	{
		name: "Women",
		emoji: "👗",
		bg: "bg-gradient-to-br from-info/5 to-info/10",
		border: "border-info/20",
		hover: "hover:from-info/10 hover:to-info/15",
	},
	{
		name: "Men",
		emoji: "👔",
		bg: "bg-gradient-to-br from-secondary/5 to-secondary/10",
		border: "border-secondary/20",
		hover: "hover:from-secondary/10 hover:to-secondary/15",
	},
	{
		name: "Kids",
		emoji: "🧸",
		bg: "bg-gradient-to-br from-success/5 to-success/10",
		border: "border-success/20",
		hover: "hover:from-success/10 hover:to-success/15",
	},
	{
		name: "Accessories",
		emoji: "👜",
		bg: "bg-gradient-to-br from-accent/5 to-accent/10",
		border: "border-accent/20",
		hover: "hover:from-accent/10 hover:to-accent/15",
	},
];

export default QuickCategories;
