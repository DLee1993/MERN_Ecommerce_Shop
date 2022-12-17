import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQ,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQ,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQ,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQ,
    USER_UPDATE_PROFILE_SUCCESS,
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

// - the below switch statement checks the
// - dispatch that is sent back and returns the relevant data based on the dispatch
export const userRegisterReducer = (state = {}, action) => {
    const { payload } = action;
    switch (action.type) {
        case USER_REGISTER_REQ:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { userInfo: payload, loading: false };
        case USER_REGISTER_FAIL:
            return { error: payload, loading: false };
        default:
            return state;
    }
};

// - the below switch statement checks the
// - dispatch that is sent back and returns the relevant data based on the dispatch
export const userDetailsReducer = (state = { user: {} }, action) => {
    const { payload } = action;
    switch (action.type) {
        case USER_DETAILS_REQ:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return { user: payload, loading: false };
        case USER_DETAILS_FAIL:
            return { error: payload, loading: false };
        default:
            return state;
    }
};

// - the below switch statement checks the
// - dispatch that is sent back and returns the relevant data based on the dispatch
export const userUpdateProfileReducer = (state = {}, action) => {
    const { payload } = action;
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQ:
            return { loading: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { userInfo: payload, success: true, loading: false };
        case USER_UPDATE_PROFILE_FAIL:
            return { error: payload, loading: false };
        default:
            return state;
    }
};
