// - INFO

/**
 * Redux store is a state container which holds the applications state
 * configureStore sets up a redux store with a single function call
 * this also includes combining reducers, middleware( thunk ) and devtools intergration
 * Redux Thunk is middleware
 * Thunk allows you to dispatch actions manually
 * this allows us to run some code before dispatching the relevant action ( i.e. USER_LOADED)
 */

//!!!! USE THIS FOR YOUR PROJECT

import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from "./reducers/userReducers";

const getItemsFromLocalStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const initialState = {
    cart: { cartItems: getItemsFromLocalStorage, shippingAddress: shippingAddressFromLocalStorage },
    userLogin: { userInfo: userInfoFromLocalStorage },
};

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        updateUserProfile: userUpdateProfileReducer,
    },
    preloadedState: initialState,
    middleware: [thunk],
});

export default store;
