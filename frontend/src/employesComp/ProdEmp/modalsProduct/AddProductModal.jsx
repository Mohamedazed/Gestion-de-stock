import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmSuccessP from './ConfirmSuccessP';

const AddProductModal = ({ show, handleClose }) => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    supplier: '',
    prix_sale: '',
    productImage: null
  });
  const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        // Fetch existing categories
        axios.get('http://localhost:8081/categories')
            .then(res => {
                setCategories(res.data.result);
            })
            .catch(err => {
                console.error('Error fetching categories:', err);
            });

        // Fetch existing suppliers
        axios.get('http://localhost:8081/suppliers')
            .then(res => {
                setSuppliers(res.data.result);
            })
            .catch(err => {
                console.error('Error fetching suppliers:', err);
            });
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct(prevProduct => ({
      ...prevProduct,
      productImage: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category', product.category);
        formData.append('price', product.price);
        formData.append('quantity', product.quantity);
        formData.append('supplier', product.supplier);
        formData.append('productImage', product.productImage);
        formData.append('prix_sale', product.prix_sale);

        axios.post('http://localhost:8081/products/create', formData)
            .then(res => {
                console.log(res.data);
                setShowConfirmModal(true);
                navigate('/employe/empHome');
            })
            .catch(err => {
                console.error('Error creating product:', err);
            });
  };
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
};

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block', width: '100%' }}>
    <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content">
            <div className="modal-header bg-warning-subtle">
                <h5 className="modal-title">Add product</h5>
            </div>
            <div className="modal-body bg-light">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name"><b>Name:</b></label>
                  <input type="text" className="form-control rounded-pill" placeholder='Write the product name' name="name" id="name" value={product.name} onChange={handleChange} />
                </div>
                <div className="form-group mt-1">
                          <label htmlFor="category"><b>Category:</b></label>
                          <select className="form-control rounded-pill" name="category" id="category" value={product.category} onChange={handleChange}>
                              <option value="">Select category...</option>
                              {categories.map(cat => (
                                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                              ))}
                          </select>
                      </div>
                      <div className="form-group mt-1">
                          <label htmlFor="price"><b>Price:</b></label>
                          <input type="text" className="form-control rounded-pill" placeholder='Write the product price' name="price" id="price" value={product.price} onChange={handleChange} />
                      </div>
                      <div className="form-group mt-1">
                          <label htmlFor="quantity"><b>Quantity:</b></label>
                          <input type="text" className="form-control rounded-pill" placeholder='Write the product quantity' name="quantity" id="quantity" value={product.quantity} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                          <label htmlFor="price">Price for sale:</label>
                          <input type="text" className="form-control rounded-pill" placeholder='Write the product price for sale' name="prix_sale" id="prix_sale" value={product.prix_sale} onChange={handleChange} />
                      </div>
                      <div className="form-group mt-1">
                          <label htmlFor="supplier"><b>Supplier:</b></label>
                          <select className="form-control rounded-pill" name="supplier" id="supplier" value={product.supplier} onChange={handleChange}>
                              <option value="">Select supplier...</option>
                              {suppliers.map(supp => (
                                  <option key={supp.Code_Supplier} value={supp.Name}>{supp.Name}</option>
                              ))}
                          </select>
                      </div>
                <div className="form-group mt-2">
                  <label htmlFor="productImage"><b>Product Image:</b></label>
                  <input type="file" className="form-control rounded-pill" name="productImage" id="productImage" onChange={handleFileChange} />
                </div>
                <div class="d-flex justify-content-end gap-2 mt-4">
                  <button className='btn text-primary  rounded-pill' onClick={handleClose}>Cancel</button>
                  <button type="submit" className='btn btn-primary rounded-pill' >Update</button>
                </div>
              </form>
            </div>
          </div>
          <ConfirmSuccessP isOpen={showConfirmModal} onClose={handleCloseConfirmModal} />

      </div>
    </div>
  );
};

export default AddProductModal;
