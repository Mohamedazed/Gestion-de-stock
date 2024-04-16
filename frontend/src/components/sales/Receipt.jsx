import React, { useEffect, useState } from 'react';

export default function Receipt({ products, onClose }) {
  const [order, setOrder] = useState(0);
  const currentDate = new Date().toLocaleDateString();

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
          <div className="modal-header">
            <h5 className="modal-title">Receipt</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="container bg-secondary-subtle p-5">
              <div className="d-flex justify-content-between">
                <div className="info-block">
                  <h4 className='mb-4'>Invoice Details</h4>
                  <p>Invoice Number : {order}</p>
                  <p>Invoice Date : {currentDate}</p>
                </div>
                <div>
                  <p>charika</p>
                </div>
              </div>
              <hr />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className='bg-secondary-subtle'>Code Product</th>
                    <th className='bg-secondary-subtle'>Product</th>
                    <th className='bg-secondary-subtle'>Quantity</th>
                    <th className='bg-secondary-subtle'>Unit Price</th>
                    <th className='bg-secondary-subtle'>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {products ? (
                    products.map(product => (
                      <tr key={product.id}>
                        <td className='bg-secondary-subtle'>{product.id}</td>
                        <td className='bg-secondary-subtle'>{product.name}</td>
                        <td className='bg-secondary-subtle'>{product.quantity}</td>
                        <td className='bg-secondary-subtle'>{product.price.toFixed(2)} DH</td>
                        <td className='bg-secondary-subtle'>{(product.quantity * product.price).toFixed(2)} DH</td>
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





// import React, { useEffect, useState } from 'react';

// const Receipt = ({ products }) => {
//     const [order, setOrder] = useState(0);
//     const currentDate = new Date().toLocaleDateString(); 

//     useEffect(() => {
//         setOrder(prevOrder => prevOrder + 1);
//         console.log('Products in Receipt:', products);
//     }, [products]);

//     const calculateTotalPrice = () => {
//         let total = 0;
//         if (products) {
//             products.forEach(item => {
//                 total += item.price * item.quantity;
//             });
//         }
//         return total.toFixed(2); 
//     };

//     return (
//         <div className="container border p-4">
          
//           <div>
//             <div className="info-block">
//                     <h4>Invoice Details</h4>
//                     <p>Invoice Number : {order}</p> 
//                     <p>Invoice Date : {currentDate}</p> 
//                 </div>
//             </div>
//             <hr />

            

//             <table className="table table-bordred">
//                 <thead>
//                     <tr>
//                         <th>Code Product</th>
//                         <th>Product</th>
//                         <th>Quantity</th>
//                         <th>Unit Price</th>
//                         <th>Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products ? (
//                         products.map(product => (
//                             <tr key={product.id}>
//                                 <td>{product.id}</td>
//                                 <td>{product.name}</td>
//                                 <td>{product.quantity}</td>
//                                 <td>{product.price.toFixed(2)} DH</td> 
//                                 <td>{(product.quantity * product.price).toFixed(2)} DH</td>
//                             </tr>
//                         ))
//                         ) : (
//                             <tr>
//                             <td colSpan="5">No products found</td>
//                           </tr>
//                     )}
//                 </tbody>

//                 <tfoot>
//                     <tr>
//                         <td colSpan="4">Total</td>
//                         <td>{calculateTotalPrice()} DH</td>
//                     </tr>
//                 </tfoot>
//             </table>

//             <div className="invoice-total">
//                 <p>Signature</p>
//                 <p>Total Amount: {calculateTotalPrice()} DH</p>
//             </div>

//             <div className="invoice-footer">
//                 <p>Thank you for using our services!</p>
//             </div>
//             <button className="btn bg-primary-subtle shadow btn-lg rounded-pill" onClick={() => window.print()}>
//                     <span className="icon mr-2">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-printer-fill" viewBox="0 0 16 16">
//                             <path d="M0 3.5A.5.5 0 0 1 .5 3H4v-.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V3h3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H1a.5.5 0 0 1-.5-.5v-4zm5-2V1h6v.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zM1 7.5V13h14v-5.5a.5.5 0 0 0-.5-.5H1a.5.5 0 0 0-.5.5z"/>
//                         </svg> 
//                     </span>
//                      Print Receipt
//                 </button>
//         </div>
//     );
// }
// export default Receipt

// import React, { useEffect, useState } from 'react';

// const Receipt = ({ products }) => {
//     const [order, setOrder] = useState(0);
//     const currentDate = new Date().toLocaleDateString(); 

//     useEffect(() => {
//         setOrder(prevOrder => prevOrder + 1);
//     }, []);

//     const calculateTotalPrice = () => {
//         let total = 0;
//         if (products) {
//             products.forEach(item => {
//                 total += item.price * item.quantity;
//             });
//         }
//         return total.toFixed(2); 
//     };

//     return (
//         <div className="container border p-4">
//             <div>
//                 <div className="info-block">
//                     <h4>Invoice Details</h4>
//                     <p>Invoice Number : {order}</p> 
//                     <p>Invoice Date : {currentDate}</p> 
//                 </div>
//             </div>
//             <hr />

//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th>Code Product</th>
//                         <th>Product</th>
//                         <th>Quantity</th>
//                         <th>Unit Price</th>
//                         <th>Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
                    // {products ? (
                    //     products.map(product => (
                    //         <tr key={product.id}>
                    //             <td>{product.id}</td>
                    //             <td>{product.name}</td>
                    //             <td>{product.quantity}</td>
                    //             <td>{product.price.toFixed(2)} DH</td> 
                    //             <td>{(product.quantity * product.price).toFixed(2)} DH</td>
                    //         </tr>
                    //     ))
                    // ) : (
                    //     <tr>
                    //         <td colSpan="5">No products found</td>
                    //     </tr>
                    // )}
//                 </tbody>

//                 <tfoot>
//                     <tr>
//                         <td colSpan="4">Total</td>
//                         <td>{calculateTotalPrice()} DH</td>
//                     </tr>
//                 </tfoot>
//             </table>

//             <div className="invoice-total">
//                 <p>Signature</p>
//                 <p>Total Amount: {calculateTotalPrice()} DH</p>
//             </div>

//             <div className="invoice-footer">
//                 <p>Thank you for using our services!</p>
//             </div>
            // <button className="btn bg-primary-subtle shadow btn-lg rounded-pill" onClick={() => window.print()}>
            //     <span className="icon mr-2">
            //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-printer-fill" viewBox="0 0 16 16">
            //             <path d="M0 3.5A.5.5 0 0 1 .5 3H4v-.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V3h3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H1a.5.5 0 0 1-.5-.5v-4zm5-2V1h6v.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zM1 7.5V13h14v-5.5a.5.5 0 0 0-.5-.5H1a.5.5 0 0 0-.5.5z"/>
            //         </svg> 
            //     </span>
            //     Print Receipt
            // </button>
//         </div>
//     );
// }

// export default Receipt;
