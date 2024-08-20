import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const userId = location.state?.userId;

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`);
                    setUser(response.data.user);
                    setLoading(false);
                } catch (error) {
                    setError('Error fetching user details.');
                    setLoading(false);
                }
            };

            fetchUser();
        } else {
            setError('No user ID provided.');
            setLoading(false);
        }
    }, [userId]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Your Details
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {user ? (
                <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                    <Typography variant="h6">Display Name: {user.displayName}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Username: {user.username}</Typography>
                    <Typography>Role: {user.role.name}</Typography>
                </Box>
            ) : (
                <Typography>No user details available.</Typography>
            )}
        </Box>
    );
};

export default UserDetails;
