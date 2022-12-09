import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
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

// - the below switch statement checks the
// - dispatch that is sent back and returns the relevant data based on the dispatch
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    const { payload } = action;
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };
        case PRODUCT_DETAILS_SUCCESS:
            return { product: payload, loading: false };
        case PRODUCT_DETAILS_FAIL:
            return { error: payload, loading: false };
        default:
            return state;
    }
};
