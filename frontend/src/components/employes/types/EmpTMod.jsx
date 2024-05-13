import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmpTMod = ({ onClose,id }) => {
  const [emp, setEmp] = useState([]);
  const [work, setWork] = useState()

  useEffect(() => {
    axios.get(`http://localhost:8081/employees/by-type/${id}`)
      .then(res => {
        setEmp(res.data.employees);
      })
      .catch(err => {
        console.error('Error fetching employees:', err);
      });
  }, [id]);
  
  useEffect(()=>{
    axios.get("http://localhost:8081/types/"+id)
    .then(res=>setWork(res.data.type_name))
    .catch(err => {
      console.error('Error fetching work:', err);
    });
},[id])

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block', width: '100%' }}>
      <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content">
          <div className="modal-header bg-warning-subtle">
            <h5 className="modal-title">{work} Employees</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body bg-light " style={{ overflowX: 'auto' }}>
            <table className="table table-hover border border-warning-subtle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {emp.length !== 0? (emp.map(employee => (
                  <tr key={employee.Code_Employee}>
                    <td>{employee.Code_Employee}</td>
                    <td>{employee.Name}</td>
                    <td>{employee.Email}</td>
                    <td>{employee.Phone}</td>
                    <td>{employee.salary}DH</td>
                  </tr>
                ))
                ) : (
                  <tr>
                    <td colSpan="5" className='text-center'>No employe available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpTMod;
