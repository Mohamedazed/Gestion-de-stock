// // import axios from "axios";
// // import React, { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Navb from './Navb';
// // useEffect

// // const Start = () => {
// //     const navigate = useNavigate()
// //   axios.defaults.withCredentials = true;
// //   useEffect(() => {
// //     axios.get('http://localhost:8000/')
// //     .then(result => {
// //       if(result.data.Status) {
// //         if(result.data.name === "admin") {
// //           navigate('/')
// //         } else {
// //           navigate('/employee_detail/'+result.data.id)
// //         }
// //       }
// //     }).catch(err =>console.log(err))
// //   }, [])

// //   return (
// //     <>
// //       <Navb /> 
// //     <div className="d-flex justify-content-center align-items-center vh-100 loginPage" style={{marginTop: '-5%'}}>
// //       <div className="p-3 d-flex justify-content-center rounded border bg-white shadow rounded-5 " style={{width: '90%',height: '85%', marginTop: '8%', marginBottom: '2%'}}>
// //         <div className="w-25 text-warning mt-5">
// //           <h1 className="mt-5">Stock <br/>Management</h1>
// //           <p className="text-dark">Our Inventory Management system is designed to streamline and automate the process of tracking inventory, managing stock levels, and organizing products efficiently. With intuitive interfaces for both employees and administrators, our platform ensures seamless navigation and efficient workflows. From adding new products to generating detailed reports, our system empowers businesses to optimize their inventory control, enhance productivity, and make data-driven decisions. Welcome aboard, and let's elevate your inventory management experience together!</p>
// //         </div>
// //         <div className="temp " style={{border: 'none',marginLeft:'15%'}}></div>
// //         {/* <h2 className="text-center">Login As</h2>
// //         <div className="d-flex justify-content-between mt-5 mb-2">
// //           <button type="button" className="btn btn-primary" onClick={() => {navigate('/employee_login')}}>
// //             Employee
// //           </button>
// //           <button type="button" className="btn btn-success" onClick={() => {navigate('/login')}}>
// //             Admin
// //           </button>
// //         </div> */}
// //       </div>
// //     </div>
// //     </>
// //   );
// // };

// // export default Start;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navb from './Navb';

// const Start = () => {
//   const navigate = useNavigate();
//   const [showMore, setShowMore] = useState(false);

//   axios.defaults.withCredentials = true;
//   useEffect(() => {
//     axios.get('http://localhost:8000/')
//       .then(result => {
//         if (result.data.Status) {
//           if (result.data.name === "admin") {
//             navigate('/');
//           } else {
//             navigate('/employee_detail/' + result.data.id);
//           }
//         }
//       }).catch(err => console.log(err));
//   }, []);

//   return (
//     <>
//       <Navb />
//       <div className="d-flex justify-content-center align-items-center vh-100 loginPage" style={{marginTop: '-5%'}}>
//         <div className="p-3 d-flex justify-content-center rounded border bg-white shadow rounded-5" style={{width: '90%', height: '85%', marginTop: '8%', marginBottom: '2%'}}>
//           <div className="w-25 text-warning mt-5">
//             <h1 className="mt-5">Stock <br/>Management</h1>
//             <p className="text-dark " style={{width: '160%'}}>
//               Our Inventory Management system is designed to streamline and automate the process of tracking inventory, 
            
//             {showMore ? (
//               <>
//                 <p className="text-dark">managing stock levels, and organizing products efficiently. With intuitive interfaces for both employees and administrators, our platform ensures seamless navigation and efficient workflows. From adding new products to generating detailed reports, our system empowers businesses to optimize their inventory control and enhance productivity. Welcome aboard, and let's elevate your inventory management experience together!</p>
//               </>
//             ) : null}
//             <button className="btn btn-link text-warning" onClick={() => setShowMore(!showMore)}>
//               {showMore ? "Show Less" : "Learn More"}
//             </button>
//             </p>
//           </div>
//           <div className="temp" style={{border: 'none', marginLeft:'15%'}}></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Start;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navb from './Navb';
import { Link } from 'react-router-dom';
import Footer from "./footer";

const Start = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(result => {
        if (result.data.Status) {
          if (result.data.name === "admin") {
            navigate('/');
          } else {
            navigate('/employee_detail/' + result.data.id);
          }
        }
      }).catch(err => console.log(err));
  }, []);

  return (
    <>
      <Navb />
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage ms-4" style={{marginTop: '-5%'}}>
        <div className="p-3 d-flex justify-content-center rounded border bg-white shadow rounded-5" style={{ overflowX: 'auto', width: '90%', height: '85%', marginTop: '8%', marginBottom: '2%'}}>
          <div className="w-75 text-warning mt-5 ms-2" style={{ maxWidth: '600px' }}>
            <div className="d-flex justify-content-center">
              <img src='/public/logoSM2.png' className="mt-2" width='100px' height='90px' style={{marginLeft: '-15%'}}/>
              <h1 className="mt-1 ms-2" >Stock <br/>Management</h1>
            </div>
            <div style={{ overflowX: 'auto' }} className="me-5">
              <p className="text-dark mt-3 me-5">
                Our Inventory Management system <q>Aizen</q> is designed to automate the process of tracking inventory, 
                {showMore ? (
                  <>
                    managing stock levels, and organizing products efficiently. With intuitive interfaces for both <Link
                  to='/employee_login'>employees</Link> and <Link
                  to='/login'>admins</Link>, our platform ensures efficient workflows. From adding new products to generating detailed reports, our system empowers businesses to optimize their inventory control and enhance productivity. Welcome aboard, and let's elevate your inventory management experience together!
                  </>
                ) : null}
              </p>
              <button className="btn btn-link text-warning" onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show Less" : "Learn More"}
              </button>
            </div>
          </div>
          <div className="temp" style={{border: 'none', marginLeft:'-7%'}}></div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Start;
