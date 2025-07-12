// store/slices/cartSlice.js
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../api/cartApi";

const initialState = {
	items: [],
	shippingAddress: null,
	selectedShippingOption: null,
	lastUpdated: null,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		// Local cart management (for offline/optimistic updates)
		addToCart: (state, action) => {
			const { productId, name, price, quantity, image, size } = action.payload;

			const existingItem = state.items.find(
				(item) => item.productId === productId && item.size === size
			);

			if (existingItem) {
				existingItem.quantity += quantity;
			} else {
				state.items.push({
					productId,
					name,
					price,
					quantity,
					image,
					size,
					addedAt: new Date().toISOString(),
				});
			}

			state.lastUpdated = new Date().toISOString();
		},

		removeFromCart: (state, action) => {
			const { productId, size, color } = action.payload;

			state.items = state.items.filter(
				(item) =>
					!(
						item.productId === productId &&
						item.size === size &&
						item.color === color
					)
			);

			state.lastUpdated = new Date().toISOString();
		},

		updateQuantity: (state, action) => {
			const { productId, quantity, size, color } = action.payload;

			const itemToUpdate = state.items.find(
				(item) =>
					item.productId === productId &&
					item.size === size &&
					item.color === color
			);

			if (itemToUpdate) {
				if (quantity <= 0) {
					state.items = state.items.filter((item) => item !== itemToUpdate);
				} else {
					itemToUpdate.quantity = quantity;
				}
			}

			state.lastUpdated = new Date().toISOString();
		},

		clearCart: (state) => {
			state.items = [];
			state.coupons = [];
			state.lastUpdated = new Date().toISOString();
		},

		// Coupon management
		addCoupon: (state, action) => {
			const coupon = action.payload;
			const existingCoupon = state.coupons.find((c) => c.code === coupon.code);

			if (!existingCoupon) {
				state.coupons.push({
					...coupon,
					appliedAt: new Date().toISOString(),
				});
			}
		},

		removeCoupon: (state, action) => {
			const { couponCode } = action.payload;
			state.coupons = state.coupons.filter((c) => c.code !== couponCode);
		},

		// Shipping management
		setShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
		},

		setSelectedShippingOption: (state, action) => {
			state.selectedShippingOption = action.payload;
		},


	},

	// Handle RTK Query actions
	extraReducers: (builder) => {
		builder
			// Handle successful cart fetch
			.addMatcher(cartApi.endpoints.getCart.matchFulfilled, (state, action) => {
				state.items = action.payload.items;
				state.coupons = action.payload.coupons || [];
				state.syncStatus = "success";
				state.validationErrors = [];
				state.lastUpdated = new Date().toISOString();
			})
			// Handle cart fetch error
			.addMatcher(cartApi.endpoints.getCart.matchRejected, (state, action) => {
				state.syncStatus = "error";
				console.error("Failed to fetch cart:", action.error);
			})
	},
});

export const {
	addToCart,
	removeFromCart,
	updateQuantity,
	clearCart,
	addCoupon,
	removeCoupon,
	setShippingAddress,
	setSelectedShippingOption,
	setNotes,
	updatePreferences,
	setSyncStatus,
	setValidationErrors,
	bulkUpdateItems,
	moveToWishlist,
	restoreCart,
	mergeCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Enhanced selectors
const selectCartItems = (state) => state.cart.items;
const selectCartCoupons = (state) => state.cart.coupons;
const selectShippingAddress = (state) => state.cart.shippingAddress;
const selectSelectedShippingOption = (state) =>
	state.cart.selectedShippingOption;

// Basic cart summary
export const cartSummary = createSelector(
	[selectCartItems, selectCartCoupons, selectSelectedShippingOption],
	(items, coupons, shippingOption) => {
		const totalQuantity = items.reduce(
			(total, item) => total + item.quantity,
			0
		);
		const subtotal = items.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);

		// Calculate total discount from coupons
		const totalDiscount = coupons.reduce((total, coupon) => {
			if (coupon.type === "percentage") {
				return total + (subtotal * coupon.value) / 100;
			} else if (coupon.type === "fixed") {
				return total + coupon.value;
			}
			return total;
		}, 0);

		// Calculate shipping cost
		const shippingCost = shippingOption?.cost || (subtotal > 500 ? 0 : 50);

		// Calculate tax (18% GST)
		const taxableAmount = subtotal - totalDiscount;
		const tax = Math.round(taxableAmount * 0.18);

		const total = subtotal - totalDiscount + shippingCost + tax;

		return {
			totalQuantity,
			subtotal,
			discount: totalDiscount,
			shipping: shippingCost,
			tax,
			total,
			items,
			savings: totalDiscount,
			freeShippingThreshold: 500,
			amountForFreeShipping: Math.max(0, 500 - subtotal),
		};
	}
);

// Cart item selectors
export const selectCartItemById = createSelector(
	[selectCartItems, (state, productId) => productId],
	(items, productId) => items.find((item) => item.productId === productId)
);

export const selectCartItemsByCategory = createSelector(
	[selectCartItems, (state, category) => category],
	(items, category) => items.filter((item) => item.category === category)
);

// Cart status selectors
export const selectCartStatus = createSelector(
	[(state) => state.cart],
	(cart) => ({
		isEmpty: cart.items.length === 0,
		itemCount: cart.items.length,
		totalQuantity: cart.items.reduce((total, item) => total + item.quantity, 0),
		lastUpdated: cart.lastUpdated,
		syncStatus: cart.syncStatus,
		hasValidationErrors: cart.validationErrors.length > 0,
		validationErrors: cart.validationErrors,
	})
);

// Shipping selectors
export const selectShippingInfo = createSelector(
	[selectShippingAddress, selectSelectedShippingOption],
	(address, option) => ({
		address,
		option,
		hasAddress: !!address,
		hasShippingOption: !!option,
	})
);

// Coupon selectors
export const selectCouponsInfo = createSelector(
	[selectCartCoupons],
	(coupons) => ({
		coupons,
		activeCoupons: coupons.filter((c) => c.active !== false),
		totalSavings: coupons.reduce(
			(total, coupon) => total + (coupon.discount || 0),
			0
		),
	})
);

// Cart validation selector
export const selectCartValidation = createSelector(
	[selectCartItems, (state) => state.cart.validationErrors],
	(items, errors) => {
		const outOfStockItems = items.filter((item) => !item.inStock);
		const invalidQuantityItems = items.filter((item) => item.quantity <= 0);

		return {
			isValid:
				errors.length === 0 &&
				outOfStockItems.length === 0 &&
				invalidQuantityItems.length === 0,
			errors,
			outOfStockItems,
			invalidQuantityItems,
			canCheckout:
				items.length > 0 && errors.length === 0 && outOfStockItems.length === 0,
		};
	}
);

// Recently added items selector
export const selectRecentlyAddedItems = createSelector(
	[selectCartItems],
	(items) => {
		const now = new Date();
		const oneHourAgo = new Date(now - 60 * 60 * 1000);

		return items
			.filter((item) => item.addedAt && new Date(item.addedAt) > oneHourAgo)
			.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
	}
);

// Cart recommendations selector (items that go well together)
export const selectCartRecommendations = createSelector(
	[selectCartItems],
	(items) => {
		// This would typically come from an API, but here's a simple example
		const categories = [...new Set(items.map((item) => item.category))];
		const brands = [...new Set(items.map((item) => item.brand))];

		return {
			categories,
			brands,
			suggestedCategories:
				categories.length > 0 ? ["accessories", "shoes"] : [],
			crossSellOpportunities: items.length > 0,
		};
	}
);
