import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalC = ({ isOpen, onClose, details }) => {
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
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' ,width: '100%'}}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-warning-subtle">
            <h5 className="modal-title">Category Details</h5>
            <button type="button" className="close bg-danger text-light ps-2 pe-2 rounded pt-1" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h3 className='d-flex justify-content-between'><p>ID :</p><p> {details.id}</p></h3>
            <h3 className='d-flex justify-content-between'><p>Name :</p><p> {details.name}</p></h3>
            <h3 className='d-flex justify-content-between'><p>Created Date :</p><p> {formatDate(details.created_date)}</p></h3>
          </div>
          <div className="modal-footer bg-warning-subtle">
            <button onClick={onClose} className="btn btn-warning rounded-pill w-100">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalC;
