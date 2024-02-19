import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ShowSupp() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/suppliers/show/${id}`)
      .then(res => {
        setSupplier(res.data.result || []);
      })
      .catch(err => {
        console.error('Error fetching supplier details:', err);
      });
  }, []);
  

  return (
    <div className="container mt-4">

      <div>
        <h3 style={{ marginTop: '70px' }}>Supplier Details</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
          / <span><Link to="/Suppliers" style={{ textDecoration: 'none', color: 'inherit' }}>Suppliers </Link></span>
          / <span style={{ color: 'gray' }}>Supplier Details</span>
        </p>
      </div>
    <div>
      
      {supplier !== null ? (
        <div className='p-2'>
            {
                Array.isArray(supplier) && supplier.length > 0 ? (
                    supplier.map((s, index)=>(
                       <ul key={index}>
                        <li><h2 className='text text-info'>{s.Name}</h2></li>
                        <li><p><strong className='text text-info'>Phone:</strong> {s.Phone}</p></li>
                        <li><p><strong className='text text-info'>Email:</strong> {s.Email}</p></li>
                        <li><p><strong className='text text-info'>Address:</strong> {s.Adresse}</p></li>
                        <li><p><strong className='text text-info'>Company:</strong> {s.Company}</p></li>
                        <li><Link to='/suppliers' className='btn btn-secondary m-1'>Back</Link>
                        <Link to={`/suppliers/edit/${s.Code_Supplier}`} className='btn btn-primary '>Edit</Link></li>
                        </ul>)) ):null
            }

        </div>
      ) : (
        <p>Loading supplier details...</p>
      )}
    </div>
    </div>
  );
}
