import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, Route, Routes, Link } from 'react-router-dom';
import './sidebar.css';
import Home from './Home';
import Categories from './categories/Categories';
import Products from './products/Products';
import Suppliers from './suppliers/Suppliers';
import Profile from './profiles/Profile';
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
  ShopOutlined,
  ShoppingOutlined 
} from '@ant-design/icons';
import axios from 'axios';
import { Modal } from 'bootstrap';
import Types from './employes/types/types';
import Employees from './employes/Employees';
import CreateEmp from './employes/CreateEmp';
import EditEmp from './employes/EditEmp';
import EditType from './employes/types/EditType';
import CreateType from './employes/types/CreateType';
import EditProfil from './profiles/EditProfil';
import Sales from './sales/Sales';
import Purchases from './sales/Purchases';
import Panier from './sales/Panier';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null)
  const [id, setId] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`http://localhost:8081/profil/${name}`)
        .then((res) => {
          setId(res.data.UserId);
          setImage(res.data.Image)
        })
        .catch((err) => console.log(err));
    }
  }, [name]);

  useEffect(() => {
    axios
      .get('http://localhost:8081')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = () => {
    axios
      .get('http://localhost:8081/logout')
      .then((res) => {
        navigate('/login', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {auth ? (
        <main className={show ? 'space-toggle' : null}>
          <header className={`header ${show ? 'space-toggle' : null}`} style={{zIndex : 1}}>
          
            <div className='header-toggle' onClick={() => setShow(!show)}>
              <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
            </div>
            <div className='d-flex align-items-center'>
                <div className='me-3 mb-2 ms-5'>
                  <Link to='/panier' className='me-5 ms-5 panier'>
                    <i style={{ fontSize: '30px' }}><ShoppingCartOutlined /></i>
                  </Link>
                </div>
                <div className='input-group ms-5'>
                  <input type='text' className='form-control rounded-start-pill border-end-0' placeholder='Search' />
                  <span className='input-group-text bg-white border-start-0 '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg></span>
                  <button className='btn border btn-warning btnS'>Search</button>
                </div>
              
            </div>
            <div className='profile-link'>
      <Link to={`/profile/${id}`} className='profile-link-content'>
        <span className='profile-link-name'>{name}</span>
        <img src={`http://localhost:8081/uploads/${image}`} alt='Profile' className='profile-link-image' />
      </Link>
    </div>
            {/* <div className='ms-5 d-flex'>
  {window.innerWidth <= 768 ? (
    <Link to={`/profile/${id}`} className='ms-5'>
      <img src={`http://localhost:8081/uploads/${image}`} className='iconP' alt={name} />
    </Link>
  ) : (
    <Link to={`/profile/${id}`} className='border rounded-pill p-2 bg-light ms-5'>
      {name} <img src={`http://localhost:8081/uploads/${image}`} className='iconP' alt={name} />
    </Link>
  )}
</div> */}

          </header>

          <aside className={`sidebar ${show ? 'show' : null}`} style={{zIndex:2}}>
            <nav className='nav'>
              <div>
                <Link to='/' className='nav-logo'>
                  <i className={`fas fa-home-alt nav-logo-icon`}></i>
                  <span className='nav-logo-name'>Homepage</span>
                </Link>

                <div className='nav-list'>
                  <NavLink
                    to='/'
                    className='nav-link'
                    isActive={(match, location) => ['/'].includes(location.pathname)}
                  >
                    <i className='fas fa-tachometer-alt nav-link-icon'></i>
                    <span className='nav-link-name'>Dashboard</span>
                  </NavLink>
                  <NavLink to='/categories' className='nav-link'>
                    <i>
                      <AppstoreAddOutlined />
                    </i>
                    <span className='nav-link-name'>Categories</span>
                  </NavLink>
                  <NavLink to='/products' className='nav-link'>
                    <i>
                      <ShoppingCartOutlined />
                    </i>
                    <span className='nav-link-name'>Products</span>
                  </NavLink>
                  <NavLink to='/suppliers' className='nav-link'>
                    <i>
                      <SolutionOutlined />
                    </i>
                    <span className='nav-link-name'>Suppliers</span>
                  </NavLink>
                  <NavLink to='/sales' className='nav-link'>
                    <i>
                    <ShopOutlined />
                    </i>
                    <span className='nav-link-name'>Sales</span>
                  </NavLink>
                  <NavLink to='/purchases' className='nav-link'>
                    <i>
                      <ShoppingOutlined />
                    </i>
                    <span className='nav-link-name'>purchases</span>
                  </NavLink>
                  <NavLink to='/employees' className='nav-link'>
                    <i>
                      <TeamOutlined />
                    </i>
                    <span className='nav-link-name'>Employees</span>
                  </NavLink>
                  <NavLink to='/types' className='nav-link'>
                    <i>
                      <ApartmentOutlined />
                    </i>
                    <span className='nav-link-name'>Types</span>
                  </NavLink>

                  <NavLink to={`/profile/${id}`} className='nav-link'>
                    <i>
                      <UserOutlined />
                    </i>
                    <span className='nav-link-name'>Profile</span>
                  </NavLink>
                </div>
              </div>

              <NavLink to='/logout' className='nav-link' onClick={handleDelete}>
                <i className='fas fa-sign-out nav-link-icon'></i>
                <span className='nav-link-name'>Logout</span>
              </NavLink>
            </nav>
          </aside>
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/products' element={<Products />} />
            <Route path='/suppliers' element={<Suppliers />} />
            <Route path='/employees' element={<Employees />} />
            <Route path='/employees/create' element={<CreateEmp />} />
            <Route path='/employees/edit/:id' element={<EditEmp />} />
            <Route path='/types' element={<Types />} />
            <Route path='/employees/types/create' element={<CreateType />} />
            <Route path='/employees/types/edit/:id' element={<EditType />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/profil/edit/:id' element={<EditProfil />} />
            <Route path='/categories/create' element={<Create />} />
            <Route path='/show/:id' element={<Modal />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/products/create' element={<CreateProd />} />
            <Route path='/products/edit/:id' element={<EditProd />} />
            <Route path='/products/show/:id' element={<ShowProd />} />
            <Route path='/suppliers/create' element={<CreateSupp />} />
            <Route path='/suppliers/edit/:id' element={<EditSupp />} />
            <Route path='/suppliers/show/:id' element={<ShowSupp />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/purchases" element={<Purchases />} />
          </Routes>
        </main>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default Sidebar
