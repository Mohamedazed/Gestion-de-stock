import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShowSuppMod from './ModalsSupplier/ShowSuppMod';
import EditSuppMod from './ModalsSupplier/EditSuppMod';
import ConfirmModS from './ModalsSupplier/ConfirmModS';
import AddModS from './ModalsSupplier/AddModS';

export default function SuppE() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    id: '',
    name: ''
  });
  const [Total, setTotal] = useState(0)
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isShowModalOpen, setShowModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [supplier, setSupplier] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Adresse: '',
    Company: '',
    image: null,
    imageChanged: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    Count();
    fetchData();
  }, [currentPage, pageSize, searchParams])
  
  const fetchData = () => {
    const queryParams = {
      ...searchParams,
      page: currentPage,
      pageSize: pageSize,
    };
    axios.get('http://localhost:8081/suppliers', { params: queryParams })
      .then(result => {
        setData(result.data.result || [])
        setTotalPages(Math.ceil(result.data.result.length / pageSize));
        
      })
      .catch(err => console.log(err));
  }

  const handleDelete = async (id) => {
    setSelectedSupplier(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/suppliers/delete/${selectedSupplier}`);
      setData(prevData => prevData.filter(prod => prod.Code_Supplier !== selectedSupplier));
    } catch (error) {
      console.error('Error deleting supplier:', error);
    } finally {
      setModalOpen(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
    axios.get(`http://localhost:8081/suppliers/search?code=${searchParams.id}&name=${searchParams.name}`)
      .then(res => setData(res.data.result || []))
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
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
    axios.get('http://localhost:8081/supp_count')
    .then(result => {
      if(result.data.Status) {
        setTotal(result.data.Result[0].nbSupp)
      } else {
        alert(result.data.Error)
      }
    })
  }

  const openShowModal = (supplier) => {
    setSelectedSupplier(supplier);
    setShowModalOpen(true);
  };

  const openEditModal = (supplier) => {
    setSelectedSupplier(supplier);
    setEditModalOpen(true);
  };

  const closeShowModal = () => {
    setShowModalOpen(false);
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

  useEffect(() => {
    axios.get(`http://localhost:8081/suppliers/show/${selectedSupplier && selectedSupplier.Code_Supplier}`)
      .then(res => {
        console.log(selectedSupplier); 
        if (res.data && res.data.result && Array.isArray(res.data.result) && res.data.result.length > 0) {
          setSupplier({
            Name: res.data.result[0].Name,
            Phone: res.data.result[0].Phone,
            Email: res.data.result[0].Email,
            Adresse: res.data.result[0].Adresse,
            Company: res.data.result[0].Company,
            image: res.data.result[0].image,
            imageChanged: false
          });
        } else {
          console.error('Invalid data structure in response:', res.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, [selectedSupplier]);

  const handleChang = (e) => {
    const { name, value } = e.target;
    setSupplier(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (acceptedFiles) => {
    setSupplier(prevState => ({
      ...prevState,
      image: acceptedFiles[0],
      imageChanged: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", supplier);
    const formData = new FormData();
    formData.append('id', selectedSupplier.Code_Supplier);
    formData.append('Name', supplier.Name);
    formData.append('Phone', supplier.Phone);
    formData.append('Email', supplier.Email);
    formData.append('Adresse', supplier.Adresse);
    formData.append('Company', supplier.Company);
    formData.append('image', supplier.image);

    axios.put(`http://localhost:8081/suppliers/edit/${selectedSupplier.Code_Supplier}`, formData)
      .then(res => {
        console.log(res.data);
        navigate('/employe/empHome');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleAddSupp = () => {
    setAddModalOpen(true);
  };

  return (
    <div className="container">

     {/* Show Supplier Modal */}
     {isAddModalOpen && (
      <AddModS show={isAddModalOpen} handleClose={closeAddModal} />
      )}

     {isShowModalOpen && (
          <ShowSuppMod
            isOpen={isShowModalOpen}
            onClose={closeShowModal}
            supplier={selectedSupplier}
          />
        )}

        {/* Edit Supplier Modal */}
        {isEditModalOpen && (
          <EditSuppMod
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            supplier={supplier}
            handleChange={handleChang} 
            handleSubmit={handleSubmit} 
            handleFileChange={handleFileChange}
          />
        )}
        <ConfirmModS isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirmDelete} />

        <div >
      <div className='mb-4 '>
      <div className='bg-white p-2 rounded-5 border border-warning shadow-sm'>
              <div className='d-flex justify-content-between align-items-center m-2'>
                <h4>List of Suppliers</h4>
                {/* <button onClick={handleAddSupp} className="btn btn-warning shadow rounded-pill">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/></svg>  New supplier
                    </button> */}
                  </div>
                  <div>
            <div className='rounded-pill p-3 border bg-warning-subtle'>
            <div className='d-flex justify-content-between bg-warning-subtle'>
            <h5 className='bg-warning-subtle m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Suppliers</h5>
            
              <div className='w-35 me-4'>
                <div className='input-group '>
                  <input type="text" name="name" value={searchParams.name} class="form-control" onChange={handleChange} className='form-control rounded-start-pill border-end-0' placeholder='Search' />
                  <span className='input-group-text bg-white border-start-0 '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg></span>
                  <button  onClick={() => handleSearch()} className='btn border btn-success ' style={{zIndex: 0}}>Search</button>
                </div>
              </div>  
                
              </div>
            </div>

          </div>
        </div>
        </div>

        <div className="border border-warning p-2 bg-white mb-2 pb-0 rounded-5 px-3">
        <div className="d-flex justify-content-between">
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px' }}>Show</p>
          <input type='number' value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ width: '60px', padding: '3px', marginRight: '10px',appearance: 'textfield',}}  className='mb-3'/>
          <p style={{ marginLeft: '5px' }}> lines</p>
        </div>
        <div>
          <p>Total : {Total} Supplier</p>
        </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
        <table className="table table-striped table-hover border text-center ">
          <thead>
            <tr>
              <th className='bg-warning-subtle'>Code</th>
              <th className='bg-warning-subtle'>Image</th>
              <th className='bg-warning-subtle'>Name</th>
              <th className='bg-warning-subtle'>Phone</th>
              <th className='bg-warning-subtle'>Email</th>
              <th className='bg-warning-subtle'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(data) && data.length > 0 ? (
                data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((supplier, index) => (
                  <tr key={index}>
                    <td>{supplier.Code_Supplier}</td>
                    <td>{supplier.image?<img src={`http://localhost:8081/${supplier.image}`} alt="supplier" width='90px' height='90px' className='rounded-4' style={{backgroundSize: 'cover'}}/>: <img width='90px' height='90px' src='/public/noImg.png' className='rounded-pill' style={{backgroundSize: 'cover'}}/>}</td>
                    <td>{supplier.Name}</td>
                    <td>{supplier.Phone}</td>
                    <td>{supplier.Email}</td>
                    <td>
                      {/* Updated buttons */}
                      <button onClick={() => openShowModal(supplier)} className='btn btn-outline-info rounded-circle m-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg></button>
                      {/* <button onClick={() => openEditModal(supplier)} className='btn btn-outline-primary rounded-circle m-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(supplier.Code_Supplier)} className="btn btn-outline-danger rounded-circle m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No data available</td>
                </tr>
              )
            }
          </tbody>
        </table>
        </div>
        </div>
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
  );
}
