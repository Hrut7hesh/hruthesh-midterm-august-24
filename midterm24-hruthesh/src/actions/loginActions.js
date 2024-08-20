import axios from 'axios';

export const loginaction = (userData) => async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
        const response = await axios.post('http://localhost:3000/api/v1/auth/login', userData);
        const userId = response.data.user._id;
        dispatch({ type: 'LOGIN_SUCCESS', payload: { ...response.data, userId } });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    }
};

