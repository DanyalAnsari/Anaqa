import { createSelector, createSlice } from "@reduxjs/toolkit";
import { cartApi } from "./cartApi";

const initialState = {
	items: [
		{
			productId: "abc123",
			name: "Product Name",
			price: 999,
			quantity: 2,
			image: "url.jpg",
		},
	],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const { productId, name, price, quantity, image } = action.payload;

			const existingItem = state.items.find(
				(item) => item.productId === productId
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
				});
			}
		},
		removeFromCart: (state, action) => {
			const { productId } = action.payload;

			state.items = state.items.filter((item) => item.productId !== productId);
		},
		updateQuantity: (state, action) => {
			const { productId, quantity } = action.payload;
			const itemToUpdate = state.items.find(
				(item) => item.productId === productId
			);

			if (itemToUpdate) {
				itemToUpdate.quantity = quantity;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			cartApi.endpoints.getCart.matchFulfilled,
			(state, action) => {
				state.items = action.payload.items;
			}
		);
		builder.addMatcher(
			cartApi.endpoints.getCart.matchRejected,
			(state, action) => {
				state. = action.payload.items;
			}
		);
	},
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

const selectCartItems = (state) => state.cart.items;

export const cartSummary = createSelector([selectCartItems], (items) => {
	const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

	const totalAmount = items.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	return {
		totalAmount,
		totalQuantity,
		items,
	};
});
