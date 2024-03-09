import React, { useState } from 'react';

const ShowSuppModal = ({ isOpen, onClose, supplier }) => {
    if (!isOpen) {
        return null;
      }

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' ,width: '100%'}}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          
          <div className="modal-body bg-warning-subtle">
            <div className='text-center'>
                <div className='border  d-inline-block'>
                  <img src={`http://localhost:8081/${supplier.image.replace(/\\/g, '/')}`} alt="supplier" width='150px' height='100px'/>
                </div>
            </div>
            <div className='text-center'>
              <h3>{supplier.Name}</h3><br/>
              <p>Email : {supplier.Email} | Phone : {supplier.Phone} | Address : {supplier.Adresse} | Company : {supplier.Company}</p>
            </div>
          </div>
          <div className="modal-footer bg-warning-subtle border ">
            <button onClick={onClose} className="btn btn-primary btn-lg" style={{ width: '100%' }}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSuppModal;
