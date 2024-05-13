import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import EditModal from './modalsCat/EditModal'; 
import Categories from './Categories';

const Edit = () => {
  const { id } = useParams();
  const [values, setValues] = useState({ name: '', created_date: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/show/${id}`)
      .then(res => {
        if (res.data && res.data.result && Array.isArray(res.data.result) && res.data.result.length > 0) {
          setValues({
            name: res.data.result[0].name,
            created_date: res.data.result[0].created_date
          });
        } else {
          console.error('Invalid data structure in response:', res.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/edit/${id}`, values)
      .then(res => {
        console.log(res.data);
        navigate('/categories');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
     
      <Categories/>
      <EditModal isOpen={true} values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Edit;
