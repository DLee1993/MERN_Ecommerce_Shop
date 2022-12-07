import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

// - the below switch statement checks the 
// - dispatch that is sent back and returns the relevant data based on the dispatch
export const productListReducer = (state = { products: [] }, action) => {
    const { payload } = action;
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { products: payload, loading: false };
        case PRODUCT_LIST_FAIL:
            return { error: payload, loading: false };
        default:
            return state;
    }
};
