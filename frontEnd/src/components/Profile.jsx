import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../actions/authActions';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Profile = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (!auth.user) {
            dispatch(loadUser());
        }
    }, [auth.user, dispatch]);

    // Debugging: Log the auth state
    // console.log('Auth state:', auth);

    // Default profile image URL
    const defaultProfileImage = 'https://via.placeholder.com/150'; // Placeholder image

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
            <div className="flex items-center space-x-4">
                <img
                    src={defaultProfileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                />
                <input
                    type="file"
                    id="profileImageUpload"
                    className="hidden"

                    />
                <label
                    htmlFor="profileImageUpload"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
                >
                    &#x1f4f7; {/* Camera icon */}
                </label>
                <div>
                    <p className="mb-4"><strong>Username:</strong> {auth.user.username}</p>
                    <p className="mb-4"><strong>Email:</strong> {auth.user.email}</p>
                    <p className="mb-4"><strong>Role:</strong> {auth.user.role}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
