// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function Employees() {
//     const [employees, setEmployees] = useState([]);
//     const [searchParams, setSearchParams] = useState({
//       id: '',
//       name: '',
//       salary: ''
//     });
//     const [employeeTotal, setemployeeTotal] = useState(0)
//     const [salaryTotal, setSalaryTotal] = useState(0)
//     const [isEditModalOpen, setEditModalOpen] = useState(false);
//     const [employee, setEmployee] = useState(null)

//     useEffect(() => {
//         employeeCount();
//         salaryCount();
//       }, [])

//       const employeeCount = () => {
//         axios.get('http://localhost:8081/employee_count')
//         .then(result => {
//           if(result.data.Status) {
//             setemployeeTotal(result.data.Result[0].employee);
//           }
//         })
//       }

//       const salaryCount = () => {
//         axios.get('http://localhost:8081/salary_count')
//         .then(result => {
//           if(result.data.Status) {
//             setSalaryTotal(result.data.Result[0].salaryOFEmp)
//           } else {
//             alert(result.data.Error)
//           }
//         })
//       }

//     useEffect(() => {
//         axios.get("http://localhost:8081/employes")
//           .then((res) => setEmployees(res.data.result || []))
//           .catch((err) => console.log(err));
//       }, []);
    
//       const handleDelete = (Code_Employee) => {
//         axios
//           .delete(`http://localhost:8081/employes/${Code_Employee}`)
//           .then(() => {
//             setEmployees(employees.filter((emp) => emp.Code_Employee !== Code_Employee));
//           })
//           .catch((err) => console.log(err));
//       };

//       const handleSearch = () => {
//         axios.get(`http://localhost:8081/employees/search?code=${searchParams.id}&name=${searchParams.name}&salary=${searchParams.salary}`)
//           .then(res => setEmployees(res.data.result || []))
//           .catch(err => console.log(err));
//       };
    
//       const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSearchParams(prevState => ({
//           ...prevState,
//           [name]: value
//         }));
//       };

//       const closeEditModal = () => {
//         setEditModalOpen(false);
//       };
    
//     return(
//         <div className='container' >
//             <div style={{marginTop:'70px'}}>
//                 <h3 >All Employees</h3>
//                 <p>
//                     <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
//                     / <span style={{ color: 'gray' }}>Employees</span>
//                 </p>
//             </div>

//             <div className='p-3 d-flex justify-content-around mt-3'>
            
//                 <div className='px-3 pt-2 pb-3 border bg-warning-subtle shadow-sm w-25'>
//                     <div className='text-center pb-1'>
//                         <h4>Employee</h4>
//                     </div>
//                     <hr />
//                     <div className='d-flex justify-content-between'>
//                         <h5>Total:</h5>
//                         <h5>{employeeTotal}</h5>
//                     </div>
//                 </div>

//                 {isEditModalOpen && (
//                   <EditSuppModal
//                     isOpen={isEditModalOpen}
//                     onClose={closeEditModal}
//                     employees={employees}
//                     handleChange={handleChange} 
//                     handleSubmit={handleSubmit} 
//                   />
//                 )}

//                 <div className='px-3 pt-2 pb-3 border bg-warning-subtle shadow-sm w-25'>
//                     <div className='text-center pb-1'>
//                         <h4>Salary</h4>
//                     </div>
//                     <hr />
//                     <div className='d-flex justify-content-between'>
//                         <h5>Total: </h5>
//                         <h5> {salaryTotal}DH</h5>
//                     </div>
//                 </div>
//             </div>
//             <div>
                

//                 <table className='table border'>
//           <thead>
//             <tr>
//               <th className='bg-warning-subtle'>
//                 <div className="m-2">
//                   <h2>List of Employees:</h2>
//                 </div>
//               </th>
//               <th className='bg-warning-subtle'>
//                   <div className='m-2'>
//                     <Link to="/employees/create" className="btn btn-warning ">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/></svg>   Add Employee
//                     </Link>
//                   </div>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className='bg-light'>
//             <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Products</h5>
              
//               <td style={{display : 'flex'}} className='bg-light m-2'>
//               <div>ID: <br/><input type="text" name="id" value={searchParams.id} onChange={handleChange} className='border rounded m-2'/></div>
//               <div>Name: <br/><input type="text" name="name" value={searchParams.name} onChange={handleChange} className='border rounded m-2'/></div>
//               <div>Salary: <br/><input type="text" name="salary" value={searchParams.salary} onChange={handleChange} className='border rounded m-2'/></div>
              
//               </td>
//               <td className='bg-light'><br/><br/><br/>
//                 <button className='btn btn-success' onClick={() => handleSearch()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
//                    Search
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>

//                 <table className="table table-striped table-hover border">
//                     <thead>
//                     <tr>
//                         <th className='bg-warning-subtle'>Id</th>
//                         <th className='bg-warning-subtle'>Image</th>
//                         <th className='bg-warning-subtle'>Name</th>
//                         <th className='bg-warning-subtle'>Email</th>
//                         <th className='bg-warning-subtle'>Phone</th>
//                         <th className='bg-warning-subtle'>Address</th>
//                         <th className='bg-warning-subtle'>Salary</th>
//                         <th className='bg-warning-subtle'>Actions</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {employees.map((emp) => (
//                         <tr key={emp.Code_Employee}>
//                             <td>{emp.Code_Employee}</td>
//                             <td><img src={`http://localhost:8081/${emp.image.replace(/\\/g, '/')}`} alt={emp.Name} width='100px' height='100px'/></td>
//                             <td>{emp.Name}</td>
//                             <td>{emp.Email}</td>
//                             <td>{emp.Phone}</td>
//                             <td>{emp.Adresse}</td>
//                             <td>{emp.salary}</td>
//                             <td>
//                                 <Link to={`/employees/edit/${emp.Code_Employee}`} className='btn btn-outline-info rounded-circle m-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg></Link>
//                                 <button onClick={() => handleDelete(emp.Code_Employee)} className="btn btn-outline-danger rounded-circle m-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg></button>
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [searchParams, setSearchParams] = useState({
      id: '',
      name: '',
      salary: ''
    });
    const [employeeTotal, setemployeeTotal] = useState(0)
    const [salaryTotal, setSalaryTotal] = useState(0)
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [employee, setEmployee] = useState(null)

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        employeeCount();
        salaryCount();
      }, [])

      useEffect(() => {
        fetchData();
      }, [currentPage]);

      const employeeCount = () => {
        axios.get('http://localhost:8081/employee_count')
        .then(result => {
          if(result.data.Status) {
            setemployeeTotal(result.data.Result[0].employee);
          }
        })
      }

      const salaryCount = () => {
        axios.get('http://localhost:8081/salary_count')
        .then(result => {
          if(result.data.Status) {
            setSalaryTotal(result.data.Result[0].salaryOFEmp)
          } else {
            alert(result.data.Error)
          }
        })
      }

      const fetchData = () => {
        const queryParams = {
          ...searchParams,
          page: currentPage,
          pageSize: pageSize,
        };
        axios.get("http://localhost:8081/employes", { params: queryParams })
          .then(result => {console.log('API Response:', result.data); 
          setEmployees(result.data.result );
          setTotalPages(Math.ceil(result.data.result.length / pageSize));
      })
          .catch((err) => console.log(err));
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

      const handleDelete = (Code_Employee) => {
        axios
          .delete(`http://localhost:8081/employes/${Code_Employee}`)
          .then(() => {
            setEmployees(employees.filter((emp) => emp.Code_Employee !== Code_Employee));
          })
          .catch((err) => console.log(err));
      };

      const handleSearch = () => {
        setCurrentPage(1);
        fetchData();
        axios.get(`http://localhost:8081/employees/search?code=${searchParams.id}&name=${searchParams.name}&salary=${searchParams.salary}`)
          .then(res => setEmployees(res.data.result || []))
          .catch(err => console.log(err));
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const closeEditModal = () => {
        setEditModalOpen(false);
      };
    
    return(
        <div className='container' >
            <div style={{marginTop:'70px'}}>
                <h3 >All Employees</h3>
                <p>
                    <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
                    / <span style={{ color: 'gray' }}>Employees</span>
                </p>
            </div>

            <div className='p-3 d-flex justify-content-around mt-3'>
            
                <div className='px-3 pt-2 pb-3 border bg-warning-subtle shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Employee</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <h5>Total:</h5>
                        <h5>{employeeTotal}</h5>
                    </div>
                </div>

                {isEditModalOpen && (
                  <EditSuppModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    employees={employees}
                    handleChange={handleChange} 
                    handleSubmit={handleSubmit} 
                  />
                )}

                <div className='px-3 pt-2 pb-3 border bg-warning-subtle shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Salary</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <h5>Total: </h5>
                        <h5> {salaryTotal}DH</h5>
                    </div>
                </div>
            </div>
            <div>
                

                <table className='table border'>
          <thead>
            <tr>
              <th className='bg-warning-subtle'>
                <div className="m-2">
                  <h2>List of Employees:</h2>
                </div>
              </th>
              <th className='bg-warning-subtle'>
                  <div className='m-2'>
                    <Link to="/employees/create" className="btn btn-warning ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/></svg>   Add Employee
                    </Link>
                  </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-light'>
            <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Products</h5>
              
              <td style={{display : 'flex'}} className='bg-light m-2'>
              <div>ID: <br/><input type="text" name="id" value={searchParams.id} onChange={handleChange} className='border rounded m-2'/></div>
              <div>Name: <br/><input type="text" name="name" value={searchParams.name} onChange={handleChange} className='border rounded m-2'/></div>
              <div>Salary: <br/><input type="text" name="salary" value={searchParams.salary} onChange={handleChange} className='border rounded m-2'/></div>
              
              </td>
              <td className='bg-light'><br/><br/><br/>
                <button className='btn btn-success' onClick={() => handleSearch()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
                   Search
                </button>
              </td>
            </tr>
          </tbody>
        </table>

                <table className="table table-striped table-hover border">
                    <thead>
                    <tr>
                        <th className='bg-warning-subtle'>Id</th>
                        <th className='bg-warning-subtle'>Image</th>
                        <th className='bg-warning-subtle'>Name</th>
                        <th className='bg-warning-subtle'>Email</th>
                        <th className='bg-warning-subtle'>Phone</th>
                        <th className='bg-warning-subtle'>Address</th>
                        <th className='bg-warning-subtle'>Salary</th>
                        <th className='bg-warning-subtle'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((emp) => (
                        <tr key={emp.Code_Employee}>
                            <td>{emp.Code_Employee}</td>
                            <td><img src={`http://localhost:8081/${emp.image.replace(/\\/g, '/')}`} alt={emp.Name} width='100px' height='100px'/></td>
                            <td>{emp.Name}</td>
                            <td>{emp.Email}</td>
                            <td>{emp.Phone}</td>
                            <td>{emp.Adresse}</td>
                            <td>{emp.salary}</td>
                            <td>
                                <Link to={`/employees/edit/${emp.Code_Employee}`} className='btn btn-outline-info rounded-circle m-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg></Link>
                                <button onClick={() => handleDelete(emp.Code_Employee)} className="btn btn-outline-danger rounded-circle m-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg></button>
                            </td>
                        </tr>
                    ))}
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
        </div>
    )
}
