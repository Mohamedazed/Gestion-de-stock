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
import ConfirmModalE from "./ConfirmModalE";

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
    const [isModalOpen, setModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);

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
          .then(result => { 
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

      // const handleDelete = (Code_Employee) => {
      //   axios
      //     .delete(`http://localhost:8081/employes/${Code_Employee}`)
      //     .then(() => {
      //       setEmployees(employees.filter((emp) => emp.Code_Employee !== Code_Employee));
      //     })
      //     .catch((err) => console.log(err));
      // };
      const handleDelete = async (id) => {
        setEmployee(id);
        setModalOpen(true);
      };      
    
      const handleConfirmDelete = async (Code_Employee) => {
        try {
          await axios.delete(`http://localhost:8081/employes/delete/${Code_Employee}`);
          setEmployees(employees.filter((emp) => emp.Code_Employee !== Code_Employee));
        } catch (error) {
          console.error('Error deleting employee:', error);
        } finally {
          setModalOpen(false);
        }
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
                        <h5>{employeeTotal} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-raised-hand" viewBox="0 0 16 16"><path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207"/><path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/></svg></h5>
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
                <ConfirmModalE isOpen={isModalOpen} onClose={() => setModalOpen(false)} onConfirm={() => handleConfirmDelete(employee)} />

                <div className='px-3 pt-2 pb-3 border bg-warning-subtle shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Salary</h4>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <h5>Total: </h5>
                        <h5> {salaryTotal} <b>DH</b></h5>
                    </div>
                </div>
            </div>
            <div>
                

                <table className='table border'>
          <thead>
            <tr>
              <th className='d-flex justify-content-between bg-warning-subtle'>
                <div className="m-2">
                  <h2>List of Employees:</h2>
                </div>
              
                  <div className='m-2'>
                    <Link to="/employees/create" className="btn btn-warning ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/></svg>   Add Employee
                    </Link>
                  </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=' bg-light'>
              
              <td  className='d-flex justify-content-between bg-light '>
              {/* Name: <br/><input type="text" name="name" value={searchParams.name} onChange={handleChange} className='border rounded m-2 input-group-text bg-white rounded-pill'/>
              <button className='btn btn-success' onClick={() => handleSearch()} style={{zIndex: 0}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
                   Search
                </button> */}
                <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Products</h5>
            
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
          <p>Total : {employeeTotal}  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-raised-hand" viewBox="0 0 16 16"><path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207"/><path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/></svg></p>
        </div>
        </div>
                <table className="table table-striped table-hover border text-center">
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
                                <button onClick={() => handleDelete(emp.Code_Employee)} className="btn btn-outline-danger rounded-circle m-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                  </svg>
                                </button>
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
