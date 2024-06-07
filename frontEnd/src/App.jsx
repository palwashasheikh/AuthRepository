import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './actions/authActions';
import Navbar from './components/Navbar';
import SignUp from './components/Signup';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <div className="bg-violet-300  min-h-screen">
                    <Navbar />
                    <div className="container mx-auto p-4">
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
