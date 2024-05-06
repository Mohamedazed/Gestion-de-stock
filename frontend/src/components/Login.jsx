import React, { useRef, useState } from 'react';
import Signup from './Signup';
import { Route, Routes , useNavigate} from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Navb from './Navb';
import Footer from './footer';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const validateForm = () => {
    const emailVal = email.current.value;
    const passwordVal = password.current.value;
    const newErrors = {};

    if (!emailVal.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!passwordVal.trim()) {
      newErrors.password = 'Password is required';
    } else if (!passwordVal.match(/^[a-zA-Z0-9]{8,}$/)) {
      newErrors.password = 'Password should only contain letters and numbers and be at least 8 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length > 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        axios.post('http://localhost:8081/login', {
          email: emailValue,
          password: passwordValue,
        }, { withCredentials: true })
        .then(res => {
          if(res.data.Status === "Success"){
            navigate('/home')
          }else{
            alert(res.data.Error)
          }
        })
        .then(err => console.log(err))
        
    }
  };
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  
  //   if (!validateForm()) {
  //     const emailValue = email.current.value;
  //     const passwordValue = password.current.value;
  
  //     axios.post('http://localhost:8081/login', {
  //       email: emailValue,
  //       password: passwordValue,
  //     }, { withCredentials: true })
  //     .then(result => {
  //       if (result.data.loginStatus) {
  //         localStorage.setItem("valid", true);
  //         navigate('/home'); // Navigate to /home instead of /
  //       } else {
  //         alert(result.data.Error);
  //       }
  //     })
  //     .catch(err => console.log(err)); // Use catch to handle errors
  //   }
  // };

  
  const goToSignUp = () => {
    navigate('/signup'); 
  };

  return (
    <>
      <Navb /> 
    <div id='body' className="login-container" style={{marginTop: '-25px'}}>
      <div className="login-popup">
        {/* Left Side - Form */}
        <div className="login-form" style={{ overflowY: 'auto' }}>
          <h1 className="text-center"><strong>Login</strong></h1>
          <form onSubmit={handleLogin}>
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
            <button
              type="submit"
              className="btn btn-warning"
            >
              Login
            </button>
          </form><br />
          {errors.length > 0 &&
            <div className="alert alert-danger" role="alert">
              <strong>Error</strong>
              <ul>
                {errors.map((error, key) => <li key={key}>{error}</li>)}
              </ul>
            </div>
          }

          <div className="text-center mt-auto">
          Don't have an account? 
          <span onClick={goToSignUp} className='btn btn-link text-dark mb-1'>Sign up</span>

              <Routes>
                <Route path='/singup' element={<Signup/>}/>
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
