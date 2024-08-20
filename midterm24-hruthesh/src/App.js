import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginaction } from './actions/loginActions';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import UserDetails from './components/MembersPage';
import Navbar from './components/Navbar'
import ShowProducts from './components/ShowProducts';
import AddCategory from './components/admin/AddCategory';
import AddProducts from './components/admin/AddProducts';
import Admin from './components/Admin';

const App = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.auth);

    useEffect(() => {
    }, []);

    const PrivateRoute = ({ element, ...rest }) => {
        return user ? element : <Navigate to="/login" />;
    };
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/Home" element={<ShowProducts />} />
                <Route path="/Home/:id" element={<ShowProducts />} />
                <Route path="/admin" element={<Admin />}>
                    <Route path="addcategory" element={<AddCategory />} />
                    <Route path="addproducts" element={<AddProducts />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/members" element={<PrivateRoute element={<UserDetails />} />} />
                <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
            </Routes>
        </Router>
    );
};

export default App;
