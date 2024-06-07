import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, loadUser } from '../actions/authActions';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) {
            dispatch(loadUser());
        }
    }, [user, dispatch]);

    const onLogout = () => {
        dispatch(logout());
        navigate('/');
    };

   const authLinks = (
    <ul className="flex space-x-4">
    <li>
        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
    </li>
    {user && user.role === 'admin' && (
        <li>
            <Link to="/profile" className="text-gray-700 hover:text-gray-900">Profile</Link>
        </li>
    )}
    <li>
        <button onClick={onLogout} className="text-gray-700 hover:text-gray-900">Logout</button>
    </li>
</ul>
    );

    const guestLinks = (
        <ul className="flex space-x-4">
            <li>
                <Link to="/signup" className="text-gray-700 hover:text-gray-900">Sign Up</Link>
            </li>
            <li>
                <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link to="/" className="text-gray-800">Auth App</Link>
                </h1>
                <div>{isAuthenticated ? authLinks : guestLinks}</div>
            </div>
        </nav>
    );
};

export default Navbar;
