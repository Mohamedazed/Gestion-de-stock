import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ShowSuppModal from './ModalsSupp/ShowSuppModal';

export default function ShowSupp() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState([]);
  const [isShowModalOpen, setShowModalOpen] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8081/suppliers/show/${id}`)
      .then(res => {
        setSupplier(res.data.result || []);
      })
      .catch(err => {
        console.error('Error fetching supplier details:', err);
      });
  }, []);
  
  const closeShowModal = () => {
    setShowModalOpen(false);
  };

  return (
    <div className="container">

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
                        <ShowSuppModal isOpen={isShowModalOpen} onClose={closeShowModal} details={s} />
                      </ul>
                      )) 
                      ):null
            }

        </div>
      ) : (
        <p>Loading supplier details...</p>
      )}
    </div>
    </div>
  );
}
