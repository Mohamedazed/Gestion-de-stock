import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmpCMod = ({ onClose, id }) => {
  const [emp, setEmp] = useState([]);
  const [work, setWork] = useState()

  useEffect(() => {
    axios.get(`http://localhost:8081/products-by-category/${work}`)
      .then(res => {
        setEmp(res.data.result);
      })
      .catch(err => {
        console.error('Error fetching employees:', err);
      });
  }, [id, work]);
  
  useEffect(()=>{
    axios.get("http://localhost:8081/show/"+id)
    .then(res=>{
      setWork(res.data.result[0].name)
  })
    .catch(err => {
      console.error('Error fetching work:', err);
    });
    },[id])
    console.log(emp)
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
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantite</th>
                  <th>Origin Price</th>
                  <th>Price for sale</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {emp.length !==0 ? (emp.map(employee => (
                  <tr key={employee.Code_Product}>
                    <td><img src={`http://localhost:8081/${employee.Product_Image}`} alt={employee.name} style={{ width: '40px', height: '40px' }} className='rounded-circle'/></td>
                    <td>{employee.name}</td>
                    <td>{employee.Quantite}</td>
                    <td>{employee.Prix}DH</td>
                    <td className='text-warning'>{employee.prix_sale}DH</td>
                  </tr>
                ))
                ) : (
                  <tr>
                    <td colSpan="5" className='text-center'>No product available for this category</td>
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

export default EmpCMod;
