import axios from 'axios';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
} from './types';

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

// Helper function to set auth token
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Load User
export const loadUser = () => async dispatch => {
    // Check if token is present in localStorage
    const token = localStorage.getItem('token');
    if (token) {
        setAuthToken(token);
    }

    try {
        const res = await axios.get('/user');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Sign Up
export const signup = ({ username, email, password ,role}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ username, email, password,role });

    try {
        const res = await axios.post('/signup', body, config);
        localStorage.setItem('token', res.data.token);
        setAuthToken(res.data.token);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errorMsg = err.response && err.response.data ? err.response.data.message : 'Signup failed';
        dispatch({
            type: SIGNUP_FAIL,
            payload: errorMsg
        });
    }
};

// Login
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/login', body, config);
        
        console.log('Login response:', res.data);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
      
    } catch (err) {
        console.error('Login error:', err.response);
        const errorMsg = err.response && err.response.data ? err.response.data.message : 'Login failed';
        dispatch({
            type: LOGIN_FAIL,
            payload: errorMsg
        });
    }
};

// Logout
export const logout = () => async dispatch => {
    try {
      await axios.post('/logout'); // Call the backend logout endpoint
      // Clear token from local storage
      localStorage.removeItem('token');
      // Dispatch the LOGOUT action
      dispatch({ type: LOGOUT });
    } catch (err) {
      console.error(err);
      // Handle logout failure if needed
    }
  };