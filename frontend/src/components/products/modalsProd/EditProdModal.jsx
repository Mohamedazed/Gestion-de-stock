import React from 'react';

export default function EditProdModal({ isOpen, onClose, product, handleChange, handleSubmit, categories, suppliers }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block', width: '100%' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-warning">
                        <h5 className="modal-title">Edit product</h5>
                    </div>
                    <div className="modal-body bg-warning-subtle">
                        <div className='text-center'>
                            {product.Product_Image && (
                                <div className='border border-warning d-inline-block'>
                                    <img src={`http://localhost:8081/${product.Product_Image.replace(/\\/g, '/')}`} alt={product.name} height='200px' />
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group mb-3'>
                                <label> Name :</label>
                                <input type='text' className='form-control' id='name' name='name' value={product.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="categorie">Category:</label>
                                <select className="form-control" name="Categorie" id="Categorie" value={product.Categorie} onChange={handleChange}>
                                    <option value="">Select category...</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group mb-3">
                                <label>Price:</label>
                                <input type="text" name="Prix" value={product.Prix} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Quantity:</label>
                                <input type="text" name="Quantite" value={product.Quantite} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="supplier">Supplier:</label>
                                <select className="form-control" name="supplierName" id="supplierName" value={product.supplierName} onChange={handleChange}>
                                    <option value="">Select supplier...</option>
                                    {suppliers.map(supp => (
                                        <option key={supp.Code_Supplier} value={supp.Name}>{supp.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="d-grid gap-2 d-md-block">
                                <button type="submit" className='btn btn-warning btn-lg' style={{ width: '100%' , marginBottom: '4px'}}>Update</button>
                                <button className='btn btn-danger btn-lg' style={{ width: '100%' }} onClick={onClose}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
