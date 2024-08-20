
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/registerActions';

const initialState = {
    user: null,
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload, userId: action.payload.userId, loading: false, error: null };
        case 'LOGIN_FAIL':
            return { ...state, user: null, userId: null, loading: false, error: action.payload };
        case 'LOGIN_REQUEST':
            return { ...state, loading: true };
        case 'LOGOUT':
            return { ...state, user: null, userId: null, loading: false, error: null };
        case REGISTER_REQUEST:
            return { ...state, loading: true, error: null };
        case REGISTER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        case REGISTER_FAILURE:
            return { ...state, user: null, loading: false, error: action.payload || action.error };
        default:
            return state;
    }
};


export default authReducer;
