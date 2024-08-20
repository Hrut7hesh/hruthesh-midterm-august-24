import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name cannot exceed 30 characters')
    .required('Name is required'),
  description: Yup.string()
    .min(50, 'Description must be at least 50 characters')
    .max(500, 'Description cannot exceed 500 characters')
    .required('Description is required')
});

const AddCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/api/v1/categories', values);
        console.log('Response:', response); 
        setSnackbarMessage('Category Created Successfully!! :)');
        setOpenSnackbar(true);
        setTimeout(() => navigate('/Category'), 3000);
      } catch (error) {
        console.error('Error creating category:', error);
        setSnackbarMessage('Failed to create category. Please try again.');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    }
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Create Category
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            {...formik.getFieldProps('description')}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Create'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/Category')}
            >
              Cancel
            </Button>
          </Box>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AddCategory;
