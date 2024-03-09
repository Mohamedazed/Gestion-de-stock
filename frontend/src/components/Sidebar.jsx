import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
import './sidebar.css';
import Home from './Home';
import Categories from './categories/Categories';
import Products from './products/Products';
import Suppliers from './suppliers/Suppliers';
import Profile from './Profile';
// import Employees from './Employees';
import Create from './categories/Create';
import Show from './categories/Show';
import Edit from './categories/Edit';
import CreateProd from './products/createProd';
import CreateSupp from './suppliers/CreateSupp';
import EditSupp from './suppliers/EditSupp';
import ShowSupp from './suppliers/ShowSupp';
import ShowProd from './products/ShowProd';
import EditProd from './products/EditProd';
import {
  UserOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  TeamOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { Modal } from 'bootstrap';
import Types from './employes/types/types';
import Employees from './employes/Employees';
import CreateEmp from './employes/CreateEmp';
import EditEmp from './employes/EditEmp';
import EditType from './employes/types/EditType';
import CreateType from './employes/types/CreateType';

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
              <Link to='/employees/types' className='nav-link'>
                <i ><ApartmentOutlined /></i>
                <span className='nav-link-name'>Types</span>
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
      <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employees/create" element={<CreateEmp />} />
                <Route path="/employees/edit/:id" element={<EditEmp />} />
                <Route path="/employees/types" element={<Types />} />
                <Route path="/employees/types/create" element={<CreateType/>} />
                <Route path="/employees/types/edit/:id" element={<EditType />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/categories/create" element={<Create />} />
                {/* <Route path="/show/:id" element={<Show />} /> */}
                <Route path="/show/:id" element={<Modal />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path='/products/create' element={<CreateProd/>}/>
                <Route path='/products/edit/:id' element={<EditProd/>}/>
                <Route path='/products/show/:id' element={<ShowProd/>} />
                <Route path='/suppliers/create' element={<CreateSupp/>}/>
                <Route path="/suppliers/edit/:id" element={<EditSupp />} />
                <Route path="/suppliers/show/:id" element={<ShowSupp/>} />
      </Routes>
    </main>
  ) : (<div>
         
     </div>
    )}
      </>
  );
};

export default Sidebar;

