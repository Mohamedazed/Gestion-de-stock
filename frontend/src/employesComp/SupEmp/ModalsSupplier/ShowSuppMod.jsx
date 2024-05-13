import React from 'react';

const ShowSuppMod = ({ isOpen, onClose, supplier }) => {
    if (!isOpen) {
        return null;
      }

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' ,width: '100%'}}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          
          <div className="modal-body bg-warning-subtle">
            <div className='text-center'>
                <div className='border rounded-pill d-inline-block'>
                  {supplier.image? <img src={`http://localhost:8081/${supplier.image.replace(/\\/g, '/')}`} alt="supplier" className='rounded-pill' width='150px' height='100px'/>
                  : <img width='90px' height='90px' src='/public/noImg.png' className='rounded-pill' style={{backgroundSize: 'cover'}}/>}
                </div>
            </div>
            <div className='text-center'>
              <h3 className='mt-3 mb-4'><b>{supplier.Name}</b></h3>
              <p>Email : {supplier.Email} | Phone : {supplier.Phone}</p> <p> Address : {supplier.Adresse} | Company : {supplier.Company}</p>
            </div>
          </div>
          <div className="modal-footer bg-warning-subtle border ">
            <button onClick={onClose} className="btn btn-warning rounded-pill btn-lg" style={{ width: '100%' }}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSuppMod;
