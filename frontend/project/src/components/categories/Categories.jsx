import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Categories() {
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/categories')
    .then(res => setData(res.data.result || []))
    .catch(err =>  console.log(err))
  }, [])

  const handlDelete = (id) => {
    axios.delete('http://localhost:8081/delete/'+id)
    .then(res=>{location.reload()})
    .catch(err =>  console.log(err))
  }
  return(
    <div className='container mt-4'>
      <div>
        <h3 style={{marginTop:'70px'}} >Categories</h3>
        <p>
            <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
            / <span style={{ color: 'gray' }}>Categories</span>
        </p>
      </div> 

      <div>
        <div className='w-50 rounded p-3 '>
          <h2>Liste des categories :</h2>
          <div style={{float:'right'}}>
            <Link to="/categories/create" className='btn btn-success'>Create new categories</Link>
          </div>
        </div>
        <table className='table table-striped'>
          <thead className='bg-dark'>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Created date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(data) && data.length > 0 ? (
              data.map((cat, index)=>(
                 <tr key={index}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{cat.created_date}</td>
                  <td>
                    <Link to={`/edit/${cat.id}`} className='btn btn-primary'>Edit</Link>
                    <Link to={`/show/${cat.id}`} className='btn btn-info'>Show</Link>
                    <button onClick={()=> handlDelete(cat.id)} className='btn btn-danger'>Delete</button>
                  </td>
                </tr>
              )) 
              ) : (
                <tr>
                  <td colSpan="4">No data available</td>
                </tr>
              )
            } 
          </tbody>
        </table>
      </div>

  </div>
  )
}
