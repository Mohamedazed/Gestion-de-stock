// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import ShowSuppModal from './ModalsSupp/ShowSuppModal';
// import EditSuppModal from './ModalsSupp/EditSuppModal';

// export default function Suppliers() {
//   const [data, setData] = useState([]);
//   const [searchParams, setSearchParams] = useState({
//     id: '',
//     name: ''
//   });
//   const [Total, setTotal] = useState(0)
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [isShowModalOpen, setShowModalOpen] = useState(false);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//   const [supplier,setSupplier] = useState(null)

//   useEffect(() => {
//     axios.get('http://localhost:8081/suppliers')
//       .then(res => setData(res.data.result || []))
//       .catch(err => console.log(err));
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8081/suppliers/delete/${id}`);
//       setData(prevData => prevData.filter(s => s.id !== id));
//     } catch (error) {
//       console.error('Error deleting supplier:', error);
//     }
//   };

//   const handleSearch = () => {
//     axios.get(`http://localhost:8081/suppliers/search?code=${searchParams.id}&name=${searchParams.name}`)
//       .then(res => setData(res.data.result || []))
//       .catch(err => console.log(err));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSearchParams(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   useEffect(() => {
//     Count();
//   }, [])

//   const Count = () => {
//     axios.get('http://localhost:8081/supp_count')
//     .then(result => {
//       if(result.data.Status) {
//         setTotal(result.data.Result[0].nbSupp)
//       } else {
//         alert(result.data.Error)
//       }
//     })
//   }

//   const openShowModal = (supplier) => {
//     setSelectedSupplier(supplier);
//     setShowModalOpen(true);
//   };

//   const openEditModal = (supplier) => {
//     setSelectedSupplier(supplier);
//     setEditModalOpen(true);
//   };

//   const closeShowModal = () => {
//     setShowModalOpen(false);
//   };

//   const closeEditModal = () => {
//     setEditModalOpen(false);
//   };

//   return (
//     <div className="container">
//       <div style={{ marginTop: '70px' }}>
//         <h3>Suppliers</h3>
//         <p>
//           <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></span>
//           / <span style={{ color: 'gray' }}>Suppliers</span>
//         </p>
//       </div>

//      {/* Show Supplier Modal */}
//      {isShowModalOpen && (
//           <ShowSuppModal
//             isOpen={isShowModalOpen}
//             onClose={closeShowModal}
//             supplier={selectedSupplier}
//           />
//         )}

//         {/* Edit Supplier Modal */}
//         {isEditModalOpen && (
//           <EditSuppModal
//             isOpen={isEditModalOpen}
//             onClose={closeEditModal}
//             supplier={supplier}
//             handleChange={handleChange} 
//             handleSubmit={handleSubmit} 
//           />
//         )}
//       <div>
//         <table className='table border'>
//           <thead>
//             <tr>
//               <th className='bg-warning-subtle'>
//                 <div className="m-2">
//                   <h2>List of Suppliers:</h2>
//                 </div>
//               </th>
//               <th className='bg-warning-subtle'>
//                   <div className='m-2'>
//                     <Link to="/suppliers/create" className="btn btn-warning ">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/></svg>  New supplier
//                     </Link>
//                   </div>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className='bg-light'>
//             <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Products</h5>
              
//               <td style={{display : 'flex'}} className='bg-light m-2'>
              
//                 <div style={{display : 'flex'}} >
//                   ID: <input type="text" name="id" value={searchParams.id} onChange={handleChange} className='border rounded m-2'/>
//                   Name: <input type="text" name="name" value={searchParams.name} onChange={handleChange} className='border rounded m-2'/>
                
//               <button className='btn btn-success' onClick={() => handleSearch()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
//                    Search
//                 </button></div>
//               </td>
//               <td className='bg-light'>
//               <div className='px-3 pt-2 pb-3 border bg-warning-subtle shadow-sm w-40'>
//                     <div className='text-center pb-1'>
//                         <h4>Number of suppliers</h4>
//                     </div>
//                     <hr />
//                 <div className='d-flex justify-content-between '>
//                     <h5>Total: </h5>
//                     <h5> {Total} supplier</h5>
//                 </div>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <table className="table table-striped table-hover border">
//           <thead>
//             <tr>
//               <th className='bg-warning-subtle'>Code</th>
//               <th className='bg-warning-subtle'>Image</th>
//               <th className='bg-warning-subtle'>Name</th>
//               <th className='bg-warning-subtle'>Phone</th>
//               <th className='bg-warning-subtle'>Email</th>
//               <th className='bg-warning-subtle'>Address</th>
//               <th className='bg-warning-subtle'>Company</th>
//               <th className='bg-warning-subtle'>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//               Array.isArray(data) && data.length > 0 ? (
//                 data.map((supplier, index) => (
//                   <tr key={index}>
//                     <td className='bg-warning-subtle'>{supplier.Code_Supplier}</td>
//                     <td><img src={`http://localhost:8081/${supplier.image.replace(/\\/g, '/')}`} alt="supplier" width='150px' height='100px'/></td>
//                     <td>{supplier.Name}</td>
//                     <td>{supplier.Phone}</td>
//                     <td>{supplier.Email}</td>
//                     <td>{supplier.Adresse}</td>
//                     <td>{supplier.Company}</td>
//                     <td>
//                       {/* Updated buttons */}
//                       <button onClick={() => openShowModal(supplier)} className='btn btn-outline-info rounded-circle m-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg></button>
//                     <Link to={`/suppliers/edit/${supplier.Code_Supplier}`} className='btn btn-outline-primary rounded-circle m-1'>
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg>
//                     </Link>
//                       <button onClick={() => handleDelete(supplier.Code_Supplier)} className="btn btn-outline-danger rounded-circle m-1">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7">No data available</td>
//                 </tr>
//               )
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShowSuppModal from './ModalsSupp/ShowSuppModal';
import EditSuppModal from './ModalsSupp/EditSuppModal';

export default function Suppliers() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    id: '',
    name: ''
  });
  const [Total, setTotal] = useState(0)
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isShowModalOpen, setShowModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [supplier,setSupplier] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchData = () => {
    const queryParams = {
      ...searchParams,
      page: currentPage,
      pageSize: pageSize,
    };
    axios.get('http://localhost:8081/suppliers', { params: queryParams })
      .then(result => {console.log('API Response:', result.data); 
        setData(result.data.result || [])
        setTotalPages(Math.ceil(result.data.result.length / pageSize));
        
      })
      .catch(err => console.log(err));
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/suppliers/delete/${id}`);
      setData(prevData => prevData.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting supplier:', error);
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

  useEffect(() => {
    Count();
    fetchData();
  }, [currentPage])

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

  return (
    <div className="container">
      <div style={{ marginTop: '70px' }}>
        <h3>Suppliers</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></span>
          / <span style={{ color: 'gray' }}>Suppliers</span>
        </p>
      </div>

     {/* Show Supplier Modal */}
     {isShowModalOpen && (
          <ShowSuppModal
            isOpen={isShowModalOpen}
            onClose={closeShowModal}
            supplier={selectedSupplier}
          />
        )}

        {/* Edit Supplier Modal */}
        {isEditModalOpen && (
          <EditSuppModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            supplier={supplier}
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
          />
        )}
      <div>
        <table className='table border'>
          <thead>
            <tr>
              <th className='bg-warning-subtle'>
                <div className="m-2">
                  <h2>List of Suppliers:</h2>
                </div>
              </th>
              <th className='bg-warning-subtle'>
                  <div className='m-2'>
                    <Link to="/suppliers/create" className="btn btn-warning ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/></svg>  New supplier
                    </Link>
                  </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-light'>
            <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Products</h5>
              
              <td style={{display : 'flex'}} className='bg-light m-2'>
              
                <div style={{display : 'flex'}} >
                  ID: <input type="text" name="id" value={searchParams.id} onChange={handleChange} className='border rounded m-2'/>
                  Name: <input type="text" name="name" value={searchParams.name} onChange={handleChange} className='border rounded m-2'/>
                
              <button className='btn btn-success' onClick={() => handleSearch()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
                   Search
                </button></div>
              </td>
              <td className='bg-light'>
              <div className='px-3 pt-2 pb-3 border bg-warning-subtle shadow-sm w-40'>
                    <div className='text-center pb-1'>
                        <h4>Number of suppliers</h4>
                    </div>
                    <hr />
                <div className='d-flex justify-content-between '>
                    <h5>Total: </h5>
                    <h5> {Total} supplier</h5>
                </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-striped table-hover border">
          <thead>
            <tr>
              <th className='bg-warning-subtle'>Code</th>
              <th className='bg-warning-subtle'>Image</th>
              <th className='bg-warning-subtle'>Name</th>
              <th className='bg-warning-subtle'>Phone</th>
              <th className='bg-warning-subtle'>Email</th>
              <th className='bg-warning-subtle'>Address</th>
              <th className='bg-warning-subtle'>Company</th>
              <th className='bg-warning-subtle'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(data) && data.length > 0 ? (
                data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((supplier, index) => (
                  <tr key={index}>
                    <td className='bg-warning-subtle'>{supplier.Code_Supplier}</td>
                    <td><img src={`http://localhost:8081/${supplier.image.replace(/\\/g, '/')}`} alt="supplier" width='150px' height='100px'/></td>
                    <td>{supplier.Name}</td>
                    <td>{supplier.Phone}</td>
                    <td>{supplier.Email}</td>
                    <td>{supplier.Adresse}</td>
                    <td>{supplier.Company}</td>
                    <td>
                      {/* Updated buttons */}
                      <button onClick={() => openShowModal(supplier)} className='btn btn-outline-info rounded-circle m-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg></button>
                    <Link to={`/suppliers/edit/${supplier.Code_Supplier}`} className='btn btn-outline-primary rounded-circle m-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg>
                    </Link>
                      <button onClick={() => handleDelete(supplier.Code_Supplier)} className="btn btn-outline-danger rounded-circle m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>
                      </button>
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
            <li className='page-item'>
              <button className='page-link' disabled>
                {currentPage}
              </button>
            </li>
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
  );
}
