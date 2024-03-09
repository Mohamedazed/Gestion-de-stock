// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const Edit = () => {
//   const { id } = useParams();
//   const [values, setValues] = useState({name: '', created_date: ''})
//   const navigate = useNavigate()

//   useEffect(() => {
//     axios.get(`http://localhost:8081/show/${id}`)
//       .then(res => {
//         if (res.data && res.data.result && Array.isArray(res.data.result) && res.data.result.length > 0) {
//           setValues({ 
//             name: res.data.result[0].name, 
//             created_date: res.data.result[0].created_date });
//         } else {
//           console.error('Invalid data structure in response:', res.data);
//         }
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   }, [id]);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.put(`http://localhost:8081/edit/${id}`, values)
//     .then(res=>{
//       console.log(res.data);
//       navigate('/categories')
//     })
      
//     .catch(err => {
//       console.log(err);
//     });
//   };

 
//   return (
//     <div className='container'>
//       <div>
//         <h3 style={{ marginTop: '70px' }}>Edit Category</h3>
//         <p>
//           <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
//           / <span><Link to="/categories" style={{ textDecoration: 'none', color: 'inherit' }}>Categories </Link></span>
//           / <span style={{ color: 'gray' }}>Edit Category</span>
//         </p>
//       </div>

//       <div>
//         {values !== null ? (
//           <form onSubmit={handleSubmit}>
//             <div className='form-group mb-3'>
//               <label>Category Name</label>
//               <input type='text' className='form-control' id='name' name='name' value={values.name} onChange={handleChange} required />
//             </div>
            // <div className='mb-3'>
            //   <label>Created Date</label>
            //   <input type='text' className='form-control' id='created_date' name='created_date' value={values.created_date}  onChange={e=>setValues({...values, created_date: e.target.value})} readOnly />
            // </div>
//             <button type="submit" className='btn btn-primary'>Update</button>
//             <Link to={`/categories`} className='btn btn-secondary ms-2'>Cancel</Link>
//           </form>
//         ) : (
//           <p>No data available for this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Edit;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import EditModal from './modalsCat/EditModal'; 
import Categories from './Categories';

const Edit = () => {
  const { id } = useParams();
  const [values, setValues] = useState({ name: '', created_date: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/show/${id}`)
      .then(res => {
        if (res.data && res.data.result && Array.isArray(res.data.result) && res.data.result.length > 0) {
          setValues({
            name: res.data.result[0].name,
            created_date: res.data.result[0].created_date
          });
        } else {
          console.error('Invalid data structure in response:', res.data);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/edit/${id}`, values)
      .then(res => {
        console.log(res.data);
        navigate('/categories');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
     
      <Categories/>
      <EditModal isOpen={true} values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Edit;
