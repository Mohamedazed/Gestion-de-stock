import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ShowProd() {
  const { id } = useParams(); 
  const [product, setProduct] = useState({}); 

  useEffect(() => {
    axios.get(`http://localhost:8081/products/show/${id}`)
      .then(res => { 
        setProduct(res.data.result[0] || {}); 
      })
      .catch(err => {
        console.error('Error fetching product details:', err);
      });
  }, [id]); // Add id as a dependency

  return (
    <div className="container">
      <div style={{ marginTop: '70px' }}>
        <h3>Product Details</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
          / <span><Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Products </Link></span>
          / <span style={{ color: 'gray' }}>Details</span>
        </p>
      </div>

      <div>
        {product ? (
          <div>
            <h2>{product.name}</h2>
            <p><strong className='text text-info'>Category:</strong> {product.Categorie}</p>
            <p><strong className='text text-info'>Price:</strong> {product.Prix}</p>
            <p><strong className='text text-info'>Quantity:</strong> {product.Quantite}</p>
            <p><strong className='text text-info'>Supplier:</strong> {product.supplierName}</p>
            <p className="card-text">Added On: {product.Date_Ajout}</p>
            <Link to='/products' className='btn btn-secondary m-1'>Back</Link>
            <Link to={`/products/edit/${product.Code_Product}`} className='btn btn-primary'>Edit</Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
