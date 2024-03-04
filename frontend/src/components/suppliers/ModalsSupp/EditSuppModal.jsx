import React, { useState } from 'react';

const EditSuppModal = ({ isOpen, onClose, supplier, handleChange, handleSubmit }) => {
    if (!isOpen) {
        return null;
      }

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' , width:'100%'}}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Supplier</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className='form-group mb-3'>
                <label> Name :</label>
                <input type='text' className='form-control' id='Name' name='Name' value={supplier.Name} onChange={handleChange} required />
              </div>
              <div className="form-group mb-3">
              <label>Phone:</label>
              <input type="text" name="Phone" value={supplier.Phone} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Email:</label>
              <input type="email" name="Email" value={supplier.Email} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Adresse:</label>
              <input type="text" name="Adresse" value={supplier.Adresse} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Company:</label>
              <input type="text" name="Company" value={supplier.Company} onChange={handleChange} className="form-control" />
            </div>
              <button type="submit" className='btn btn-primary'>Update</button>
              <button  className='btn btn-secondary ms-2' onClick={onClose}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSuppModal;


