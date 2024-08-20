import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../actions/registerActions';
import axios from 'axios';
import { TextField, Button, CircularProgress, Box, Typography, MenuItem, Snackbar, Alert, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Person, Email, Lock, AssignmentInd } from '@mui/icons-material';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        username: '',
        password: '',
        role: '',
    });
    const [roles, setRoles] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { loading, error, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/roles');
                setRoles(response.data.roles);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        if (!loading && user) {
            setSnackbarMessage('Registration successful! Redirecting to login...');
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    }, [loading, user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerAction(formData));
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            component="form"
            sx={{ maxWidth: 400, margin: '0 auto', padding: 2, borderRadius: 2, boxShadow: 2, backgroundColor: '#fff' }}
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" gutterBottom align="center">
                User Registration
            </Typography>
            <TextField
                label="Display Name"
                name="displayName"
                fullWidth
                margin="normal"
                value={formData.displayName}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Person />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Email />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                label="Username"
                name="username"
                fullWidth
                margin="normal"
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Person />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                select
                label="Role"
                name="role"
                fullWidth
                margin="normal"
                value={formData.role}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Person />
                        </InputAdornment>
                    ),
                }}
            >
                <MenuItem value="">Select Role</MenuItem>
                {roles.map(role => (
                    <MenuItem key={role._id} value={role._id}>
                        {role.name}
                    </MenuItem>
                ))}
            </TextField>
            {error && <Typography color="error" align="center" sx={{ mt: 2 }}>{error}</Typography>}
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RegistrationPage;
