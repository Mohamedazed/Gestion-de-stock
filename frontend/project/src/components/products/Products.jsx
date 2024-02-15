import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/products')
      .then(res => setData(res.data.result || []))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/delete/${id}`)
      .then(res => {
        // Reload the page after deletion
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      <div style={{ marginTop: '70px' }}>
        <h3>Products</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
          / <span style={{ color: 'gray' }}>Products</span>
        </p>
      </div>

      <div>
        <div className='w-50 rounded p-3'>
          <h2>Liste des Products :</h2>
          <div style={{ float: 'right' }}>
            <Link to="/products/create" className='btn btn-success'>Create new Product</Link>
          </div>
        </div>
        <table className='table table-striped'>
          <thead className='bg-dark text-white'>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Supplier</th>
              <th>Date d'ajout</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((prod, index) => (
                <tr key={index}>
                  <td>{prod.id}</td>
                  <td>{prod.name}</td>
                  <td>{prod.category}</td>
                  <td>{prod.price}</td>
                  <td>{prod.quantity}</td>
                  <td>{prod.supplier}</td>
                  <td>{prod.created_date}</td>
                  <td>
                    <Link to={`/edit/${prod.id}`} className='btn btn-primary'>Edit</Link>
                    <Link to={`/show/${prod.id}`} className='btn btn-info ms-2'>Show</Link>
                    <button onClick={() => handleDelete(prod.id)} className='btn btn-danger ms-2'>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// import React from 'react'
// import { Link } from "react-router-dom";

// export default function Products() {

//   return (
//     <div className="container mt-4">
//             <div style={{marginTop:'70px'}}>
//                 <h3 >Products</h3>
//                 <p>
//                     <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
//                     / <span style={{ color: 'gray' }}>Products</span>
//                 </p>
//             </div>

//     </div>
//   )
// }