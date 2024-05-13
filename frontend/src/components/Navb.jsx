import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom';

const Navb = () => {
  const [showNavList, setShowNavList] = useState(false);

  const toggleNavList = () => {
    setShowNavList(!showNavList);
  };

  return (
    <>
    <nav className='navbar navbar-expand-lg navbar-light bg-white-subtle rounded-5 shadow-sm ms-5 me-3' style={{marginTop: '-70px'}}>
      <div className='container'>
        <Link to='/' className='navbar-brand d-flex' >
          <img src='/public/logoSM2.png' width='40px'/><b className='ms-2 d-lg-block text-dark d-none'>Aizen Stock Management</b>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          onClick={toggleNavList}
        >
          <span className='navbar-toggler-icon '></span>
        </button>
        <div
          className={`collapse navbar-collapse ${showNavList ? 'show' : ''}`}
        >
          <ul className='navbar-nav ms-auto mt-1 mb-1'>
            <li className='nav-item bg-dark rounded-pill b'>
                <NavLink
                  to='/login'
                  className='btn bg-warning-subtle rounded-pill p-3'
                  activeclassname='active'
                >
                  <b>Login Admin</b>
                </NavLink>
                <NavLink
                  to='/employee_login'
                  className='bg-dark rounded-pill text-light p-3 b'
                  activeclassname='active'
                >
                  <b>Employee</b>
                </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>

    </>
  );
};

export default Navb;
