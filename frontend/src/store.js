// - INFO

/**
 * Redux store is a state container which holds the applications state
 * configureStore sets up a redux store with a single function call
 * this also includes combining reducers, middleware( thunk ) and devtools intergration
 * Redux Thunk is middleware
 * Thunk allows you to dispatch actions manually
 * this allows us to run some code before dispatching the relevant action ( i.e. USER_LOADED)
 */

import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const getItemsFromLocalStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
    },
    initialState: {
        cart: { cartItems: getItemsFromLocalStorage },
    },
    middleware: [thunk],
});

export default store;
