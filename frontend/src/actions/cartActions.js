import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/products/${id}`);
    // - dispatch the relevant data from the above call to the product data
    // - we need to get specific data from the product to show in the cart i.e. name and image etc
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    });

    // - Save the cartItems to localStorage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });

    // - Save the cartItems to localStorage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
