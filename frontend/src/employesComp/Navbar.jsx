// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from "axios";
// import { NavLink, useNavigate } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';
// import ProdE from './ProdEmp/ProdE';
// import SuppE from './SupEmp/SuppE';
// import CatE from './CatEmp/CatE';
// import EmpHome from './empHome';
// import PanierEmp from './PanierEmp';
// import ProfilEmp from './ProfEmp/ProfilEmp';

// const Navbar = ({ name }) => {
//     const [showNavList, setShowNavList] = useState(false);
//     const navigate = useNavigate();
//     const [id, setId] = useState(null);

//     const toggleNavList = () => {
//         setShowNavList(!showNavList);
//     };

//     const handleLogout = () => {
//         axios.post('http://localhost:8081/employee/logoutEmploye')
//             .then((res) => {
//                 console.log(res.data);
//                 navigate('/', { replace: true });
//             })
//             .catch((err) => console.log(err));
//     };

//     useEffect(() => {
//         if (name) {
//             axios
//                 .get(`http://localhost:8081/employee/profile/name/${name}`)
//                 .then((res) => {
//                     setId(res.data.UserId);
//                 })
//                 .catch((err) => console.log(err));
//         }
//     }, [name]);

//     return (
//         <div className='bg-light' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginTop: '-79px' }}>
//             <div>
//                 <nav className='navbar navbar-expand-lg navbar-light text-dark bg-warning-subtle rounded-pill ms-5 me-4 mt-3 shadow-sm' style={{ zIndex: 1 }}>
//                     <div className='container ms-5 '>
//                         <NavLink to='/employe/empHome' className='navbar-brand'>
//                             <img src='/public/logoSM2.png' width='40px' alt="Logo" />
//                         </NavLink>
//                         <button
//                             className='navbar-toggler'
//                             type='button'
//                             onClick={toggleNavList}
//                         >
//                             <span className='navbar-toggler-icon'></span>
//                         </button>
//                         <div
//                             className={`collapse navbar-collapse ${
//                                 showNavList ? 'show' : ''
//                                 }`}
//                         >
//                             <ul className='navbar-nav ms-4 me-5 mt-1 d-flex justify-content-center '>
//                                 <li className='nav-item '>
//                                     <NavLink to='/employe/catE' className='nav-link text-dark p-2 rounded-pill w-75'>
//                                         Categories
//                                     </NavLink>
//                                 </li>
//                                 <li className='nav-item'>
//                                     <NavLink to='/employe/prodE' className='nav-link text-dark p-2 rounded-pill w-75'>
//                                         Products
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink to='/employe/SuppE' className='nav-link text-dark p-2 rounded-pill w-75'>
//                                         Suppliers
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink to={`/employe/profE/${id}`} className='nav-link text-dark p-2 rounded-pill w-75'>
//                                         Profile
//                                     </NavLink>
//                                 </li>
//                             </ul>
//                         </div>
//                         <ul className={`ms-5 collapse navbar-collapse ${
//                             showNavList ? 'show ' : ''
//                             }`} >
//                             <li className='ms-5'>
//                                 <button className='btn btn-danger ms-5 rounded-pill mt-2' onClick={handleLogout}>
//                                     Logout
//                                 </button>
//                             </li>
//                         </ul>
//                     </div>
//                 </nav>
//             </div>
//             <div className='d-flex flex-column flex-lg-row justify-content-between ms-5'>
//                 <main className='d-flex justify-content-left'>
//                     <Routes>
//                         <Route path='/empHome' element={<EmpHome />} />
//                         <Route path='/catE' element={<CatE />} />
//                         <Route path='/prodE' element={<ProdE />} />
//                         <Route path="/SuppE" element={<SuppE />} />
//                         <Route path='/profE/:id' element={<ProfilEmp />} />
//                     </Routes>
//                 </main>
//                 <aside className='aside mt-4 order-last order-lg-last'>
//                     <PanierEmp />
//                 </aside>
//             </div>
//             <footer className='mt-4 bg-warning-subtle' style={{ padding: '20px', textAlign: 'center', marginTop: 'auto' }}>
//                 <p>&copy; 2024 Aizen Stock Management App. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// };
// export default Navbar;

// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import { Link, NavLink, Routes, Route,useNavigate } from 'react-router-dom';
// import ProdE from './ProdEmp/ProdE';
// import SuppE from './SupEmp/SuppE';
// import CatE from './CatEmp/CatE';
// import EmpHome from './empHome';
// import PanierEmp from './PanierEmp';
// import ProfilEmp from './ProfEmp/ProfilEmp';


// const Navbar = () => {
//   const [userId, setUserId] = useState(null); 
//   const [username, setUsername] = useState(null);
//   const [showNavList, setShowNavList] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:8081/', { withCredentials: true }) 
//       .then((res) => {console.log(res)
//         const { name, id } = res.data;
//         setUsername(name);
//         setUserId(id);
//       })
//       .catch((err) => console.log(err));
//   }, []); 

//   const toggleNavList = () => {
//     setShowNavList(!showNavList);
//   };

//   const handleLogout = () => {
//     axios.post('http://localhost:8081/employee/logoutEmploye') 
//         .then((res) => {
//             console.log(res.data);
//             navigate('/', { replace: true });
//         })
//         .catch((err) => console.log(err));
//   };

//   return (
//     <div className='bg-light' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' ,marginTop: '-79px'}}>
//       <div>
//         <nav className='navbar navbar-expand-lg navbar-light text-dark bg-warning-subtle rounded-5 ms-5 me-4 mt-3 shadow-sm' style={{ zIndex: 1}}>
//           <div className='container ms-5 '>
//             <Link to='/employe/empHome' className='navbar-brand'>
//               <img src='/public/logoSM2.png' width='40px'/>
//             </Link>
//             <button
//               className='navbar-toggler'
//               type='button'
//               onClick={toggleNavList}
//             >
//               <span className='navbar-toggler-icon'></span>
//             </button>
//             <div
//               className={`collapse navbar-collapse ${
//                 showNavList ? 'show' : ''
//               }`}
//             >
//               <ul className='navbar-nav mt-1 mx-auto align-items-center'>
//               <li className='nav-item '>
//                   <Link to='/employe/empHome' className='nav-links text-dark ps-2 rounded-pill ' >
//                     Home
//                   </Link>
//                 </li>
//                 <li className='nav-item '>
//                   <Link to='/employe/catE' className='nav-links text-dark p-2 rounded-pill '>
//                     Categories
//                   </Link>
//                 </li>
//                 <li className='nav-item'>
//                   <Link to='/employe/prodE' className='nav-links text-dark p-2 rounded-pill '>
//                     Products
//                   </Link>
//                 </li>
//                 <li className='nav-item'>
//                   <NavLink to='/employe/SuppE' className='nav-links text-dark p-2 rounded-pill '>
//                     Suppliers
//                   </NavLink>
//                 </li>
//                 <li className='nav-item'>
//                   <NavLink to={`/employe/profE/${userId}`} className='nav-links text-dark p-2 rounded-pill '>
//                     Profile
//                   </NavLink>
//                 </li>
//                 <li className='nav-item'>
//                 <button className='btn btn-warning mb-2 rounded-5 ' style={{ width: '100%' }} onClick={handleLogout}>
//                   Logout <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
//                     <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
//                     <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
//                   </svg>
//                 </button>
//               </li>
//               </ul>
//             </div>
            
//           </div>
          
//         </nav>
//       </div>
//       <div className='d-flex flex-column flex-lg-row justify-content-between ms-5'>
//         <main className='d-flex justify-content-left'>
//           <Routes>
//             <Route path='/empHome' element={<EmpHome />} />
//             <Route path='/catE' element={<CatE />} />
//             <Route path='/prodE' element={<ProdE />} />
//             <Route path="/SuppE" element={<SuppE />} />
//             <Route path='/profE/:id' element={<ProfilEmp />} />
//           </Routes>
//         </main>
//         <aside className='aside mt-4 order-last order-lg-last'>
//           <PanierEmp />
//         </aside>
//       </div>
//       <footer className='mt-4 bg-warning-subtle' style={{  padding: '20px', textAlign: 'center', marginTop: 'auto'}}>
//         <p>&copy; 2024 Aizen Stock Management App. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import ProdE from './ProdEmp/ProdE';
import SuppE from './SupEmp/SuppE';
import CatE from './CatEmp/CatE';
import EmpHome from './empHome';
import PanierEmp from './PanierEmp';
import ProfilEmp from './ProfEmp/ProfilEmp';
import './navbarE.css';
import ConfirmModL from './ConfirmModL';
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; 

const Navbar = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [showNavList, setShowNavList] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8081/', { withCredentials: true })
      .then((res) => {
        console.log(res);
        const { name, id } = res.data;
        setUsername(name);
        setUserId(id);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleNavList = () => {
    setShowNavList(!showNavList);
  };

  // const handleLogout = () => {
  //   axios.post('http://localhost:8081/employee/logoutEmploye')
  //     .then((res) => {
  //       console.log(res.data);
  //       navigate('/', { replace: true });
  //     })
  //     .catch((err) => console.log(err));
  // };
  const handleLogout = () => {
    setShowLogoutModal(true);
  }
  
  const confirmLogout = () => {
    axios.post('http://localhost:8081/employee/logoutEmploye')
      .then((res) => {
        console.log(res.data);
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className='bg-light' style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', marginTop: '-79px' }}>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light text-dark bg-warning-subtle rounded-5 ms-5 me-4 mt-3 shadow-sm' style={{ zIndex: 1 }}>
          <div className='container ms-5 '>
            <Link to='/employe/empHome' className='navbar-brand'>
              <img src='/public/logoSM2.png' width='50px' />
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              onClick={toggleNavList}
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className={`collapse navbar-collapse ${showNavList ? 'show' : ''}`}
            >
              <ul className='navbar-nav mt-1 mx-auto align-items-center'>
                <li className='nav-item '>
                  <Link
                    to='/employe/empHome'
                    className={`nav-links text-dark ps-2 bg-warning-subtle ${activeLink === '/employe/empHome' ? 'active' : ''}`}
                    onClick={() => handleClick('/employe/empHome')}
                  >
                    Home
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link
                    to='/employe/catE'
                    className={`nav-links text-dark p-2 bg-warning-subtle ${activeLink === '/employe/catE' ? 'active' : ''}`}
                    onClick={() => handleClick('/employe/catE')}
                  >
                    Categories
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/employe/prodE'
                    className={`nav-links text-dark p-2 bg-warning-subtle ${activeLink === '/employe/prodE' ? 'active' : ''}`}
                    onClick={() => handleClick('/employe/prodE')}
                  >
                    Products
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/employe/SuppE'
                    className={`nav-links text-dark p-2 bg-warning-subtle ${activeLink === '/employe/SuppE' ? 'active' : ''}`}
                    onClick={() => handleClick('/employe/SuppE')}
                  >
                    Suppliers
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to={`/employe/profE/${userId}`}
                    className={`nav-links text-dark p-2 bg-warning-subtle ${activeLink === `/employe/profE/${userId}` ? 'active' : ''}`}
                    onClick={() => handleClick(`/employe/profE/${userId}`)}
                  >
                    Profile
                  </Link>
                </li>
                <li className='nav-item'>
                  <button className={`mt-1 btn btn-warning mb-2 rounded-5 ${showNavList ? 'btn-block px-5' : ''}`}  onClick={handleLogout}>
                    Logout <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <ConfirmModL isOpen={showLogoutModal} onClose={() => (setShowLogoutModal(false), navigate('/employe/empHome'))} onConfirm={() => confirmLogout()} />
        </nav>
      </div>
      <div className='d-flex flex-column flex-lg-row justify-content-between ms-5'>
        <main className='d-flex justify-content-left'>
          <Routes>
            <Route path='/empHome' element={<EmpHome />} />
            <Route path='/catE' element={<CatE />} />
            <Route path='/prodE' element={<ProdE />} />
            <Route path="/SuppE" element={<SuppE />} />
            <Route path='/profE/:id' element={<ProfilEmp />} />
          </Routes>
        </main>
        <aside className='aside mt-4 order-last order-lg-last' >
          <PanierEmp />
          <div className="mt-4 border p-4 me-5 ps-4 rounded-5 bg-white border-warning shadow">
            <Calendar className='ms-2 border-warning shadow-sm rounded-5'/>
          </div>
        </aside>
      </div>
      <footer className='mt-4 bg-warning-subtle' style={{ padding: '20px', textAlign: 'center', marginTop: 'auto' }}>
        <p>&copy; 2024 Aizen Stock Management App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Navbar;
