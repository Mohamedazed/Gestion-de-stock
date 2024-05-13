import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowProdModal = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1); 
  const [values, setValues] = useState([])
  const navigate = useNavigate()

  const addToCart = (e) => {
    e.preventDefault();
  
    const created_at = new Date().toISOString();
    setValues([...values,{product_id: product.Code_Product,
      name: product.name,
      price: product.prix_sale,
      quantity: quantity,
      created_at: created_at}])
      console.log(values)
      
      axios.post('http://localhost:8081/cart/add', {
        product_id: product.Code_Product,
        name: product.name,
        price: product.prix_sale,
        quantity: quantity,
        created_at: created_at,
        image: product.Product_Image
      })
      .then(res => {
          console.log(res);
          navigate('/panier')
      })
      .catch(err =>  {console.log(err)});
    };
  
    const handleIncrement = () => {
      if (quantity < product.Quantite) {
        setQuantity(quantity + 1);
      }
    };
  
    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    const formatNumber = (value) => {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      } else {
        return value;
      }
    };

  return (
    <div className="modal show d-block " tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block', width: '100%' }}>
      {/* Modal content */}
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {/* Modal body */}
          <div className="modal-body ">
            {/* Product information */}
            <div className='text-center'>
              <div className='border rounded-5 d-inline-block'>
                <img src={`http://localhost:8081/${product.Product_Image.replace(/\\/g, '/')}`} alt="Product" height='200px' className='rounded-5 shadow-sm' />
              </div>
            </div>
            <div className='text-center mt-2'>
            <div className='d-flex justify-content-center my-2 border  shadow-sm rounded-4 w-50 pt-1 bg-light ' style={{marginLeft:'25%'}}>
                <h5 className="card-text me-2" style={{ textDecoration: product.Quantite === 0 ? 'line-through' : 'none' }}><b className='text-warning'>{product.prix_sale} DH</b> </h5>
                <small className='mt-1 text-secondary' style={{ textDecoration: 'line-through'  }}> {product.Prix} DH</small> 
            </div>
            <div className='text-center mb-2 border  rounded-5 p-3 bg-light shadow-sm'>
              <p className='ms-3'> 
                <h2 className='text-center'>{product.name}</h2>
                <div className='d-flex justify-content-start '>This product from {product.supplierName} belong to {product.Categorie} category. </div>
              </p>
            </div>
            </div>
            <div className='text-center border  rounded-5 p-3 bg-light shadow'>
              <button className='btn btn-warning me-2 text-center p-1' style={{ width: '30px', height: '30px' }} onClick={handleIncrement}>+</button>
              <input type='text' value={quantity} style={{ width: '50px', padding: '3px' }} className='shadow text-center' readOnly />
              <button className='btn btn-warning ms-2 text-center p-1' style={{ width: '30px', height: '30px' }} onClick={handleDecrement}>-</button>
              <p style={{ color: 'gray' }} className='mt-2'>Available quantity: {product.Quantite} pieces</p>
              {/* Add to Cart button */}
              <button onClick={addToCart} className="btn bg-primary-subtle shadow btn-lg" style={{ width: '100%' }}>Add to Panier <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-bag-plus-fill mb-2" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"/></svg> </button>
            </div>
          </div>
          {/* Modal footer */}
          <div className="modal-footer border ">
            <button onClick={onClose} className="btn btn-warning btn-lg" style={{ width: '100%' }}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProdModal;