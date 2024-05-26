import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleEdit = (productId) => {
        // Add your edit functionality here
        console.log(`Editing product with ID: ${productId}`);
    };

    const handleDelete = (productId) => {
        // Add your delete functionality here
        console.log(`Deleting product with ID: ${productId}`);
    };

    return (
        <div>
            <h2>Products</h2>
            {products.map(product => (
                <div key={product._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ marginRight: '10px' }}>
                        <strong>Name:</strong> {product.name} | <strong>Description:</strong> {product.description} | <strong>Price:</strong> ${product.price}
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <button onClick={() => handleEdit(product._id)}>Edit</button>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
