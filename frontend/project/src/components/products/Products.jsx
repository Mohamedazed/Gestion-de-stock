import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Products() {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchSupplier, setSearchSupplier] = useState('');

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
      await axios.delete(`http://localhost:8081/products/delete/${id}`);
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

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/products/search`, {
        params: {
          id: searchId,
          name: searchTerm,
          category: searchCategory,
          supplier: searchSupplier
        }
      });
      const products = response.data.result;
      const updatedData = await Promise.all(products.map(async (prod) => {
        const supplierName = await fetchSupplierName(prod.Code_Supplier);
        return { ...prod, supplierName };
      }));
      setData(updatedData);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div className="container">
      <div style={{ marginTop: '70px' }}>
        <h3>Products</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
          / <span style={{ color: 'gray' }}>Products</span>
        </p>
      </div>

      <div>
      <table className='table border'>
          <thead >
            <tr >
              <th className='bg-warning-subtle'>
                <div className='m-2'>
                  <h2 >Liste des Products :</h2>
                </div>
              </th>
              <th className='bg-warning-subtle'>
                  <div className='m-2'>
                    <Link to="/products/create" className='btn btn-warning' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/></svg> New Product
                    </Link>
                  </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-light'>
              <td className='bg-light'>
              <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Products</h5>
              
                ID: <input type="text"  value={searchId} onChange={(e) => setSearchId(e.target.value)} className='border rounded m-2'/>
                Name: <input type="text"  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='border rounded m-2'/>
                Categorie:  <input type="text"  value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className='border rounded m-2'/>
                Supplier:  <input type="text"  value={searchSupplier} onChange={(e) => setSearchSupplier(e.target.value)} className='border rounded m-2'/>
                
              </td>
              <td className='bg-light'><br/><br/>
              <button className='btn btn-success' onClick={() => handleSearch()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
                   Search
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table className='table table-striped table-hover border'>
          <thead className='bg-dark text-white'>
            <tr>
              <th className='bg-warning-subtle'>Id</th>
              <th className='bg-warning-subtle'>Image</th>
              <th className='bg-warning-subtle'>Name</th>
              <th className='bg-warning-subtle'>Catégorie</th>
              <th className='bg-warning-subtle'>Prix</th>
              <th className='bg-warning-subtle'>Quantité</th>
              <th className='bg-warning-subtle'>Supplier</th>
              <th className='bg-warning-subtle'>Date d'ajout</th>
              <th className='bg-warning-subtle text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((prod) => (
                <tr key={prod.Code_Product} >
                  <td className='bg-warning-subtle'>{prod.Code_Product}</td>
                  <td><img src={`http://localhost:8081/${prod.Product_Image.replace(/\\/g, '/')}`} alt="Product" width='150px' height='100px'/></td>
                  <td>{prod.name}</td>
                  <td>{prod.Categorie}</td>
                  <td>{prod.Prix}</td>
                  <td>{prod.Quantite}</td>
                  <td>{prod.supplierName}</td>
                  <td>{prod.Date_Ajout}</td>
                  <td className='bg-warning-subtle text-center'>
                    <Link to={`/products/edit/${prod.Code_Product}`} className='btn btn-outline-primary rounded-circle m-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>
                    </Link>
                    <Link to={`/products/show/${prod.Code_Product}`} className='btn btn-outline-info rounded-circle m-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>
                    </Link>
                    <button onClick={() => handleDelete(prod.Code_Product)} className='btn btn-outline-danger rounded-circle m-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>
                    </button>
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

