import React, { useEffect, useState } from 'react';

export default function Receipt({ products, onClose }) {
  const [order, setOrder] = useState(0);
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    setOrder(prevOrder => prevOrder + 1);
  }, []);

  const calculateTotalPrice = () => {
    let total = 0;
    if (products) {
      products.forEach(item => {
        total += item.price * item.quantity;
      });
    }
    return total.toFixed(2);
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-warning-subtle">
            <h5 className="modal-title">Receipt</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="container bg-light-subtle border p-5 rounded-5">
              <div className="d-flex justify-content-between">
                <div className="info-block">
                  <h4 className='mb-4'>Invoice Details</h4>
                  <p>Invoice Number : N°{order}</p>
                  <p>Invoice Date : {currentDate}</p>
                </div>
                <div className='ms-4'>
                  <img src='/public/logoSM2.png'  width='50px'/>
                  <span className=' text-secondary'>Aizen Stock Management</span>
                </div>
              </div>
              <hr />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className='bg-secondary'>Code Product</th>
                    <th className='bg-secondary'>Product</th>
                    <th className='bg-secondary'>Quantity</th>
                    <th className='bg-secondary'>Unit Price</th>
                    <th className='bg-secondary'>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {products ? (
                    products.map(product => (
                      <tr key={product.id}>
                        <td className='bg-light-subtle'>{product.id}</td>
                        <td className='bg-light-subtle'>{product.name}</td>
                        <td className='bg-light-subtle'>{product.quantity}</td>
                        <td className='bg-light-subtle'>{product.price.toFixed(2)} DH</td>
                        <td className='bg-light-subtle'>{(product.quantity * product.price).toFixed(2)} DH</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No products found</td>
                    </tr>
                  )}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan="4">Total</td>
                    <td>{calculateTotalPrice()} DH</td>
                  </tr>
                </tfoot>
              </table>

              <div className="d-flex justify-content-between mt-4">
                <h5>Signature</h5>
                <h5>Total Amount: {calculateTotalPrice()} DH</h5>
              </div>

              <div className="mt-5 text-center text-secondary">
                <p>Thank you for using our services!</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary rounded-pill" onClick={onClose}>Close</button>
            <button className="btn bg-primary-subtle shadow rounded-pill " onClick={() => window.print()} >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}