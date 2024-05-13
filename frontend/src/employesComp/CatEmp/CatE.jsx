import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmModalC from './ConfirmModalC';
import EditModalC from './modalsCategory/EditModalC';
import ModalC from './modalsCategory/ModalShowC';
import AddModC from './modalsCategory/AddModC';

const CatE = () => {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    id: '',
    name: ''
  });
  const [Total, setTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [values, setValues] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isModalOpenn, setModalOpenn] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    Count();
  }, [currentPage]);

  const fetchData = () => {
    const queryParams = {
      ...searchParams,
      page: currentPage,
      pageSize: pageSize,
    };
    axios.get('http://localhost:8081/categories', { params: queryParams })
      .then(result => {
        
          setData(result.data.result);
          setTotalPages(Math.ceil(result.data.result.length / pageSize));
        
      })
      .catch(err => console.log(err));
  };

  const Count = () => {
    axios.get('http://localhost:8081/cat_count')
      .then(result => {
        if (result.data.Status) {
          setTotal(result.data.Result[0].nbCat)
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err));
  }

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
    axios.get(`http://localhost:8081/categories/search?id=${searchParams.id}&name=${searchParams.name}`)
      .then(res => setData(res.data.result || []))
      .catch(err => console.log(err));
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setModalOpenn(true);
  };

  const openEditModal = (category)=>{
    setValues(category)
    setEditModalOpen(true)
  }
  const closeModal = () => {
    setModalOpenn(false);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openAddModal = (product) => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handlDelete = async (id) => {
    setSelectedCategory(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/delete/${selectedCategory}`);
      setData(prevData => prevData.filter(prod => prod.id !== selectedCategory));
    } catch (error) {
      console.error('Error deleting cat:', error);
    } finally {
      setModalOpen(false);
    }
  };

  useEffect(() => {
      axios.get(`http://localhost:8081/show/${data.id}`)
        .then(res => {
          if (res.data && res.data.result && Array.isArray(res.data.result) && res.data.result.length > 0) {
            setValues({
              id: res.data.result[0].id, 
              name: res.data.result[0].name,
              created_date: res.data.result[0].created_date
            });
          } else {
            console.error('Invalid data structure in response:', res.data);
          }
        })
        .catch(err => {
          console.error(err);
        });
  }, [data.id]);
  

  const handleChang = (e) => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/edit/${values.id}`, values)
      .then(res => {
        console.log(res.data);
        navigate('/employe/empHome');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleAddCat = () => {
    setAddModalOpen(true);
  };
  return (
    <div className='container'>

      {/* Modal */}
      {isAddModalOpen && (
      <AddModC show={isAddModalOpen} handleClose={closeAddModal} />
      )}

      {isModalOpenn && (
        <>
        <ModalC isOpen={isModalOpenn} onClose={closeModal} details={selectedCategory} />
        </>
      )}
      {isEditModalOpen && (
        <>
        <EditModalC isOpen={isEditModalOpen} onClose={closeEditModal} values={values} handleChange={handleChang} handleSubmit={handleSubmit} />
        </>
      )}
      <ConfirmModalC isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirmDelete} />

      <div >
      <div className='mb-4 '>
      <div className='bg-white p-2 rounded-5 border border-warning shadow-sm'>
              <div className='d-flex justify-content-between align-items-center m-2'>
                <h4 className='m-0'>Liste des categories :</h4>
                <button onClick={handleAddCat} className='btn btn-warning rounded-pill shadow-sm'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" /></svg> New categories
                </button>
              </div>
          <div>
            <div className='rounded-pill p-3 border bg-warning-subtle'>
            <div className='d-flex justify-content-between bg-warning-subtle'>
            <h5 className='bg-warning-subtle m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" /></svg> Find Categories</h5>
            
                <div className='w-35 me-4'>
                  <div className='input-group'>
                    <input type="text" name="name" value={searchParams.name} class="form-control" onChange={handleChange} className='form-control rounded-start-pill border-end-0' placeholder='Search' />
                    <span className='input-group-text bg-white border-start-0 '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg></span>
                    <button onClick={() => handleSearch()} className='btn border btn-success ' style={{zIndex: 0}}>Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="border border-warning p-2 bg-white mb-5 pb-0 rounded-5 px-3">
        <div className="d-flex justify-content-between">
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px' }}>Show</p>
          <input type='number' value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ width: '60px', padding: '3px', marginRight: '10px',appearance: 'textfield',}}  className='mb-3'/>
          <p style={{ marginLeft: '5px' }}> lines</p>
        </div>
        <div>
          <p>Total : {Total} Categorie</p>
        </div>
        </div>
 
        <table className='table table-striped table-hover border text-center '>
          <thead className='bg-dark'>
            <tr>
              <th className='bg-warning-subtle'>Id</th>
              <th className='bg-warning-subtle'>Name</th>
              <th className='bg-warning-subtle'>Created date</th>
              <th className='bg-warning-subtle'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((cat, index) => (
                <tr key={index} >
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{formatDate(cat.created_date)}</td>
                  <td>
                    <button onClick={() => openModal(cat)} className='btn btn-outline-info rounded-circle m-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg></button>
                    <button onClick={() => openEditModal(cat)} className='btn btn-outline-primary rounded-circle m-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg>
                    </button>
                    <button onClick={() => handlDelete(cat.id)} className='btn btn-outline-danger rounded-circle m-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" /><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" /></svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
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
};

export default CatE;