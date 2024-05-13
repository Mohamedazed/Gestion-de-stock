import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ConfirmModal from '../categories/ConfirmModal';
import ConfirmSModal from './ConfirmSModal';

export default function Sales() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Total, setTotal] = useState(0)
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchData();
    Count();
  }, [currentPage, searchTerm]);
 
  // const fetchData = async () => {
  //   try {
  //     const queryParams = {
  //       name: searchTerm
  //     };
  //       const response = await axios.get('http://localhost:8081/sale', { params: queryParams })
  //       const products = response.data.result;
  //       const updatedData = await Promise.all(products.map(async (prod) => {
          
  //         return { ...prod };
  //       }));
  //       setData(updatedData);
  //       setTotalPages(Math.ceil(response.data.result.length / pageSize));
  //     } catch (error) {
  //       console.error('Error fetching sales:', error);
  //     }
  //   };
  const fetchData = async () => {
    try {
      const queryParams = {
        name: searchTerm
      };
      const response = await axios.get('http://localhost:8081/sale', { params: queryParams });
      let sales = response.data.result;
  
      // Sort the sales based on the sale date in descending order
      sales.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));
  
      const updatedData = await Promise.all(sales.map(async (sale) => {
        return { ...sale };
      }));
      setData(updatedData);
      setTotalPages(Math.ceil(response.data.result.length / pageSize));
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handlDelete = async (id) => {
    setSelectedCategory(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/sale/delete/${selectedCategory}`);
      setData(prevData => prevData.filter(prod => prod.id !== selectedCategory));
    } catch (error) {
      console.error('Error deleting cat:', error);
    } finally {
      setModalOpen(false);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    try {
      const response = await axios.get(`http://localhost:8081/sales/search`, {
        params: {
          name: searchTerm,
        }
      });
      setData(response.data.result);
    } catch (error) {
      console.error('Error searching sales:', error);
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

  const Count = () => {
    axios.get('http://localhost:8081/sales_count')
    .then(result => {
      if(result.data.Status) {
        setTotal(result.data.Result[0].nbSupp)
      } else {
        alert(result.data.Error)
      }
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className='container'>
      <div style={{marginTop:'70px'}}>
                <h3 >Sales</h3>
                <p>
                    <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
                    / <span style={{ color: 'gray' }}>Sales</span>
                </p>
      </div>
      <ConfirmSModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirmDelete} />
      <div>
      <table className='table border'>
          <thead >
            <tr >
              <th className='bg-warning-subtle'>
                <div className='m-2'>
                  <h4 >Liste des Sales :</h4>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-light'>
              <td className='bg-light d-flex justify-content-between'>
              <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Sales</h5>
              
              <div className='w-35 me-4'>
                <div className='input-group '>
                  <input type="text" name="name" value={searchTerm} class="form-control" onChange={(e) => setSearchTerm(e.target.value)} className='form-control rounded-start-pill border-end-0' placeholder='Search sale' />
                  <span className='input-group-text bg-white border-start-0 '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg></span>
                  <button  onClick={() => handleSearch()} className='btn border btn-success ' style={{zIndex: 0}}>Search</button>
                </div>
              </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="border p-2 bg-light mb-5 pb-0" style={{ overflowX: 'auto' }}>
        <div className="d-flex justify-content-between">
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px' }}>Show</p>
          <input type='number' value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ width: '60px', padding: '3px', marginRight: '10px',appearance: 'textfield',}}  className='mb-3'/>
          <p style={{ marginLeft: '5px' }}> lines</p>
        </div>
        <div>
          <p>Total : {Total} Sale</p>
        </div>
        </div>
        <table className='table table-striped table-hover border'>
          <thead className='bg-dark text-white'>
            <tr className='text-center'>
              <th className='bg-warning-subtle'>Id</th>
              <th className='bg-warning-subtle'>Name</th>
              <th className='bg-warning-subtle'>Prix</th>
              <th className='bg-warning-subtle'>Quantité</th>
              <th className='bg-warning-subtle'>Total Prix</th>
              <th className='bg-warning-subtle'>Date d'achat</th>
              <th className='bg-warning-subtle'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((prod) => (
                <tr key={prod.id} className='text-center'>
                  <td className='bg-warning-subtle p-3'>{prod.id}</td>
                  <td className='p-3'>{prod.name}</td>
                  <td className='p-3'>{prod.price}Dh</td>
                  <td className='p-3'>{prod.quantity}</td>
                  <td className='p-3'>{prod.total_price}DH</td>
                  <td className='p-3'>{formatDate(prod.sale_date)}</td>
                  <td className='p-3'>
                    <button className="btn bg-danger-subtle btns shadow rounded-pill" onClick={() => handlDelete(prod.id)}>Delete <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" /><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" /></svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className='text-center'>No sale available</td>
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


