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
        prix_sale: '',
        productImage: null 
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProduct(prevProduct => ({
            ...prevProduct,
            productImage: file
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category', product.category);
        formData.append('price', product.price);
        formData.append('quantity', product.quantity);
        formData.append('supplier', product.supplier);
        formData.append('productImage', product.productImage);
        formData.append('prix_sale', product.prix_sale);

        axios.post('http://localhost:8081/products/create', formData)
            .then(res => {
                console.log(res.data);
                navigate('/products');
            })
            .catch(err => {
                console.error('Error creating product:', err);
            });
    };

    return (
        <div className="container">
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
                    <label htmlFor="price">Price for sale:</label>
                    <input type="text" className="form-control" name="prix_sale" id="prix_sale" value={product.prix_sale} onChange={handleChange} />
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
                    <label htmlFor="productImage">Product Image:</label>
                    <input type="file" className="form-control" name="productImage" id="productImage" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary">Create Product</button>
            </form>
        </div>
    );
}
