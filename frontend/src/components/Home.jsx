import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
// import Sidebar from './components/Sidebar';

export default function Home() {
  const [auth,setAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [name,setName] = useState('')

  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:8081')
    .then(res => {
      if(res.data.Status === "Success"){
        setAuth(true)
        setName(res.data.name)
        // navigate('/login')
      }else{
        setAuth(false)
        setMessage(res.data.Error)
      }
    })
    .then(err => console.log(err));
  },[])

  const handleDelete = () => {
    axios.get('http://localhost:8081/logout')
    .then(res => {
      location.reload(true);
      navigate('/login', { replace: true });
    }).catch(err => console.log(err))
  }

  return (
    <div className='container'>
      
      welcom home
      {
        auth ? 
        <div>
          <h3>you are authourized --- {name}</h3>
          <button className='btn btn-danger' onClick={handleDelete}>Logout</button>
        </div>
        : <div>
            <h3>{message}</h3>
            <h3>login now</h3>
            <Link to="/login" className='btn btn-primary'>login</Link>
        </div>
      }
    </div>
  )
}
