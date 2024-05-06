import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddModS({handleClose}) {
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Adresse: '',
    Company: '',
    image: null
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
        ...prevState,
        image: file
    }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const formDataToSend = new FormData();
  formDataToSend.append('Name', formData.Name);
  formDataToSend.append('Phone', formData.Phone);
  formDataToSend.append('Email', formData.Email);
  formDataToSend.append('Adresse', formData.Adresse);
  formDataToSend.append('Company', formData.Company);
  formDataToSend.append('image', formData.image);

  try {
    const res = await axios.post('http://localhost:8081/suppliers/create', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(res.data);
    navigate('/employe/SuppE');
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block', width: '100%' }}>
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-warning-subtle">
                            <h5 className="modal-title">Add product</h5>
                        </div>
                        <div className="modal-body bg-light">
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
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image" 
              onChange={handleFileChange}
            />
          </div>
          <div class="d-flex justify-content-end gap-2 mt-4">
            <button className='btn text-primary  rounded-pill' onClick={handleClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
        </div>
              </div>
            </div>
            </div>
  );
}
