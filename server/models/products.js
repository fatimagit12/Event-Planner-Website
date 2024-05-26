// models/products.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    // Add more fields as needed
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
