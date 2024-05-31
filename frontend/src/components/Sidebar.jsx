import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Route, Routes, Link } from 'react-router-dom';
import './sidebar.css';
import Home from './Home';
import Categories from './categories/Categories';
import Products from './products/Products';
import Suppliers from './suppliers/Suppliers';
import Profile from './profiles/Profile';
import Create from './categories/Create';
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
// import EditProfil from './profiles/EditProfil';
import Sales from './sales/Sales';
import Purchases from './sales/Purchases';
import Panier from './sales/Panier';
import ConfirmModalL from './ConfirmModalL';
import { Avatar } from 'keep-react';
import Select from 'react-select';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null)
  const [email, setEmail] = useState(null);
  const [id, setId] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8081/products/search', {
        params: { name: searchQuery }
      });
      setSearchResults(response.data.result);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

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
  
  useEffect(() => {
    if (name) {
      axios
        .get(`http://localhost:8081/profile/name/${name}`)
        .then((res) => {
          setId(res.data.UserId);
          setImage(res.data.Image);
          setEmail(res.data.Email);
        })
        .catch((err) => console.log(err));
    }
  }, [name]);
  

  const handleDelete = () => {
    setShowLogoutModal(true);
  };
  const options = searchResults.map((product) => ({
    value: product.id,
    label: product.name,
  }));
  const confirmLogout = () => {
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
                  {/* <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='form-control rounded-start-pill border-end-0' placeholder='Search' /> */}
                  <Select value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='form-control rounded-start-pill border-end-0 p-0' options={options} />
                  <span className='input-group-text bg-white border-start-0 '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg></span>
                  <button onClick={handleSearch} className='btn border btn-warning btnS'>Search</button>
                  
                </div>
              
            </div>
            <div className='profile-link'>
        <div className='d-flex mt-3 ' style={{marginRight:'-50px'}}>
          { image?
            (<div className='d-flex '>
              <span className='profile-link-name mt-2 ms-4'>{name}</span>
              <div className="nav-item dropdown me-5 mb-3">
                  <a class=" dropdown-toggle" href="#" style={{width:'30%'}} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={`http://localhost:8081/uploads/${image}`} alt='Profile' className='profile-link-image' />
                  </a>
                  <ul class="dropdown-menu mt-3">
                    <li className='ms-3'>{name}</li>
                    <li className='ms-3 text-secondary' style={{marginBottom:'-10px'}}>{email}</li>
                    <li><hr/><Link className="dropdown-item" to={`/profile/${id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="mb-1 bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>  Profile </Link></li>
                    <li><button className="dropdown-item" href="/logout" onClick={handleDelete}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="mb-1 bi bi-box-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/><path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/></svg> Logout</button></li>
                  </ul>
              </div>
            </div>)
            : (<div className='d-flex '>
              <span className='profile-link-name mt-3 ms-4'>{name}</span>
              <div className="nav-item dropdown" >
                  <a class="nav-link dropdown-toggle" href="#" style={{width:'20%', marginRight:'-20%'}} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Avatar size="sm" className='profile-link-image bg-light'/>
                  </a>
                  <ul class="dropdown-menu">
                    <li><Link class="dropdown-item" to={`/profile/${id}`}>Profile</Link></li>
                    <li><button class="dropdown-item" href="/logout" onClick={handleDelete}>Logout</button></li>
                  </ul>
              </div>
            </div>)
          }
           
          </div>
          </div>
          </header>

          <ConfirmModalL isOpen={showLogoutModal} onClose={() => (setShowLogoutModal(false), navigate('/home'))} onConfirm={() => confirmLogout()} />

          <aside className={`sidebar ${show ? 'show' : null}`} style={{zIndex:2}}>
            <nav className='nav'>
              <div>
                <Link to='/home' className='nav-logo'>
                <img src='/public/logoSM2.png' width='30px' style={{marginLeft: '-5px'}}/>
                  {/* <i className={`fas fa-home-alt nav-logo-icon`}></i> */}
                  <sapn className='nav-logo-name me-2' style={{ fontFamily:'spanrush Script MT'}}><b>Aizen Stock</b></sapn>
                </Link>

                <div className='nav-list'>
                  <NavLink
                    to='/home'
                    className='nav-link'
                    isActive={(match, location) => ['/home'].includes(location.pathname)}
                  >
                    <i className='fas fa-tachometer-alt nav-link-icon'></i>
                    <span className='nav-link-name'>Dashboard</span>
                  </NavLink>
                  <NavLink to={`/profile/${id}`} className='nav-link'>
                    <i>
                      <UserOutlined />
                    </i>
                    <span className='nav-link-name'>Profile</span>
                  </NavLink>
                  <br/>
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
                  </NavLink><br/>
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

                
                </div>
              </div>

              <NavLink to='/logout' className='nav-link' onClick={handleDelete}>
                <i className='fas fa-sign-out nav-link-icon'></i>
                <span className='nav-link-name'>Logout</span>
              </NavLink>
            </nav>
          </aside>
          <Routes >
            <Route path='/home' element={<Home />} />
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
            {/* <Route path='/profil/edit/:id' element={<EditProfil />} /> */}
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
export default Sidebar;