import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateProd() {
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        supplier: '',
        created_date: '',
        Product_Image: ''
    });
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing categories
        axios.get('http://localhost:8081/categories')
            .then(res => {
                setCategories(res.data.result);
            })
            .catch(err => {
                console.error('Error fetching categories:', err);
            });

        // Fetch existing suppliers
        axios.get('http://localhost:8081/suppliers')
            .then(res => {
                setSuppliers(res.data.result);
            })
            .catch(err => {
                console.error('Error fetching suppliers:', err);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const created_date = new Date().toISOString();
        axios.post('http://localhost:8081/products/create', {...product,created_date:created_date})
            .then(res => {
                console.log(product);
                navigate('/products')
            })
            .catch(err => {
                console.error('Error creating product:', err);
            });
    };

    return (
        <div className="container mt-4">
            <h3>Create Product</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" name="name" id="name" value={product.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select className="form-control" name="category" id="category" value={product.category} onChange={handleChange}>
                        <option value="">Select category...</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="text" className="form-control" name="price" id="price" value={product.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="text" className="form-control" name="quantity" id="quantity" value={product.quantity} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="supplier">Supplier:</label>
                    <select className="form-control" name="supplier" id="supplier" value={product.supplier} onChange={handleChange}>
                        <option value="">Select supplier...</option>
                        {suppliers.map(supp => (
                            <option key={supp.Code_Supplier} value={supp.Name}>{supp.Name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Product_Image">Product Image:</label>
                    <input type="text" className="form-control" name="Product_Image" id="Product_Image" value={product.Product_Image} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Create Product</button>
            </form>
        </div>
    );
}

