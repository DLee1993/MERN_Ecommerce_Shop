import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQ,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from "../constants/userConstants";
    
// - the below switch statement checks the
// - dispatch that is sent back and returns the relevant data based on the dispatch
export const userLoginReducer = (state = {}, action) => {
    const { payload } = action;
    switch (action.type) {
        case USER_LOGIN_REQ:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { userInfo: payload, loading: false };
        case USER_LOGIN_FAIL:
            return { error: payload, loading: false };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};
