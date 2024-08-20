import React, { useEffect ,Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginaction } from './actions/loginActions';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import UserDetails from './components/MembersPage';
import Navbar from './components/Navbar'
import ShowProducts from './components/ShowProducts';
const Admin = lazy(() => import('./components/Admin'));
const AddCategory = lazy(() => import('./components/admin/AddCategory'));
const AddProducts = lazy(() => import('./components/admin/AddProducts'));

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
                <Route
                    path="/admin"
                    element={
                        <Suspense fallback={<div>Loading Admin...</div>}>
                            <PrivateRoute element={<Admin />} />
                        </Suspense>
                    }
                >
                    <Route
                        path="addcategory"
                        element={
                            <Suspense fallback={<div>Loading Add Category...</div>}>
                                <AddCategory />
                            </Suspense>
                        }
                    />
                    <Route
                        path="addproducts"
                        element={
                            <Suspense fallback={<div>Loading Add Products...</div>}>
                                <AddProducts />
                            </Suspense>
                        }
                    />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/members" element={<PrivateRoute element={<UserDetails />} />} />
            </Routes>
        </Router>
    );
};

export default App;
