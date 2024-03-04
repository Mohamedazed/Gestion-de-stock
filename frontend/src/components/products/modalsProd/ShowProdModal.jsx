import React from 'react'

const ShowProdModal=({ isOpen, onClose, product }) => {
    if (!isOpen) {
        return null;
      }
  return (
    <div className="modal show d-block " tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' ,width: '100%'}}>
      <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content">
          {/* <div className="modal-header">
            <h5 className="modal-title">Product Details</h5> */}
            
          {/* </div> */}
          <div className="modal-body bg-warning-subtle" >
            <div className='text-center'>
              <div className='border border-warning d-inline-block'>
                <img src={`http://localhost:8081/${product.Product_Image.replace(/\\/g, '/')}`} alt="Product"  height='200px'/>
              </div>
            </div>
            <hr className='border border-warning'/>
          <div className='text-center'>
            {/* <h3>ID: {product.Code_Product}</h3><hr /> */}
            <h3>{product.name}</h3>
            <h5 className='text-warning'>{product.Prix}DH</h5>
            <p>Quantity: {product.Quantite} Pieces | Category: {product.Categorie} | Supplier: {product.supplierName}</p>
            <p className="card-text">Added On : {product.Date_Ajout}</p>
          </div>
          </div>
          <div className="modal-footer bg-warning-subtle border border-warning">
            
            <button onClick={onClose} className="btn btn-warning btn-lg" style={{ width: '100%' }}>Close</button>
            
          </div>
        </div>
      </div>
    </div>
  )
}
export default ShowProdModal