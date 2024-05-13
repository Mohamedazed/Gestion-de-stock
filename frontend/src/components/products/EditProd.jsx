import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Products from './Products';
import EditProdModal from './modalsProd/EditProdModal';

export default function EditProd() {
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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

        // Fetch product details to edit
        axios.get(`http://localhost:8081/products/show/${id}`)
            .then(res => {
                setProduct(res.data.result[0] || {});
            })
            .catch(err => {
                console.error('Error fetching product details:', err);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8081/products/edit/${id}`, product)
            .then(res => {
                console.log(res.data);
                setIsSuccessModalOpen(false);
                alert('Product updated successfully')
                // navigate('/purchases');
            })
            .catch(err => {
                console.error('Error updating product:', err);
            });
    };

    return (
        <div className="container">
            <Products/>
            <EditProdModal isOpen={setIsSuccessModalOpen(true)} product={product} handleChange={handleChange} handleSubmit={handleSubmit} categories={categories} suppliers={suppliers}/>
        </div>
    );
}