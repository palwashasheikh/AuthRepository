import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/authActions';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user' // default role
    });

    const { username, email, password, role } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate('/login'); // Redirect to login page upon successful signup
        }
    }, [auth.isAuthenticated, navigate]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(signup({ username, email, password, role }));
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
            <form onSubmit={e => onSubmit(e)} className="space-y-4">
                <div>
                    <input type="text" placeholder="Username" name="username" value={username} onChange={e => onChange(e)} required className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select name="role" value={role} onChange={onChange} className="w-full p-2 border border-gray-300 rounded" required>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Sign Up</button>
            </form>
            {auth.error && <div className="mt-4 text-red-500">{auth.error}</div>}
        </div>
    );
};

export default SignUp;
