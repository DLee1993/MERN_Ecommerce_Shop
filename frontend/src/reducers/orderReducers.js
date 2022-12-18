import {
    ORDER_CREATE_REQ,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQ,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQ,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_MY_ORDERS_REQ,
    ORDER_LIST_MY_ORDERS_SUCCESS,
    ORDER_LIST_MY_ORDERS_FAIL,
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

export const orderPayReducer = (state = {}, action) => {
    const { payload } = action;
    switch (action.type) {
        case ORDER_PAY_REQ:
            return { loading: true };
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PAY_FAIL:
            return { loading: false, error: payload };
        case ORDER_PAY_RESET:
            return {};
        default:
            return { ...state };
    }
};

export const orderListMyOrdersReducer = (state = { orders: [] }, action) => {
    const { payload } = action;
    switch (action.type) {
        case ORDER_LIST_MY_ORDERS_REQ:
            return { loading: true };
        case ORDER_LIST_MY_ORDERS_SUCCESS:
            return { loading: false, orders: payload };
        case ORDER_LIST_MY_ORDERS_FAIL:
            return { loading: false, error: payload };
        default:
            return { ...state };
    }
};
