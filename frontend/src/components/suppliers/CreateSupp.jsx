// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function CreateSupp() {
//   const [formData, setFormData] = useState({
//     Name: '',
//     Phone: '',
//     Email: '',
//     Adresse: '',
//     Company: ''
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:8081/suppliers/create', formData)
//       .then(res => {
//         console.log(res.data);
//         navigate('/suppliers');
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <div className="container">
//       <div style={{ marginTop: '70px' }}>
//         <h3>Create Supplier</h3>
//         <p>
//           <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></span>
//           / <span><Link to="/suppliers" style={{ textDecoration: 'none', color: 'inherit' }}>Suppliers</Link></span>
//           / <span style={{ color: 'gray' }}>Create Supplier</span>
//         </p>
//       </div>

//       <div className="mt-4">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="Name" className="form-label">Name</label>
//             <input type="text" className="form-control" id="Name" name="Name" value={formData.Name} onChange={handleChange} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="Phone" className="form-label">Phone</label>
//             <input type="text" className="form-control" id="Phone" name="Phone" value={formData.Phone} onChange={handleChange} />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="Email" className="form-label">Email</label>
//             <input type="email" className="form-control" id="Email" name="Email" value={formData.Email} onChange={handleChange} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="Adresse" className="form-label">Address</label>
//             <input type="text" className="form-control" id="Adresse" name="Adresse" value={formData.Adresse} onChange={handleChange} />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="Company" className="form-label">Company</label>
//             <input type="text" className="form-control" id="Company" name="Company" value={formData.Company} onChange={handleChange} />
//           </div>
//           <button type="submit" className="btn btn-primary">Submit</button>
//           <Link to="/suppliers" className="btn btn-secondary">
//                     Cancel
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateSupp() {
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Email: '',
    Adresse: '',
    Company: '',
    image: null
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
        ...prevState,
        image: file
    }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const formDataToSend = new FormData();
  formDataToSend.append('Name', formData.Name);
  formDataToSend.append('Phone', formData.Phone);
  formDataToSend.append('Email', formData.Email);
  formDataToSend.append('Adresse', formData.Adresse);
  formDataToSend.append('Company', formData.Company);
  formDataToSend.append('image', formData.image);

  try {
    const res = await axios.post('http://localhost:8081/suppliers/create', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(res.data);
    navigate('/suppliers');
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="container">
      <div style={{ marginTop: '70px' }}>
        <h3>Create Supplier</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></span>
          / <span><Link to="/suppliers" style={{ textDecoration: 'none', color: 'inherit' }}>Suppliers</Link></span>
          / <span style={{ color: 'gray' }}>Create Supplier</span>
        </p>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">Name</label>
            <input type="text" className="form-control" id="Name" name="Name" value={formData.Name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="Phone" className="form-label">Phone</label>
            <input type="text" className="form-control" id="Phone" name="Phone" value={formData.Phone} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email</label>
            <input type="email" className="form-control" id="Email" name="Email" value={formData.Email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="Adresse" className="form-label">Address</label>
            <input type="text" className="form-control" id="Adresse" name="Adresse" value={formData.Adresse} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="Company" className="form-label">Company</label>
            <input type="text" className="form-control" id="Company" name="Company" value={formData.Company} onChange={handleChange} />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image" 
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/suppliers" className="btn btn-secondary">
                    Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
