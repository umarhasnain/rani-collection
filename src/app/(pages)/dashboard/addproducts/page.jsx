// pages/admin/products.js
"use client";

import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, storage } from '@/firebase/FirebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  Box, Button, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Typography, Dialog, DialogActions,
  DialogContent, DialogTitle, useMediaQuery
} from '@mui/material';
import { Edit, Delete, CloudUpload } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProducts() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({ name: '', price: '', description: '', imageUrls: [] });
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsArray = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(productsArray);
    });
    return unsubscribe;
  }, []);

  const handleOpen = (product = null) => {
    setEditingProduct(product);
    setProductData(product || { name: '', price: '', description: '', imageUrls: [] });
    setImageFiles([]);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => setProductData({ ...productData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => setImageFiles([...e.target.files]);

  const handleSubmit = async () => {
    try {
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const imageRef = ref(storage, `products/${file.name}`);
          const uploadResult = await uploadBytes(imageRef, file);
          return await getDownloadURL(uploadResult.ref);
        })
      );

      const updatedData = { ...productData, imageUrls };

      if (editingProduct) {
        await updateDoc(doc(db, "products", editingProduct.id), updatedData);
        toast.success("Product updated successfully!");
      } else {
        await addDoc(collection(db, "products"), updatedData);
        toast.success("Product added successfully!");
      }

      setOpen(false);
    } catch (error) {
      toast.error("Error saving product: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product: " + error.message);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f7f7fa' }}>
      <ToastContainer />
      <Typography variant="h4" sx={{ mb: 3, color: '#1D1743' }}>Admin Products</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{ mb: 2, backgroundColor: '#1D1743' }}
      >
        Add Product
      </Button>
      
      <TableContainer component={Paper} sx={{ mt: 3, overflowX: isMobile ? 'scroll' : 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>PKR.{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {product.imageUrls.map((url, index) => (
                        <img key={index} src={url} alt={product.name} style={{ width: 60, height: 60 }} />
                      ))}
                    </Box>
                  ) : (
                    "No Images"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(product)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: '#1D1743' }}>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ backgroundColor: '#1D1743', color: 'white', mb: 2 }}
            startIcon={<CloudUpload />}
          >
            Upload Images
            <input type="file" multiple hidden onChange={handleImageChange} />
          </Button>
          {imageFiles.length > 0 && (
            <Typography variant="body2" color="textSecondary">
              Selected files: {imageFiles.length}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#1D1743', color: 'white' }}>
            {editingProduct ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddProducts;
