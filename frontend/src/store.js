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
import { productListReducer } from "./reducers/productReducers";

const store = configureStore({
    reducer: {
        productList: productListReducer,
    },
    initialState: {},
    middleware: [thunk],
});

export default store;
