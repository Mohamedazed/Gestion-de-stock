import React from 'react';

export default function EditProdM({ isOpen, onClose, product, handleChange, handleSubmit, categories, suppliers }) {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block', width: '100%' }}>
            <div className="modal-dialog modal-dialog-centered " role="document">
                <div className="modal-content">
                    <div className="modal-header bg-warning-subtle">
                        <h5 className="modal-title">Edit product</h5>
                    </div>
                    <div className="modal-body bg-light">
                        <div className='text-center '>
                            {product.Product_Image && (
                                <div className='border border-warning-subtle shadow d-inline-block rounded-pill'>
                                    <img src={`http://localhost:8081/${product.Product_Image.replace(/\\/g, '/')}`} alt={product.name} className='rounded-pill' height='200px' />
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group mb-3'>
                                <label> <b>Name :</b></label>
                                <input type='text' className='form-control rounded-pill' id='name' name='name' value={product.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="categorie"><b>Category:</b></label>
                                <select className="form-control rounded-pill" name="Categorie" id="Categorie" value={product.Categorie} onChange={handleChange}>
                                    <option value="">Select category...</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group mb-3">
                                <label><b>Price:</b></label>
                                <input type="text" name="Prix" value={product.Prix} onChange={handleChange} className="form-control rounded-pill" />
                            </div>
                            <div className="form-group mb-3">
                                <label><b>Quantity:</b></label>
                                <input type="text" name="Quantite" value={product.Quantite} onChange={handleChange} className="form-control rounded-pill" />
                            </div>
                            <div className="form-group mb-3">
                                <label><b>Price for sale:</b></label>
                                <input type="text" name="prix_sale" value={product.prix_sale} onChange={handleChange} className="form-control rounded-pill" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="supplier" ><b>Supplier:</b></label>
                                <select className="form-control rounded-pill" name="supplierName" id="supplierName" value={product.supplierName} onChange={handleChange}>
                                    <option value="">Select supplier...</option>
                                    {suppliers.map(supp => (
                                        <option key={supp.Code_Supplier} value={supp.Name}>{supp.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="d-flex justify-content-between">
                                <button className='btn text-primary border border-primary rounded-pill' onClick={onClose}>Cancel</button>
                                <button type="submit" className='btn btn-primary rounded-pill' >Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
