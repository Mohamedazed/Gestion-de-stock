import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditModalC = ({ isOpen, onClose, values, handleChange, handleSubmit }) => {
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
            <h4 className="modal-title">Edit Category</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className='form-group mb-3'>
                <label><b>Category Name</b></label>
                <input type='text' className='form-control rounded-pill' id='name' name='name' value={values.name} onChange={handleChange} required />
              </div>
              <div className='mb-3'>
                <label><b>Created Date</b></label>
                <input type='text' className='form-control rounded-pill' id='created_date' name='created_date' value={formatDate(values.created_date)} readOnly />
              </div><hr/>
              <div className='d-flex justify-content-between'>
                <button className='btn text-primary border-primary ms-2 rounded-pill' onClick={onClose}>Cancel</button>
                <button type="submit" className='btn btn-primary rounded-pill'>Update</button>
              </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModalC;
