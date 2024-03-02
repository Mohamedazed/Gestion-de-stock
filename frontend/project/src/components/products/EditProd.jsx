import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function EditProd() {
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

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
                navigate('/products');
            })
            .catch(err => {
                console.error('Error updating product:', err);
            });
    };

    return (
        <div className="container">
            {Object.keys(product).length > 0 && (
                <>
                    <h3>Edit Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" name="name" id="name" value={product.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categorie">Category:</label>
                            <select className="form-control" name="Categorie" id="categorie" value={product.Categorie} onChange={handleChange}>
                                <option value="">Select category...</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="prix">Price:</label>
                            <input type="text" className="form-control" name="Prix" id="prix" value={product.Prix} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantite">Quantity:</label>
                            <input type="text" className="form-control" name="Quantite" id="quantite" value={product.Quantite} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="supplier">Supplier:</label>
                            <select className="form-control" name="supplierName" id="supplierName" value={product.supplierName} onChange={handleChange}>
                                <option value="">Select supplier...</option>
                                {suppliers.map(supp => (
                                    <option key={supp.Code_Supplier} value={supp.Name}>{supp.Name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Update Product</button>
                        <Link to='/products' className='btn btn-secondary m-1'>Cancel</Link>
                    </form>
                </>
            )}
        </div>
    );
}