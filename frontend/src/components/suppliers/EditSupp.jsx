import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditSuppModal from './ModalsSupp/EditSuppModal';
import Suppliers from './Suppliers';

const EditSupp = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Adresse: '',
    Company: '',
    image: null,
    imageChanged: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/suppliers/show/${id}`)
      .then(res => {
        if (res.data && res.data.result && Array.isArray(res.data.result) && res.data.result.length > 0) {
          setSupplier({
            Name: res.data.result[0].Name,
            Phone: res.data.result[0].Phone,
            Email: res.data.result[0].Email,
            Adresse: res.data.result[0].Adresse,
            Company: res.data.result[0].Company,
            image: res.data.result[0].image,
            imageChanged: false
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
    setSupplier(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (acceptedFiles) => {
    setSupplier(prevState => ({
      ...prevState,
      image: acceptedFiles[0],
      imageChanged: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Name', supplier.Name);
    formData.append('Phone', supplier.Phone);
    formData.append('Email', supplier.Email);
    formData.append('Adresse', supplier.Adresse);
    formData.append('Company', supplier.Company);
    formData.append('image', supplier.image);

    axios.put(`http://localhost:8081/suppliers/edit/${id}`, formData)
      .then(res => {
        console.log(res.data);
        navigate('/suppliers');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Suppliers />
      <EditSuppModal isOpen={true} supplier={supplier} handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default EditSupp;