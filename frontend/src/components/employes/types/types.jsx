import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ConfirmModalT from "./ConfirmModalT";
import EmpTMod from "./EmpTMod";

export default function Types() {
    const [types, settypes] = useState([]);
    const [searchParams, setSearchParams] = useState({
        name: ''
      });
    const [Total, setTotal] = useState(0)
    const [values, setValues] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEdItModalOpen, setEdItModalOpen] = useState(false);
    const [isEModalOpen, setEModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedType, setSelectedType] = useState(null)

    const fetchData = () => {
      const queryParams = {
        ...searchParams,
        page: currentPage,
        pageSize: pageSize,
      };
        axios.get("http://localhost:8081/employees/types", { params: queryParams })
          .then((result) => {
            setTotalPages(Math.ceil(result.data.result.length / pageSize)); 
            settypes(result.data.result || []);
        })
          .catch((err) => console.log(err));
      }
    
      const handleDelete = (id) => {
        setValues(id);
        setModalOpen(true);
      };

      const openShowModal = (id) => {
        setSelectedType(id);
        setEModalOpen(true);
      };
    
      const handleConfirmDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8081/types/delete/${id}`);
          settypes(types.filter(type => type.id !== id));
        } catch (error) {
          console.error('Error deleting type:', error);
        } finally {
          setModalOpen(false);
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

      const handleSearch = () => {
        setCurrentPage(1);
        fetchData();
        axios.get(`http://localhost:8081/employees/types/search?name=${searchParams.name}`)
          .then(res => settypes(res.data.result || []))
          .catch(err => console.log(err));
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    useEffect(() => {
      fetchData();
      Count();
    }, [currentPage]);

      const Count = () => {
        axios.get('http://localhost:8081/types_count')
        .then(result => {
          if(result.data.Status) {
            setTotal(result.data.Result[0].nbType)
          } else {
            alert(result.data.Error)
          }
        })
      }

      const closeEditModal = () => {
        setEdItModalOpen(false);
      };

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
      };

    return(
        <div className='container' >
            <div style={{marginTop:'70px'}}>
                <h3 >Types</h3>
                <p>
                    <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
                    / <span style={{ color: 'gray' }}>Types</span>
                </p>
            </div>
            <div>
            {isEModalOpen && (
                <>
                <EmpTMod isOpen={isEModalOpen} id={selectedType} onClose={()=>setEModalOpen(false)} />
                </>
            )}
            {isEdItModalOpen && (
                <>
                <EditModal isOpen={isEdItModalOpen} onClose={closeEditModal} values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
                </>
            )}
            <ConfirmModalT isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={() => handleConfirmDelete(values)} />

        <table className='table border'>
          <thead>
            <tr>
              <th className='d-flex justify-content-between bg-warning-subtle'>
                <div className="mt-1">
                  <h4>List Types of Employes:</h4>
                </div>
              
                  <div className='mt-1'>
                  <Link to="/employees/types/create" className="btn btn-warning rounded-pill shadow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/></svg>  Add Types</Link>
                
                  </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-light'>
             <td  className='d-flex justify-content-between bg-light '>
                <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Type</h5>
                <div className='w-35 me-4'>
                <div className='input-group '>
                  <input type="text" name="name" value={searchParams.name} class="form-control" onChange={handleChange} className='form-control rounded-start-pill border-end-0' placeholder='Search' />
                  <span className='input-group-text bg-white border-start-0 '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg></span>
                  <button  onClick={() => handleSearch()} className='btn border btn-success ' style={{zIndex: 0}}>Search</button>
                </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="border p-2 bg-light mb-5 pb-0">
          <div className="d-flex justify-content-between">
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px' }}>Show</p>
          <input type='number' value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ width: '60px', padding: '3px', marginRight: '10px',appearance: 'textfield',}}  className='mb-3'/>
          <p style={{ marginLeft: '5px' }}> lines</p>
        </div>
        <div>
          <p>Total : {Total} Types</p>
        </div>
        </div>
                <table className="table table-striped table-hover border ">
                    <thead>
                    <tr>
                        <th className='bg-warning-subtle'>Id</th>
                        <th className='bg-warning-subtle'>Name</th>
                        <th className='bg-warning-subtle'>Liste of employes</th>
                        <th className='bg-warning-subtle'>Created_at</th>
                        <th className='bg-warning-subtle text-center'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {types.length > 0 ? (types.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td><button onClick={()=>openShowModal(emp.id)} className="btn btns text-dark rounded-4" style={{backgroundColor: '#ecbf6d'}}> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-lines-fill " viewBox="0 0 16 16">
                                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                                </svg> {emp.name}s
                                </button>
                            </td>
                            <td>{formatDate(emp.created_date)}</td>
                            <td className="text-center">
                                <Link to={`/employees/types/edit/${emp.id}`} className='btn btn-outline-info rounded-circle m-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg></Link>
                                <button onClick={() => handleDelete(emp.id)} className="btn btn-outline-danger rounded-circle m-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg></button>
                            </td>
                        </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No type available</td>
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
    )
}
