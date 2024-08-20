import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Box, Container, TextField, Button, Typography, MenuItem, CircularProgress, Snackbar, Alert } from '@mui/material';

const validationSchema = Yup.object({
    code: Yup.string().required("Product Code is required"),
    name: Yup.string()
        .min(3, "Product Name must be at least 3 characters")
        .max(30, "Product Name cannot exceed 30 characters")
        .required("Product Name is required"),
    excerpt: Yup.string().required("Excerpt is required"),
    description: Yup.string()
        .min(30, "Description must be at least 30 characters")
        .max(500, "Description cannot exceed 500 characters")
        .required("Description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
        .min(0, "Price must be zero or greater")
        .max(100000, "Price cannot exceed 100,000")
        .required("Price is required"),
    stock: Yup.number()
        .min(0, "Stock must be zero or greater")
        .required("Stock is required")
});

const AddProducts = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/categories");
                setCategories(response.data.categories);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            await axios.post("http://localhost:3000/api/v1/products", values);
            setSnackbarMessage('Product successfully added!');
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/admin');
            }, 3000);
            resetForm();
        } catch (err) {
            console.error(err);
            setSnackbarMessage('Failed to add product. Please try again.');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const sixDigitCode = () => {
        const uuid = uuidv4();
        return uuid.slice(0, 6);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md">
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
                    Add Product
                </Typography>
                <Formik
                    initialValues={{
                        code: "",
                        name: "",
                        excerpt: "",
                        description: "",
                        category: "",
                        price: "",
                        stock: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <Field name="code">
                                {({ field, form }) => (
                                    <TextField
                                        fullWidth
                                        label="Product Code"
                                        variant="outlined"
                                        {...field}
                                        error={form.touched.code && Boolean(form.errors.code)}
                                        helperText={form.touched.code && form.errors.code}
                                        margin="normal"
                                        InputProps={{
                                            endAdornment: (
                                                <Button
                                                    type="button"
                                                    variant="outlined"
                                                    onClick={() => setFieldValue('code', sixDigitCode())}
                                                >
                                                    Add Code
                                                </Button>
                                            ),
                                        }}
                                    />
                                )}
                            </Field>
                            <Field name="name">
                                {({ field, form }) => (
                                    <TextField
                                        fullWidth
                                        label="Product Name"
                                        variant="outlined"
                                        {...field}
                                        error={form.touched.name && Boolean(form.errors.name)}
                                        helperText={form.touched.name && form.errors.name}
                                        margin="normal"
                                    />
                                )}
                            </Field>
                            <Field name="excerpt">
                                {({ field, form }) => (
                                    <TextField
                                        fullWidth
                                        label="Excerpt"
                                        variant="outlined"
                                        {...field}
                                        error={form.touched.excerpt && Boolean(form.errors.excerpt)}
                                        helperText={form.touched.excerpt && form.errors.excerpt}
                                        margin="normal"
                                    />
                                )}
                            </Field>
                            <Field name="description">
                                {({ field, form }) => (
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        {...field}
                                        error={form.touched.description && Boolean(form.errors.description)}
                                        helperText={form.touched.description && form.errors.description}
                                        margin="normal"
                                    />
                                )}
                            </Field>
                            <Field name="category">
                                {({ field, form }) => (
                                    <TextField
                                        fullWidth
                                        label="Category"
                                        select
                                        variant="outlined"
                                        {...field}
                                        error={form.touched.category && Boolean(form.errors.category)}
                                        helperText={form.touched.category && form.errors.category}
                                        margin="normal"
                                    >
                                        <MenuItem value="">Select Category</MenuItem>
                                        {categories.map(category => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            </Field>
                            <Field name="price">
                                {({ field, form }) => (
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        type="number"
                                        variant="outlined"
                                        {...field}
                                        error={form.touched.price && Boolean(form.errors.price)}
                                        helperText={form.touched.price && form.errors.price}
                                        margin="normal"
                                    />
                                )}
                            </Field>
                            <Field name="stock">
                                {({ field, form }) => (
                                    <TextField
                                        fullWidth
                                        label="Stock"
                                        type="number"
                                        variant="outlined"
                                        {...field}
                                        error={form.touched.stock && Boolean(form.errors.stock)}
                                        helperText={form.touched.stock && form.errors.stock}
                                        margin="normal"
                                    />
                                )}
                            </Field>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting || loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
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

export default AddProducts;
