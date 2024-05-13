import React from 'react'

export default function EditTypeModal({ isOpen, onClose, values, handleChange, handleSubmit }){
    if (!isOpen) {
      return null;
    }
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return (
      <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' , width:'100%'}}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-warning-subtle">
              <h5 className="modal-title">Edit Type</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                  <label><b>Type Name</b></label>
                  <input type='text' className='form-control' id='name' name='name' value={values.name} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                  <label><b>Created Date</b></label>
                  <input type='text' className='form-control' id='created_date' name='created_date' value={formatDate(values.created_date)} readOnly />
                </div>
                <div className='d-flex justify-content-end'>
                  <button  className='btn text-primary ms-2' onClick={onClose}>Cancel</button>
                  <button type="submit" className='btn btn-primary'>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
