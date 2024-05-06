// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams, Link } from 'react-router-dom';
// import './profile.css';
// import EditModalProfil from './EditModalProfil';
// import axios from 'axios';

// const Profile = () => {
//   const [admin, setAdmin] = useState({
//     email:'',
//     image: '',
//     name: '',
//   });
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [currentDateTime, setCurrentDateTime] = useState(new Date());
//   const [values, setValues] = useState(null);
//   const [isEdItModalOpen, setEdItModalOpen] = useState(false);

//   useEffect(() => {
//     axios.get(`http://localhost:8081/profile/${id}`)
//       .then(res => {
//         if (res.data && Array.isArray(res.data.Result) && res.data.Result.length > 0) {
//           setAdmin({
//             ...admin,
//             name: res.data.Result[0].name,
//             image: res.data.Result[0].image,
//             email: res.data.Result[0].email,
//           });console.log(admin)
//         } else {
//           console.error('No admin data found for the given ID:', id);
//         }
//       })
//       .catch(err => console.log(err));
//   }, [id]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setAdmin(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', admin.name);
//     formData.append('image', admin.image);
//     axios.put(`http://localhost:8081/profile/edit/${id}`, formData)
//       .then(result => {console.log(formData)
//         console.log(result.data);
//         navigate(`/profile/${id}`);
//       })
//       .catch(err => console.log(err));
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const closeEditModal = () => {
//     setEdItModalOpen(false);
//   };
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000); // Update every second

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, []);

//   return (
//     <div className="container">
//       <div style={{marginTop:'70px'}}>
//         <h3 >Profile</h3>
//         <p>
//           <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
//             / <span style={{ color: 'gray' }}>Profile</span>
//         </p>
//       </div>

//       <div className="border d-flex shadow bg-light mt-4">
//       <div className="me-3 bg-warning-subtle ">
//         <div className="mt-3 mb-2">
//           <img src={`http://localhost:8081/uploads/${admin.image}`} alt={admin.name} className="profile-image border  m-2" />
//         </div>
//       </div>
//       <div className="p-2 ">
//         <div className="mb-2">
//           <h3>{admin.name}</h3>
//           <p className='text-secondary' style={{marginTop:'-10px'}}>{admin.email}</p>
//           <h5 style={{marginTop:'-10px'}}>Company:</h5>
//           <p className='text-secondary' style={{marginTop:'-8px'}}>SaberShop</p>
//           <h5>Current Date and Time:</h5>
//           <p className='text-secondary' style={{marginTop:'-8px'}}>{currentDateTime.toLocaleString()}</p>
//         </div>
//       </div>
//     </div>

//     <div className="border mt-5 p-3 shadow bg-light">
//   <div className="">
//   <div className="d-flex justify-content-between align-items-center">
//       <h4>Personal Details</h4>
//       <Link to={`/profil/edit/${id}`} className='btn bg-warning-subtle'>
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
//           <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
//         </svg>
//       </Link>
//     </div>
//   </div>
//   <div style={{marginLeft : '130px'}}>
//     <div className="">
//     <p className='ms-3'><span className='text-secondary me-2'>Name</span> {admin.name}</p>
//     </div>
//   </div>
//   <div style={{marginLeft : '130px'}}>
//     <div className="">
//     <p ><span className='text-secondary me-2'>Email ID</span> {admin.email}</p>
//     </div>
//   </div>
// </div>


          
//       {isEdItModalOpen && (
//                 <>
//                 <EditModalProfil isOpen={isEdItModalOpen} onClose={closeEditModal} admin={admin} handleChange={handleChange} handleSubmit={handleSubmit} />
//                 </>
//             )}
//     </div>
//   );
// }
// export default Profile


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './profile.css';
import EditModalProfil from './EditModalProfil';
import axios from 'axios';
import Sidebar from './../Sidebar';

const Profile = () => {
  const [admin, setAdmin] = useState({
    email:'',
    image: '',
    name: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [values, setValues] = useState(null);
  const [isEdItModalOpen, setEdItModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8081/profile/id/${id}`)
      .then(res => {
        if (res.data && Array.isArray(res.data.Result) && res.data.Result.length > 0) {
          setAdmin({
            ...admin,
            name: res.data.Result[0].name,
            image: res.data.Result[0].image,
            email: res.data.Result[0].email,
          });console.log(admin)
        } else {
          console.error('No admin data found for the given ID:', id);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setAdmin(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', admin.name);
    formData.append('image', admin.image);
    axios.put(`http://localhost:8081/profile/edit/${id}`, formData)
      .then(result => {console.log(formData)
        console.log(result.data);
        navigate(`/profile/${id}`);
      })
      .catch(err => console.log(err));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const closeEditModal = () => {
    setEdItModalOpen(false);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('name', admin.name);
    formData.append('image', file);
    axios.put(`http://localhost:8081/profile/edit/${id}`, formData)
      .then(result => {
        setAdmin(prevAdmin => ({
          ...prevAdmin,
          image: result.data.imageUrl
        }));
        console.log(result.data);
        navigate(`/profile/${id}`);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="container">
      <div style={{marginTop:'70px'}}>
        <h3 >Profile</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
            / <span style={{ color: 'gray' }}>Profile</span>
        </p>
      </div>
    
      <div className="border d-flex shadow bg-light mt-4">
      <div className="me-3 bg-warning-subtle ">
        <div className="mt-3 mb-2 user-img">
          <img src={`http://localhost:8081/uploads/${admin.image}`} alt={admin.name} className=" border border-warning shadow m-2" id='photo' />
          <input type='file' id='file' onChange={handleImageChange}/>
          <label for='file' id='uploadbtn'><i className='fas fa-camera'></i></label>
        </div>
      </div>
      <div className="p-2 ">
        <div className="mb-2">
          <h3>{admin.name}</h3>
          <p className='text-secondary' style={{marginTop:'-10px'}}>{admin.email}</p>
          <h5 style={{marginTop:'-10px'}}>Company:</h5>
          <p className='text-secondary' style={{marginTop:'-8px'}}>SaberShop</p>
          <h5>Current Date and Time:</h5>
          <p className='text-secondary' style={{marginTop:'-8px'}}>{currentDateTime.toLocaleString()}</p>
        </div>
      </div>
    </div>

    <div className="border mt-5 p-3 shadow bg-light">
  <div className="">
  <div className="d-flex justify-content-between align-items-center">
      <h4>Personal Details</h4>
      <Link to={`/profil/edit/${id}`} className='btn bg-warning-subtle'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
        </svg>
      </Link>
    </div>
  </div>
  <div style={{marginLeft : '130px'}}>
    <div className="">
    <p className='ms-3'><span className='text-secondary me-2'>Name</span> {admin.name}</p>
    </div>
  </div>
  <div style={{marginLeft : '130px'}}>
    <div className="">
    <p ><span className='text-secondary me-2'>Email ID</span> {admin.email}</p>
    </div>
  </div>
</div>
      {isEdItModalOpen && (
                <>
                <EditModalProfil isOpen={isEdItModalOpen} onClose={closeEditModal} admin={admin} handleChange={handleChange} handleSubmit={handleSubmit} />
                </>
            )}
    </div>
  );
}
export default Profile;

