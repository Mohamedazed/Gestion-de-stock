import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShowProdModal from '../products/modalsProd/ShowProdModal';


export default function Purchases() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [product,setproduct] = useState(null)

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm]);
 
  const fetchData = async () => {
    try {
      const queryParams = {
        name: searchTerm
      };
        const response = await axios.get('http://localhost:8081/products', { params: queryParams })
        const products = response.data.result;
        const updatedData = await Promise.all(products.map(async (prod) => {
          const supplierName = await fetchSupplierName(prod.Code_Supplier);
          return { ...prod, supplierName };
        }));
        setData(updatedData);
        setTotalPages(Math.ceil(response.data.result.length / pageSize));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };


 
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
    setCurrentPage(1);
    try {
      const response = await axios.get(`http://localhost:8081/products/search`, {
        params: {
          name: searchTerm,
        }
      });
      setData(response.data.result);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };
  
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <div className="container">
      <div style={{ marginTop: '70px' }}>
        <h3>Purchases</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
          / <span style={{ color: 'gray' }}>Purchases</span>
        </p>
      </div>

      {isEditModalOpen && (
          <EditSuppModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            product={product}
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
          />
        )}

      <div>
      <table className='table border'>
          <thead >
            <tr >
              <th className='bg-warning-subtle'>
                <div className='m-2'>
                  <h2 >Liste des Purchases :</h2>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-light'>
              <td className='bg-light d-flex justify-content-between'>
              <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Products</h5>
              
              <div className='w-35 me-4'>
                <div className='input-group '>
                  <input type="text" name="name" value={searchTerm} class="form-control" onChange={(e) => setSearchTerm(e.target.value)} className='form-control rounded-start-pill border-end-0' placeholder='Search product' />
                  <span className='input-group-text bg-white border-start-0 '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg></span>
                  <button  onClick={() => handleSearch()} className='btn border btn-success ' style={{zIndex: 0}}>Search</button>
                </div>
              </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="border p-2 bg-light mb-5 pb-0">
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px' }}>Show</p>
          <input type='number' value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ width: '60px', padding: '3px', marginRight: '10px',appearance: 'textfield',}}  className='mb-3'/>
          <p style={{ marginLeft: '5px' }}> lines</p>
        </div>
        <table className='table table-striped table-hover border'>
          <thead className='bg-dark text-white'>
            <tr>
              <th className='bg-warning-subtle'>Id</th>
              <th className='bg-warning-subtle'>Image</th>
              <th className='bg-warning-subtle'>Name</th>
              <th className='bg-warning-subtle'>Catégorie</th>
              <th className='bg-warning-subtle'>Prix total</th>
              <th className='bg-warning-subtle'>Quantité</th>
              <th className='bg-warning-subtle'>Supplier</th>
              <th className='bg-warning-subtle'>Date d'achat</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((prod) => (
                <tr key={prod.Code_Product} >
                  <td className='bg-warning-subtle'>{prod.Code_Product}</td>
                  <td><img src={`http://localhost:8081/${prod.Product_Image.replace(/\\/g, '/')}`} className='rounded-circle border border-warning' alt={prod.Code_Product} width='100px' height='100px'/></td>
                  <td>{prod.name}</td>
                  <td>{prod.Categorie}</td>
                  <td>{(prod.Prix)*(prod.Quantite)}Dh</td>
                  <td>{prod.Quantite}</td>
                  <td>{prod.supplierName}</td>
                  <td>{formatDate(prod.Date_Ajout)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className='d-flex justify-content-center'>
          <nav aria-label='Page navigation example'>
            <ul className='pagination'>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className='page-link'
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {totalPages <= 10 ? (
                // Display all page buttons if total pages are less than or equal to 10
                Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button
                      className='page-link'
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))
              ) : (
                // Display up to 10 page buttons dynamically
                Array.from({ length: 10 }, (_, index) => {
                  const page = index + 1 + (currentPage > 5 ? currentPage - 5 : 0);
                  return (
                    page <= totalPages && (
                      <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button
                          className='page-link'
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    )
                  );
                })
              )}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className='page-link'
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      </div>
    </div>
  );
}


