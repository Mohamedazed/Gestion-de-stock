import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Show = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);

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

  return (
    <div className='container mt-4'>
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
                    category.map((cat, index)=>(
                       <ul key={index}>
                        {/* <li><h2>{cat.id}</h2></li> */}
                        <li><h2 className='text text-info'> Name:</h2> {cat.name}</li>
                        <li><h2  className='text text-info'>Created Date:</h2> {cat.created_date}</li>
                        <li><Link to='/categories' className='btn btn-info'>Back</Link></li>
                        <li><Link to={`/edit/${cat.id}`} className='btn btn-primary'>Edit</Link></li>
                        </ul>)) ):null
              
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
