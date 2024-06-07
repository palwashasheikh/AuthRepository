import React from 'react';
import { Route, Navigate,Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector(state => state.auth);

    return (
        <Routes>
        <Route
            {...rest}
            element={auth.isAuthenticated ? <Component /> : <Navigate to="/login" />}
        />
        </Routes>
    );
};

export default PrivateRoute;
