import {
    ORDER_CREATE_REQ,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQ,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    const { payload } = action;
    switch (action.type) {
        case ORDER_CREATE_REQ:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: payload };
        default:
            return { ...state };
    }
};

export const orderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action
) => {
    const { payload } = action;
    switch (action.type) {
        case ORDER_DETAILS_REQ:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: payload };
        default:
            return { ...state };
    }
};
