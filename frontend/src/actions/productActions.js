import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
    try {
        // - dispatch that its loading the reques
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        });

        // - make the request to the backend
        const { data } = await axios.get("/products");

        // - if the request is successful then dispatch success
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // - if it fails send the dispatch fail
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error,
        });
    }
};
