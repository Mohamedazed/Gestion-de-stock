import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Suppliers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/suppliers')
      .then(res => setData(res.data.result || []))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/suppliers/delete/${id}`)
      .then(res => { window.location.reload(); })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4" style={{'paddingLeft': '40px'}}>
      <div style={{ marginTop: '70px' }}>
        <h3>Suppliers</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></span>
          / <span style={{ color: 'gray' }}>Suppliers</span>
        </p>
      </div>

      <div>
        <div className="w-50 rounded p-3 ">
          <h2>List of Suppliers:</h2>
          <div style={{ float: 'right' }}>
            <Link to="/suppliers/create" className="btn btn-success">Create new supplier</Link>
          </div>
        </div>
        <table className="table table-striped">
          <thead className="bg-dark">
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(data) && data.length > 0 ? (
                data.map((supplier, index) => (
                  <tr key={index}>
                    <td>{supplier.Code_Supplier}</td>
                    <td>{supplier.Name}</td>
                    <td>{supplier.Phone}</td>
                    <td>{supplier.Email}</td>
                    <td>{supplier.Adresse}</td>
                    <td>{supplier.Company}</td>
                    <td>
                      <Link to={`/suppliers/edit/${supplier.Code_Supplier}`} className="btn btn-primary">Edit</Link>
                      <Link to={`/suppliers/show/${supplier.Code_Supplier}`} className="btn btn-info">Show</Link>
                      <button onClick={() => handleDelete(supplier.Code_Supplier)} className="btn btn-danger">Delete</button>
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
  );
}

