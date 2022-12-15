import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQ,
    USER_LOGIN_SUCCESS
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQ,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post("/users/login", { email, password }, config);

        dispatch({
            type: USER_LOGIN_SUCCESS, 
            payload: data
        }); 

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message,
        });
    }
};
