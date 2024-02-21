import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Categories from './categories/Categories';
import Products from './products/Products';
import Suppliers from './suppliers/Suppliers';
import Profile from './Profile';
import Employees from './Employees';
import Login from './Login';
import Signup from './Signup';
import './sidebar.css';
import {
  UserOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [auth,setAuth] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:8081')
    .then(res => {
      if(res.data.Status === "Success"){
        setAuth(true)
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
      navigate('/login', { replace: true });
    }).catch(err => console.log(err))

  }

  return (
    <>
    { auth ?  (
    <main className={show ? 'space-toggle' : null} >
      <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
        </div>
      </header>

      <aside className={`sidebar ${show ? 'show' : null}`}>
        <nav className='nav'>
          <div>
            <Link to='/' className='nav-logo'>
              <i className={`fas fa-home-alt nav-logo-icon`}></i>
              <span className='nav-logo-name'>Homepage</span>
            </Link>

            <div className='nav-list'>
              <Link to='/' className='nav-link active'>
                <i className='fas fa-tachometer-alt nav-link-icon'></i>
                <span className='nav-link-name'>Dashboard</span>
              </Link>
              <Link to='/categories' className='nav-link'>
                <i ><AppstoreAddOutlined /></i>
                <span className='nav-link-name'>Categories</span>
              </Link>
              <Link to='/products' className='nav-link'>
                <i ><ShoppingCartOutlined /></i>
                <span className='nav-link-name'>Products</span>
              </Link>
              <Link to='/suppliers' className='nav-link'>
                <i><SolutionOutlined /></i>
                <span className='nav-link-name'>Suppliers</span>
              </Link>
              <Link to='/employees' className='nav-link'>
                <i ><TeamOutlined /></i>
                <span className='nav-link-name'>Employees</span>
              </Link>
              <Link to='/profile' className='nav-link'>
                <i ><UserOutlined /></i>
                <span className='nav-link-name'>Profile</span>
              </Link>
            </div>
          </div>

          <Link to='/logout' className='nav-link' onClick={handleDelete}>
            <i className='fas fa-sign-out nav-link-icon'></i>
            <span className='nav-link-name' >Logout</span>
          </Link>
        </nav>
      </aside>

      {/* <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
      </div> */}

    </main>
  ) : (<div>
         
     </div>
    )}
      </>
  );
};

export default Sidebar;