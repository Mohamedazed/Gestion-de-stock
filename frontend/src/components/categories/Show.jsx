import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from './modalsCat/ModalShow';

const Show = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [isModalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8081/show/${id}`)
      .then(res => {
        console.log(res);
        setCategory(res.data.result || []);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='container'>
      <div>
        <h3 style={{ marginTop: '70px' }}>Category Details</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
          / <span><Link to="/categories" style={{ textDecoration: 'none', color: 'inherit' }}>Categories </Link></span>
          / <span style={{ color: 'gray' }}>Category Details</span>
        </p>
      </div>

      <div>
        {category !== null ? (
          <div className='p-2'>
            {
              Array.isArray(category) && category.length > 0 ? (
                category.map((cat, index) => (
                  <div key={index}>
                    <Modal isOpen={isModalOpen} onClose={closeModal} details={cat} />
                  </div>
                ))
              ) : null

            }
          </div>
        ) : (
          <p>No category available for this category.</p>
        )}

      </div>

    </div>
  );
};

export default Show;
