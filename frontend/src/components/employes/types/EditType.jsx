import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Types from './types';
import EditTypeModal from './EditTypeModal';

const EditType = () => {
  const { id } = useParams();
  const [values, setValues] = useState({name: '', created_date: ''});
  const navigate = useNavigate()

    useEffect(() => {
      axios.get(`http://localhost:8081/employees/types/${id}`)
      .then(res => {
        if (res.data && res.data.result && Array.isArray(res.data.result) && res.data.result.length > 0) {
          setValues({ 
            name: res.data.result[0].name, 
            created_date: res.data.result[0].created_date });
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
    axios.put(`http://localhost:8081/employees/types/edit/${id}`, values)
      .then((res) => {
        console.log(res.data);
        navigate('/types'); 
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Types/>
      <EditTypeModal isOpen={true} values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
      
    </div>
  );
};

export default EditType;
