// import React from 'react'
// import { Link } from 'react-router-dom';

// const ShowProdModal=({ isOpen, onClose, product }) => {
//     if (!isOpen) {
//         return null;
//       }

//       const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const year = date.getFullYear();
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const day = date.getDate().toString().padStart(2, '0');
//         return `${year}/${month}/${day}`;
//       };
      
//   return (
//     <div className="modal show d-block " tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' ,width: '100%'}}>
//       <div className="modal-dialog modal-dialog-centered " role="document">
//         <div className="modal-content">
//           <div className="modal-body bg-warning-subtle" >
//             <div className='text-center'>
//               <div className='border border-warning d-inline-block'>
//                 <img src={`http://localhost:8081/${product.Product_Image.replace(/\\/g, '/')}`} alt="Product"  height='200px'/>
//               </div>
//             </div>
//             <hr className='border border-warning'/>
//           <div className='text-center'>
//             <h3>{product.name}</h3>
//             <h5 className='text-warning'>{product.Prix}DH</h5>
//             <p>Quantity: {product.Quantite} Pieces | Category: {product.Categorie} | Supplier: {product.supplierName}</p>
//             <p className="card-text">Added On : {formatDate(product.Date_Ajout)}</p>
//           </div>
//           <hr className='border border-warning'/>
//           <div className='text-center border border-warning p-3 bg-light shadow'>
//             <button className='btn btn-warning me-2 text-center p-1' style={{width: '30px' ,height: '30px'}}>+</button>
//             <input type='text' value={product.Quantite} style={{ width: '50px', padding: '3px'}} className='shadow text-center'/>
//             <button className='btn btn-warning ms-2 text-center p-1' style={{width: '30px' ,height: '30px'}}>-</button>
//             <p style={{ color: 'gray' }} className='mt-2'>Available quantity: {product.Quantite} pieces</p>
//             <Link to='/panier'>
//             <button onClick={onClose} className="btn bg-primary-subtle shadow btn-lg mt-2" style={{ width: '100%' }}>Add to Panier</button>
//             </Link>
//           </div>
//           </div>
          
//           <div className="modal-footer bg-warning-subtle border border-warning">
//             <button onClick={onClose} className="btn btn-warning btn-lg" style={{ width: '100%' }}>Close</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default ShowProdModal

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowProdModal = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1); // State to track the quantity of the product
  const [values, setValues] = useState([])
  const navigate = useNavigate()

  const addToCart = (e) => {
    e.preventDefault();
  
    // console.log(values)
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="modal show d-block " tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block', width: '100%' }}>
      {/* Modal content */}
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {/* Modal body */}
          <div className="modal-body bg-warning-subtle">
            {/* Product information */}
            <div className='text-center'>
              <div className='border border-warning rounded-5 d-inline-block'>
                <img src={`http://localhost:8081/${product.Product_Image.replace(/\\/g, '/')}`} alt="Product" height='200px' className='rounded-5' />
              </div>
            </div>
            {/* Additional product details */}
            <hr className='border border-warning' />
            <div className='text-center'>
              <h3>{product.name}</h3>
              <h5 className='text-warning'>{product.prix_sale}DH</h5>
              <p>Quantity: {product.Quantite} Pieces | Category: {product.Categorie} | Supplier: {product.supplierName}</p>
              {/* <p className="card-text">Added On : {formatDate(product.Date_Ajout)}</p> */}
            </div>
            {/* Quantity input and Add to Cart button */}
            <hr className='border border-warning' />
            <div className='text-center border border-warning rounded-5 p-3 bg-light shadow'>
              <button className='btn btn-warning me-2 text-center p-1' style={{ width: '30px', height: '30px' }} onClick={handleIncrement}>+</button>
              <input type='text' value={quantity} style={{ width: '50px', padding: '3px' }} className='shadow text-center' readOnly />
              <button className='btn btn-warning ms-2 text-center p-1' style={{ width: '30px', height: '30px' }} onClick={handleDecrement}>-</button>
              <p style={{ color: 'gray' }} className='mt-2'>Available quantity: {product.Quantite} pieces</p>
              {/* Add to Cart button */}
              <button onClick={addToCart} className="btn bg-primary-subtle shadow btn-lg mt-2" style={{ width: '100%' }}>Add to Panier</button>
            </div>
          </div>
          {/* Modal footer */}
          <div className="modal-footer bg-warning-subtle border border-warning">
            <button onClick={onClose} className="btn btn-warning btn-lg" style={{ width: '100%' }}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProdModal;