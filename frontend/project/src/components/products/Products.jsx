import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/products');
        const products = response.data.result;
        const updatedData = await Promise.all(products.map(async (prod) => {
          const supplierName = await fetchSupplierName(prod.Code_Supplier);
          return { ...prod, supplierName };
        }));
        setData(updatedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
 
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/delete/${id}`);
      setData(prevData => prevData.filter(prod => prod.Code_Product !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const fetchSupplierName = async (Code_Supplier) => {
    try {
      const response = await axios.get(`http://localhost:8081/suppliers/show/${Code_Supplier}`);
      return response.data.result[0].Name; // Assuming the API returns a single supplier
    } catch (error) {
      console.error('Error fetching supplier name:', error);
      return 'Supplier Not Found'; // Default value if supplier name is not found
    }
  };

  return (
    <div className="container mt-4" style={{'paddingLeft': '40px'}}>
      <div style={{ marginTop: '70px' }}>
        <h3>Products</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
          / <span style={{ color: 'gray' }}>Products</span>
        </p>
      </div>

      <div>
        <div className='w-50 rounded p-3'>
          <h2>Liste des Products :</h2>
          <div style={{ float: 'right' }}>
            <Link to="/products/create" className='btn btn-success'>Create new Product</Link>
          </div>
        </div>
        <table className='table table-striped'>
          <thead className='bg-dark text-white'>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Supplier</th>
              <th>Date d'ajout</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((prod, index) => (
                <tr key={index}>
                  <td>{prod.Code_Product}</td>
                  <td><img src={prod.Product_Image} alt="Product" width='100px' height='100px'/></td>
                  <td>{prod.name}</td>
                  <td>{prod.Categorie}</td>
                  <td>{prod.Prix}</td>
                  <td>{prod.Quantite}</td>
                  <td>{prod.supplierName}</td>
                  <td>{prod.Date_Ajout}</td>
                  <td>
                    <Link to={`/products/edit/${prod.Code_Product}`} className='btn btn-primary'>Edit</Link>
                    <Link to={`/products/show/${prod.Code_Product}`} className='btn btn-info ms-2'>Show</Link>
                    <button onClick={() => handleDelete(prod.Code_Product)} className='btn btn-danger ms-2'>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

