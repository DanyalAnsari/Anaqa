import { SearchIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const Search = () => {
	const navigate = useNavigate();

	const handleSearch = () => {
		navigate("/collection");
	};

	return (
		<div className="dropdown dropdown-end">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors"
				title="Search Products"
			>
				<SearchIcon className="w-5 h-5" />
			</div>
			<div
				tabIndex={0}
				className="dropdown-content z-[1] mt-3 w-80 bg-base-100 rounded-box shadow-lg border border-base-200 p-4"
			>
				<div className="form-control">
					<label className="input input-bordered flex items-center gap-2 focus-within:outline-primary">
						<SearchIcon className="w-4 h-4 opacity-70" />
						<input
							type="search"
							className="grow"
							placeholder="Search products..."
							onKeyDown={() => handleSearch}
							autoFocus
						/>
					</label>
				</div>

				{/* Popular searches */}
				<div className="mt-4">
					<p className="text-xs font-semibold text-base-content/70 mb-2">
						Popular Searches
					</p>
					<div className="flex flex-wrap gap-1">
						{["Electronics", "Fashion", "Home", "Books"].map((tag) => (
							<button
								key={tag}
								className="badge badge-outline badge-sm hover:badge-primary cursor-pointer"
							>
								{tag}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
