import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import EditModalProfil from './EditModalProfil';

export default function EditProfil() {
    const { id } = useParams();
    const [values, setValues] = useState({name: '', image: ''});
    const navigate = useNavigate()

 useEffect(() => {
      axios.get(`http://localhost:8081/profile/${id}`)
      .then(res => {
        if (res.data && res.data.Status && res.data.Result && res.data.Result.length > 0) {
          setValues({ 
            name: res.data.Result[0].name, 
            image: res.data.Result[0].image });
        } else {console.log(values)
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
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('image', values.image);
    axios.put(`http://localhost:8081/profile/edit/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        navigate(`/profile/${id}`); 
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <div className="container">
      <Profile/>
      <EditModalProfil isOpen={true} values={values} setValues={setValues} handleChange={handleChange} handleSubmit={handleSubmit} />
      
    </div>
  );
};


