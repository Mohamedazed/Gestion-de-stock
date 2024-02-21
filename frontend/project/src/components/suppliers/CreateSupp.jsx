import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CreateSupp() {
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Adresse: '',
    Company: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/suppliers/create', formData)
      .then(res => {
        console.log(res.data);
        // Redirect to suppliers page after successful creation
        window.location.href = '/suppliers';
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4" style={{'paddingLeft': '40px'}}>
      <div style={{ marginTop: '70px' }}>
        <h3>Create Supplier</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></span>
          / <span><Link to="/suppliers" style={{ textDecoration: 'none', color: 'inherit' }}>Suppliers</Link></span>
          / <span style={{ color: 'gray' }}>Create Supplier</span>
        </p>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">Name</label>
            <input type="text" className="form-control" id="Name" name="Name" value={formData.Name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="Phone" className="form-label">Phone</label>
            <input type="text" className="form-control" id="Phone" name="Phone" value={formData.Phone} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email</label>
            <input type="email" className="form-control" id="Email" name="Email" value={formData.Email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="Adresse" className="form-label">Address</label>
            <input type="text" className="form-control" id="Adresse" name="Adresse" value={formData.Adresse} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="Company" className="form-label">Company</label>
            <input type="text" className="form-control" id="Company" name="Company" value={formData.Company} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/suppliers" className="btn btn-secondary">
                    Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
