import React, { useRef, useState } from 'react';
import Login from './Login';
import '../App.css';
import {Route, Routes , useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navb from './Navb';
import Footer from './footer';

export default function Signup() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const nameVal = name.current.value;
    const emailVal = email.current.value;
    const passwordVal = password.current.value;
    const confirmPasswordVal = confirmPassword.current.value;
    const newErrors = {};

    if (!nameVal.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!emailVal.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!passwordVal.trim()) {
      newErrors.password = 'Password is required';
    } else if (!passwordVal.match(/^[a-zA-Z0-9]{8,}$/)) {
      newErrors.password = 'Password should only contain letters and numbers and be at least 8 characters';
    }

    if (passwordVal !== confirmPasswordVal) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length > 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const nameValue = name.current.value;
      const emailValue = email.current.value;
      const passwordValue = password.current.value;
      
      axios.post('http://localhost:8081/signup', {
            name: nameValue,
            email: emailValue,
            password: passwordValue,
          })
          .then(res => {
            if(res.data.Status === "Success"){
              navigate('/login')
            }else{
              alert('error')
            }
          })
          .then(err => console.log(err))
      
    }
  };


  const goToSignUp = () => {
    navigate('/login'); 
  };

  return (
    <>
      <Navb /> 
    <div id='body' className="login-container" style={{marginTop: '-25px'}}>
      <div className="login-popup">
        {/* Left Side - Form */}
        <div className="login-form" style={{ overflowY: 'auto' }}>
          <h1 className="text-center"><strong>Sign Up</strong></h1>
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Enter your name"
                ref={name}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email"
                ref={email}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter your password"
                ref={password}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Confirm your password"
                ref={confirmPassword}
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>
            <button
              type="submit"
              className="btn btn-warning"
            >
              Sign Up
            </button>
          </form><br/>
          <div className="text-center mt-auto">
          Already have an account?<span onClick={goToSignUp} className='btn btn-link text-dark mb-1'> Login</span>

              <Routes>
                <Route path='/login' element={<Login/>}/>
              </Routes>
            
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="login-image">
          {/* Add your image source here */}
          <img src="./bgform.jpg" alt="" className="img-fluid" />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
