import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ShowProdModal from './modalsProd/ShowProdModal';

export default function ShowProd() {
  const { id } = useParams(); 
  const [product, setProduct] = useState({}); 
  const [isShowModalOpen, setShowModalOpen] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8081/products/show/${id}`)
      .then(res => { 
        setProduct(res.data.result[0] || {}); 
      })
      .catch(err => {
        console.error('Error fetching product details:', err);
      });
  }, [id]);

  const closeShowModal = () => {
    setShowModalOpen(false);
  };

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

      {product !== null ? (
        <div className='p-2'>
        {
                Array.isArray(product) && product.length > 0 ? (
                    product.map((p, index)=>(
                      <ul key={index}>
                        <ShowProdModal isOpen={isShowModalOpen} onClose={closeShowModal} details={p} />
                      </ul>
                      )) 
                      ):null
            }
      </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}
