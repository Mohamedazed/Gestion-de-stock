import React, { useState } from 'react';

const ShowSuppModal = ({ isOpen, onClose, supplier }) => {
    if (!isOpen) {
        return null;
      }

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' ,width: '100%'}}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">supplier Details</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h3>ID: {supplier.Code_Supplier}</h3><hr />
            <h3>Name: {supplier.Name}</h3><hr />
            <h3>Email: {supplier.Email}</h3><hr />
            <h3>Phone: {supplier.Phone}</h3><hr />
            <h3>Address: {supplier.Adresse}</h3><hr />
            <h3>Company: {supplier.Company}</h3>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="btn btn-primary">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSuppModal;
