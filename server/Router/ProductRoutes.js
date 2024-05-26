// Router/ProductRoutes.js

const express = require('express');
const router = express.Router();
const ProductModel = require('../models/products');

// GET all products
router.get('/products', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET product by ID
router.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST a new product
router.post('/products', async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const newProduct = await ProductModel.create({ name, description, price });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT update product by ID
router.put('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const { name, description, price } = req.body;

    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, { name, description, price }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE product by ID
router.delete('/products/:productId', async (req, res) => {
    const productId = req.params.productId;

    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

