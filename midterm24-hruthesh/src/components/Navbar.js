import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { loginaction } from '../actions/loginActions';

const Title = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    textAlign: 'center',
}));

const NavLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: 'inherit',
    margin: '0 15px', 
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#000',
}));

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <StyledAppBar position="static">
            <Toolbar>
                <Title variant="h6">
                    Ecommerce App
                </Title>
                <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                    <Button color="inherit">
                        <NavLink to="/home">Home</NavLink>
                    </Button>
                    {!user ? (
                        <>
                            <Button color="inherit">
                                <NavLink to="/register">Registration</NavLink>
                            </Button>
                            <Button color="inherit">
                                <NavLink to="/login">Login</NavLink>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit">
                                <NavLink to="/members">Members</NavLink>
                            </Button>
                            <Button color="inherit">
                                <NavLink to="/admin">Admin</NavLink>
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    )}
                </div>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Navbar;
