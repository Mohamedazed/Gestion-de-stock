import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditSupp = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Adresse: '',
    Company: ''
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
            Company: res.data.result[0].Company
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/suppliers/edit/${id}`, supplier)
      .then(res => {
        console.log(res.data);
        navigate('/suppliers');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
        <div>
        <h3 style={{ marginTop: '70px' }}>Edit Supplier</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
          / <span><Link to="/suppliers" style={{ textDecoration: 'none', color: 'inherit' }}>suppliers </Link></span>
          / <span style={{ color: 'gray' }}>Edit supplier</span>
        </p>
      </div> 

      <h3>Edit Supplier</h3>
      {supplier !== null ? (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="Name" value={supplier.Name} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="Phone" value={supplier.Phone} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="Email" value={supplier.Email} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Adresse:</label>
          <input type="text" name="Adresse" value={supplier.Adresse} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Company:</label>
          <input type="text" name="Company" value={supplier.Company} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <Link to={`/suppliers`} className="btn btn-secondary ms-2">Cancel</Link>
      </form>
       ) : (
        <p>No data available for this supplier.</p>
      )}
    </div>
  );
};

export default EditSupp;
