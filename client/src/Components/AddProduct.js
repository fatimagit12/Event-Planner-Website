import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = ({ isViewProductPage }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:3000/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !description || !price) {
            setErrorMessage('Please fill all the fields.');
            return;
        }
        if (editingProduct) {
            axios.put(`http://localhost:3000/api/products/${editingProduct._id}`, { name, description, price })
                .then(response => {
                    console.log('Product updated successfully:', response.data);
                    setProducts(products.map(product =>
                        product._id === editingProduct._id ? response.data : product
                    ));
                    setEditingProduct(null);
                    setName('');
                    setDescription('');
                    setPrice('');
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                });
        } else {
            axios.post('http://localhost:3000/api/products', { name, description, price })
                .then(response => {
                    console.log('Product added successfully:', response.data);
                    setProducts([...products, response.data]);
                    setName('');
                    setDescription('');
                    setPrice('');
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                });
        }
        setErrorMessage('');
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
    };

    const handleDelete = (productId) => {
        axios.delete(`http://localhost:3000/api/products/${productId}`)
            .then(response => {
                console.log('Product deleted successfully');
                setProducts(products.filter(product => product._id !== productId));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    return (
        <div className="product-container">
            <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <div className="form-buttons">
                    <button type="submit" className="btn add-btn">{editingProduct ? 'Update Product' : 'Add Product'}</button>
                    {editingProduct && (
                        <button type="button" className="btn cancel-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
                    )}
                </div>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {products.length > 0 && (
                <div className="product-list">
                    <h2>Product List</h2>
                    <ul>
                        {products.map(product => (
                            <li key={product._id} className="product-item">
                                <strong>{product.name}</strong>: {product.description} - ${product.price}
                                {!isViewProductPage && ( // Conditionally render edit and delete buttons
                                    <div className="item-buttons">
                                        <button className="btn edit-btn" onClick={() => handleEdit(product)}>Update</button>
                                        <button className="btn delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
