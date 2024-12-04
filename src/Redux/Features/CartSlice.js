import { createSlice } from "@reduxjs/toolkit"
import { api } from "../Api/Service";

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        quantity: 0,
        totalPrice: 0,
        products: [],
        id: null,
        userId: null
    },
    extraReducers: (builder) => {
        // builder.addMatcher( api.endpoints.cart.matchFulfilled, (state, { payload }) => {
        //     state.quantity = payload.quantity
        //     state.id = payload.userId
        //     state.totalPrice = payload.totalPrice
        //     state.products = payload.products
        //     state.userId = payload.userId
        // }).addMatcher( api.endpoints.addToCart.matchFulfilled, (state, { payload }) => {
        //     state.quantity = payload.numOfCartItems
        //     state.totalPrice = payload.data.totalCartPrice
        //     state.products = payload.data.products
        // }).addMatcher( api.endpoints.removeFromCart.matchFulfilled, (state, { payload }) => {
        //     console.log(payload);
        //     state.quantity = payload.numOfCartItems
        //     state.totalPrice = payload.data.totalCartPrice
        //     state.products = payload.data.products
        // });
    }
});

export default CartSlice.reducer;
