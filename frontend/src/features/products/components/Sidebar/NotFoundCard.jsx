import useProductState from "@/app/hooks/useProductState";
import Button from "@/components/common/Buttons";
import Card, { CardContent, CardTitle } from "@/components/common/Card";
import { TextBody } from "@/components/common/typography/Text";
import { IconBaseContainer } from "@/components/layouts/containers/Container";
import { Search } from "lucide-react";
import React from "react";

const NotFoundCard = () => {
	const { resetFilters } = useProductState();

	return (
		<Card variant="minimal" className="text-center py-16">
			<CardContent>
				<div className="max-w-md mx-auto">
					<IconBaseContainer className="w-16 h-16 bg-base-200 mb-4">
						<Search className="w-8 h-8 text-neutral" />
					</IconBaseContainer>
					<CardTitle size="large" className="mb-2">
						No products found
					</CardTitle>
					<TextBody className="mb-4">
						Try adjusting your filters or search terms
					</TextBody>
					<Button
						variant="primary"
						className="btn-sm"
						action={() => resetFilters()}
					>
						Clear Filters
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default NotFoundCard;
