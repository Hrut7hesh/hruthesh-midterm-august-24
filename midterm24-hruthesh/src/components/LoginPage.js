import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, CircularProgress, Box, Typography, Snackbar, Alert } from '@mui/material';
import { loginaction } from '../actions/loginActions';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error, userId } = useSelector(state => state.auth);

    useEffect(() => {
        if (userId) {
            navigate('/members', { state: { userId } });
        }
    }, [userId, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(loginaction(formData))
            .then(() => {
                setLoading(false);
                if (!userId) {
                    setSnackbarMessage('User ID not found');
                    setOpenSnackbar(true);
                }
            })
            .catch((err) => {
                setLoading(false);
                setSnackbarMessage(error || 'Login failed');
                setOpenSnackbar(true);
            });
    };

    return (
        <Box
            component="form"
            sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Username"
                name="username"
                fullWidth
                margin="normal"
                value={formData.username}
                onChange={handleChange}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
            />
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginPage;
