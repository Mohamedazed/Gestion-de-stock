import React from 'react'

export default function EditTypeModal({ isOpen, onClose, values, handleChange, handleSubmit }){
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' , width:'100%'}}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Category</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                  <label>Category Name</label>
                  <input type='text' className='form-control' id='name' name='name' value={values.name} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                  <label>Created Date</label>
                  <input type='text' className='form-control' id='created_date' name='created_date' value={values.created_date} readOnly />
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
