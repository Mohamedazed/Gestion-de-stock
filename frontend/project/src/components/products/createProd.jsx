import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateProd() {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    price: '',
    quantity: '',
    supplier: '',
    productImage: '',
  });
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch suppliers data when component mounts
    axios.get('http://localhost:8081/suppliers')
      .then(res => setSuppliers(res.data.result || []))
      .catch(err => console.log(err));
      console.log(data)
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "supplier") {
      // Get the selected option's value
      const selectedSupplier = e.target.options[e.target.selectedIndex].value;
      
      // Update formData with the selected supplier value
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedSupplier,
      }));
    } else {
      // For other input fields, update formData as usual
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Add your form validation here

    const createdDate = new Date().toISOString();

    try {
      const response = await axios.post('http://localhost:8081/products/create', {
        Categorie: formData.category,
        Prix: formData.price,
        Quantite: formData.quantity,
        Date_Ajout: createdDate,
        Code_Supplier: formData.supplier,
        Product_Image: formData.productImage,
      });

      console.log(response);
      navigate('/products');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div>
        <h3 style={{ marginTop: '70px' }}>Create Product</h3>
        <p>
          <span>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Dashboard
            </Link>
          </span>{' '}
          / <span style={{ color: 'gray' }}>Add Product</span>
        </p>
      </div>

      <div>
        <div className="w-50 rounded p-3">
          <h2>Create a New Product:</h2>
          <form onSubmit={handleCreate}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category:
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity:
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="supplier" className="form-label">
                Supplier:
              </label>
              <select
                className="form-select"
                id="supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier.Code_Supplier} value={supplier.Code_Supplier}>
                    {supplier.Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="productImage" className="form-label">
                Product Image URL:
              </label>
              <input
                type="text"
                className="form-control"
                id="productImage"
                name="productImage"
                value={formData.productImage}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <Link to="/categories" className="btn btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-success">
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
