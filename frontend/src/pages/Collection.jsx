import { useEffect, useState } from "react";
import {
	Heart,
	Star,
	Filter,
	Search,
	Grid,
	List,
	ChevronDown,
	Plus,
	SlidersHorizontal,
	X,
} from "lucide-react";
import Container from "@/components/layouts/containers/Container";
import { H2 } from "@/components/common/typography/Headings";
import Button from "@/components/common/Buttons";
import Card, { CardContent, CardTitle } from "@/components/common/Card";
import ProductCard from "@/components/UI/ProductCard";
import { useProducts } from "@/app/hooks/useProducts";
import { SectionHeader } from "@/components/common/Headers";

// Collection Page Component - Updated for consistency
const Collection = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [viewMode, setViewMode] = useState("grid");
	const [filterProducts, setFilterProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [selectedSubcategory, setSelectedSubcategory] = useState([]);
	const [priceRange, setPriceRange] = useState([0, 1000]);
	const [sortType, setSortType] = useState("newest");
	const [searchTerm, setSearchTerm] = useState("");

	// Map sort options to API sort parameters
	const sortOptions = {
		newest: "-createdAt",
		oldest: "createdAt",
		highPrice: "-price",
		lowPrice: "price",
	};

	const { products, setFilter, updateFilters, resetFilters } = useProducts({
		limit: 12,
		page: 1,
		sort: sortOptions[sortType],
		minPrice: priceRange.min || undefined,
		maxPrice: priceRange.max || undefined,
	});

	useEffect(() => {
		setFilterProducts(products);
	}, [products]);

	// Handler for applying all filters
	const applyFilters = () => {
		updateFilters({
			category: selectedCategory || undefined,
			subCategory: selectedSubcategory || undefined,
			"price[gte]": priceRange.min || undefined,
			"price[lte]": priceRange.max || undefined,
			page: 1,
		});
	};

	const activeFiltersCount =
		selectedCategory.length + selectedSubcategory.length + (searchTerm ? 1 : 0);

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
					<Sidebar
						activeFiltersCount={activeFiltersCount}
						priceRange={priceRange}
						resetFilters={resetFilters}
						searchTerm={searchTerm}
						selectedCategory={selectedCategory}
						selectedSubcategory={selectedCategory}
						setPriceRange={setPriceRange}
						setSearchTerm={setSearchTerm}
						setSelectedCategory={setSelectedCategory}
						setSelectedSubcategory={setSelectedSubcategory}
						setShowFilter={setShowFilter}
						showFilter={showFilter}
					/>

					{/* Products Section */}
					<div className="flex-1">
						{/* Controls Bar */}
						<ControlBar
							filterProducts={filterProducts}
							setFilter={setFilter}
							setSortType={setSortType}
							setViewMode={setViewMode}
							sortOptions={sortOptions}
							sortType={sortType}
							viewMode={viewMode}
						/>
						{/* Products Grid */}
						{filterProducts.length > 0 ? (
							<div
								className={`grid gap-6 ${
									viewMode === "grid"
										? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
										: "grid-cols-1 max-w-4xl"
								}`}
							>
								{filterProducts.map((product) => (
									<ProductCard
										key={product._id}
										product={product}
										variant={viewMode === "list" ? "list" : "default"}
									/>
								))}
							</div>
						) : (
							<NotFoundCard resetFilters={resetFilters} />
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

const Sidebar = ({
	activeFiltersCount,
	resetFilters,
	setShowFilter,
	showFilter,
	searchTerm,
	setSearchTerm,
	priceRange,
	setPriceRange,
	setSelectedCategory,
	selectedCategory,
	setSelectedSubcategory,
	selectedSubcategory,
}) => {
	return (
		<div className="lg:w-80">
			<Card variant="elevated" className="sticky top-4">
				<CardContent>
					<div className="flex items-center justify-between mb-6">
						<CardTitle className="flex items-center gap-2">
							<SlidersHorizontal className="w-5 h-5" />
							Filters
							{activeFiltersCount > 0 && (
								<span className="bg-primary text-primary-content text-xs px-2 py-1 rounded-full">
									{activeFiltersCount}
								</span>
							)}
						</CardTitle>
						<div className="flex items-center gap-2">
							{activeFiltersCount > 0 && (
								<Button
									variant="ghost"
									size="sm"
									onClick={() => resetFilters}
									className="text-error hover:text-error"
								>
									Clear All
								</Button>
							)}
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setShowFilter(!showFilter)}
								className="lg:hidden"
							>
								<ChevronDown
									className={`w-4 h-4 transition-transform ${
										showFilter ? "rotate-180" : ""
									}`}
								/>
							</Button>
						</div>
					</div>

					<div
						className={`space-y-6 ${showFilter ? "block" : "hidden"} lg:block`}
					>
						{/* Search */}
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral" />
							<input
								type="text"
								placeholder="Search products..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-xl bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
							/>
							{searchTerm && (
								<button
									onClick={() => setSearchTerm("")}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral hover:text-error"
								>
									<X className="w-4 h-4" />
								</button>
							)}
						</div>

						{/* Price Range */}
						<FilterSection title="Price Range">
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<input
										type="number"
										placeholder="Min"
										value={priceRange[0]}
										onChange={(e) =>
											setPriceRange([Number(e.target.value), priceRange[1]])
										}
										className="w-full px-3 py-2 border border-base-300 rounded-lg text-sm"
									/>
									<span className="text-neutral">-</span>
									<input
										type="number"
										placeholder="Max"
										value={priceRange[1]}
										onChange={(e) =>
											setPriceRange([priceRange[0], Number(e.target.value)])
										}
										className="w-full px-3 py-2 border border-base-300 rounded-lg text-sm"
									/>
								</div>
							</div>
						</FilterSection>

						<FilterSection
							title="Category"
							values={["Men", "Women", "Kids"]}
							selectedValues={selectedCategory}
							onToggle={(value) =>
								setSelectedCategory((prev) =>
									prev.includes(value)
										? prev.filter((item) => item !== value)
										: [...prev, value]
								)
							}
						/>

						<FilterSection
							title="Type"
							values={["Topwear", "Bottomwear", "Winterwear"]}
							selectedValues={selectedSubcategory}
							onToggle={(value) =>
								setSelectedSubcategory((prev) =>
									prev.includes(value)
										? prev.filter((item) => item !== value)
										: [...prev, value]
								)
							}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

const ControlBar = ({
	filterProducts,
	viewMode,
	setViewMode,
	sortType,
	setSortType,
	sortOptions,
	setFilter,
}) => {
	return (
		<Card variant="minimal" className="mb-8">
			<CardContent padding="small">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<span className="text-neutral font-medium">
							{filterProducts.length}{" "}
							{filterProducts.length === 1 ? "product" : "products"}
						</span>
						<div className="flex items-center gap-2">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-2 rounded-lg transition-colors ${
									viewMode === "grid"
										? "bg-primary text-primary-content shadow-sm"
										: "bg-base-200 text-neutral hover:bg-base-300"
								}`}
							>
								<Grid className="w-4 h-4" />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`p-2 rounded-lg transition-colors ${
									viewMode === "list"
										? "bg-primary text-primary-content shadow-sm"
										: "bg-base-200 text-neutral hover:bg-base-300"
								}`}
							>
								<List className="w-4 h-4" />
							</button>
						</div>
					</div>

					<select
						value={sortType}
						onChange={(e) => {
							setSortType(e.target.value);
							setFilter("sort", sortOptions[e.target.value]);
						}}
						className="px-4 py-2 border border-base-300 rounded-xl bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
					>
						<option value="newest">Newest First</option>
						<option value="oldest">Oldest First</option>
						<option value="lowPrice">Price: Low to High</option>
						<option value="highPrice">Price: High to Low</option>
					</select>
				</div>
			</CardContent>
		</Card>
	);
};

const NotFoundCard = ({ resetFilters }) => (
	<Card variant="minimal" className="text-center py-16">
		<CardContent>
			<div className="max-w-md mx-auto">
				<div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
					<Search className="w-8 h-8 text-neutral" />
				</div>
				<CardTitle size="large" className="mb-2">
					No products found
				</CardTitle>
				<p className="text-neutral mb-4">
					Try adjusting your filters or search terms
				</p>
				<Button variant="primary" size="sm" onClick={() => resetFilters}>
					Clear Filters
				</Button>
			</div>
		</CardContent>
	</Card>
);

const FilterSection = ({
	title,
	values,
	selectedValues,
	onToggle,
	children,
}) => (
	<div className="space-y-3">
		<h3 className="text-lg font-semibold text-primary">{title}</h3>
		{children || (
			<div className="space-y-2">
				{values.map((value) => (
					<label
						key={value}
						className="flex items-center gap-3 cursor-pointer group"
					>
						<input
							type="checkbox"
							checked={selectedValues.includes(value)}
							onChange={() => onToggle(value)}
							className="w-4 h-4 text-primary border-base-300 rounded focus:ring-primary/20 transition-colors"
						/>
						<span className="text-neutral group-hover:text-primary transition-colors">
							{value}
						</span>
					</label>
				))}
			</div>
		)}
	</div>
);

export default Collection;
