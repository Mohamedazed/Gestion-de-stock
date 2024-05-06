import React, { useRef, useState } from 'react';
import EmployeeLogin from './EmployeeLogin';
import '../App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navb from './../components/Navb';
import Footer from '../components/footer';

export default function SignupEmployee() {
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

  // const handleSignUp = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     const nameValue = name.current.value;
  //     const emailValue = email.current.value;
  //     const passwordValue = password.current.value;

  //     axios.post('http://localhost:8081/employee/signupEmployee', {
  //       name: nameValue,
  //       email: emailValue,
  //       password: passwordValue,
  //     })
  //       .then(res => {
  //         if (res.data.Status === "Success") {
  //           navigate('/employee_login');
  //         } else {
  //           alert('Error');
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   }
  // };

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      const nameValue = name.current.value;
      const emailValue = email.current.value;
      const passwordValue = password.current.value;
  
      axios.post('http://localhost:8081/employee/signupEmployee', {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      })
        .then(res => {console.log(res.data)
          if (res.data.Status === "Success") {
            navigate('/employee_login');
          } else {
            alert('Unexpected error occurred');
          }
        })
        .catch(err => {
          if (err.response) {
            alert(err.response.data.error);
          } else {
            alert('An unexpected error occurred');
            console.error(err);
          }
        });
    }
  };
  

  const goToLogin = () => {
    navigate('/employee_login');
  };

  return (
    <>
      <Navb /> 
    <div id='body' className="login-container" style={{marginTop: '-25px'}}>
      <div className="login-popup">
        {/* Left Side - Form */}
        <div className="login-form bg" style={{ overflowY: 'auto' }}>
          <h1 className="text-center"><strong>Employee Sign Up</strong></h1>
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
          </form><br />
          <div className="text-center mt-auto">
          <b>Already have an account?</b>
            <span onClick={goToLogin} className='btn btn-link text-dark'><b>LOGIN</b></span>
            <Routes>
              <Route path='/employee_login' element={<EmployeeLogin />} />
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
