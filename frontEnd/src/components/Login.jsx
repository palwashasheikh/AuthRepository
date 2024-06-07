import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login ,loadUser} from '../actions/authActions';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    // Redirect if authenticated
    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate('/Profile');
        }
        else{
            dispatch(loadUser());
        }
    }, [auth.isAuthenticated, dispatch, navigate]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-6">Sign in to your account</h1>
            <form onSubmit={e => onSubmit(e)} className="space-y-6">
                <div>
                    <label className="block text-gray-700">Your email</label>
                    <input
                        type="email"
                        placeholder="name@company.com"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>
                    <div className="text-sm">
                        <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                            Forgot password?
                        </a>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Sign in
                </button>
            </form>
            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Don't have an account yet?{' '}
                    <a href="/signup" className="text-blue-600 hover:text-blue-500">
                        Sign up
                    </a>
                </p>
            </div>
            {auth.error && <div className="mt-4 text-red-500">{auth.error}</div>}
        </div>
    );
};

export default Login;
