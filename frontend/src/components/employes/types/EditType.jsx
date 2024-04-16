// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const EditType = () => {
//   const { id } = useParams();
//   const [values, setValues] = useState({name: '', created_date: ''});
//   const navigate = useNavigate()

//     useEffect(() => {
//       axios.get(`http://localhost:8081/employees/types/${id}`)
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

//     const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.put(`http://localhost:8081/employees/types/edit/${id}`, values)
//       .then((res) => {
//         console.log(res.data);
//         navigate('/employees/types'); 
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className="container">
//       <div>
//          <h3 style={{ marginTop: '70px' }}>Edit Types</h3>
//          <p>
//            <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
//            / <span><Link to="/employees/types" style={{ textDecoration: 'none', color: 'inherit' }}>Types </Link></span>
//            / <span style={{ color: 'gray' }}>Edit Types</span>
//          </p>
//        </div>

//       <div style={{ marginTop: '70px' }}>
        
//       </div>
//       <div>
//       {values !== null ? (
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               value={values.name}
//               onChange={handleChange}
//               required
//             />
//              <div className='mb-3'>
//                <label>Created Date</label>
//                <input type='text' className='form-control' id='created_date' name='created_date' value={values.created_date}  onChange={e=>setValues({...values, created_date: e.target.value})} readOnly />
//              </div>
//           </div>
//           <button type="submit" className="btn btn-primary" >Edit</button>
//           <Link to={`/employees/types`} className='btn btn-secondary ms-2'>Cancel</Link>
          
//         </form>
//         ) : (
//         <p>No data available for this type.</p>
//        )}
//       </div>
//     </div>
//   );
// };

// export default EditType;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Types from './types';
import EditTypeModal from './EditTypeModal';

const EditType = () => {
  const { id } = useParams();
  const [values, setValues] = useState({name: '', created_date: ''});
  const navigate = useNavigate()

    useEffect(() => {
      axios.get(`http://localhost:8081/employees/types/${id}`)
      .then(res => {
        if (res.data && res.data.result && Array.isArray(res.data.result) && res.data.result.length > 0) {
          setValues({ 
            name: res.data.result[0].name, 
            created_date: res.data.result[0].created_date });
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
    axios.put(`http://localhost:8081/employees/types/edit/${id}`, values)
      .then((res) => {
        console.log(res.data);
        navigate('/types'); 
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Types/>
      <EditTypeModal isOpen={true} values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
      
    </div>
  );
};

export default EditType;
