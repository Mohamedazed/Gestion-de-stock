// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Modal from './modalsCat/ModalShow';

// const Categories = () => {
//   const [data, setData] = useState([]);
//   const [searchParams, setSearchParams] = useState({
//     id: '',
//     name: ''
//   });
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     axios.get('http://localhost:8081/categories')
//       .then(res => setData(res.data.result || []))
//       .catch(err => console.log(err));
//   }, []);

//   const handlDelete = (id) => {
//     axios.delete(`http://localhost:8081/delete/${id}`)
//       .then(res => {
//         location.reload(); // Consider using a better approach to update the data after deletion
//       })
//       .catch(err => console.log(err));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSearchParams(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSearch = () => {
//     axios.get(`http://localhost:8081/categories/search?id=${searchParams.id}&name=${searchParams.name}`)
//       .then(res => setData(res.data.result || []))
//       .catch(err => console.log(err));
//   };

//   const openModal = (category) => {
//     setSelectedCategory(category);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <div className='container'>
//       <div>
//         <h3 style={{ marginTop: '70px' }}>Categories</h3>
//         <p>
//           <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
//           / <span style={{ color: 'gray' }}>Categories</span>
//         </p>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <Modal isOpen={isModalOpen} onClose={closeModal} details={selectedCategory} />
//       )}

//       <div>
//         <table className='table border'>
//           <thead>
//             <tr>
//               <th className='bg-warning-subtle'>
//                 <div className='m-2'>
//                   <h2>Liste des categories :</h2>
//                 </div>
//               </th>
//               <th className='bg-warning-subtle'>
//                 <div className='m-2'>
//                   <Link to="/categories/create" className='btn btn-outline-success'>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" /></svg> New categories
//                   </Link>
//                 </div>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Search section */}
//             <tr className='bg-light'>
//               <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" /></svg> Find Categories</h5>
//               <td style={{ display: 'flex' }} className='bg-light m-2'>
//                 <div>ID: <br /><input type="text" name="id" value={searchParams.id} onChange={handleChange} className='border rounded m-2' /></div>
//                 <div>Name: <br /><input type="text" name="name" value={searchParams.name} onChange={handleChange} className='border rounded m-2' /></div>
//               </td>
//               <td className='bg-light'><br /><br /><br />
//                 <button className='btn btn-outline-warning' onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" /></svg>
//                   Search
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <table className='table table-striped table-hover border'>
//           <thead className='bg-dark'>
//             <tr>
//               <th className='bg-warning-subtle'>Id</th>
//               <th className='bg-warning-subtle'>Name</th>
//               <th className='bg-warning-subtle'>Created date</th>
//               <th className='bg-warning-subtle'>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(data) && data.length > 0 ? (
//               data.map((cat, index) => (
//                 <tr key={index} >
//                   <td className='bg-warning-subtle'>{cat.id}</td>
//                   <td>{cat.name}</td>
//                   <td>{cat.created_date}</td>
//                   <td>
//                     <button onClick={() => openModal(cat)} className='btn btn-outline-info rounded-circle m-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg></button>
//                     <Link to={`/edit/${cat.id}`} className='btn btn-outline-primary rounded-circle m-1'>
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg>
//                     </Link>
//                     <button onClick={() => handlDelete(cat.id)} className='btn btn-outline-danger rounded-circle m-1'>
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" /><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" /></svg>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4">No data available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Categories;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from './modalsCat/ModalShow'; 
import EditModal from './modalsCat/EditModal';

const Categories = () => {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    id: '',
    name: ''
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [values, setValues] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEdItModalOpen, setEdItModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8081/categories')
      .then(res => setData(res.data.result || []))
      .catch(err => console.log(err));
  }, []);

  const handlDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/delete/${id}`);
      setData(prevData => prevData.filter(prod => prod.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = () => {
    axios.get(`http://localhost:8081/categories/search?id=${searchParams.id}&name=${searchParams.name}`)
      .then(res => setData(res.data.result || []))
      .catch(err => console.log(err));
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const openEditModal = (category)=>{
    setValues(category)
    setEdItModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false);
  };

  const closeEditModal = () => {
    setEdItModalOpen(false);
  };

  return (
    <div className='container'>
      <div>
        <h3 style={{ marginTop: '70px' }}>Categories</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
          / <span style={{ color: 'gray' }}>Categories</span>
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
        <Modal isOpen={isModalOpen} onClose={closeModal} details={selectedCategory} />
        </>
      )}
      {isEdItModalOpen && (
        <>
        <EditModal isOpen={isEdItModalOpen} onClose={closeEditModal} values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
        </>
      )}

      <div>
        <table className='table border'>
          <thead>
            <tr>
              <th className='bg-warning-subtle'>
                <div className='m-2'>
                  <h2>Liste des categories :</h2>
                </div>
              </th>
              <th className='bg-warning-subtle'>
                <div className='m-2'>
                  <Link to="/categories/create" className='btn btn-outline-success'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" /></svg> New categories
                  </Link>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Search section */}
            <tr className='bg-light'>
              <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" /></svg> Find Categories</h5>
              <td style={{ display: 'flex' }} className='bg-light m-2'>
                <div>ID: <br /><input type="text" name="id" value={searchParams.id} onChange={handleChange} className='border rounded m-2' /></div>
                <div>Name: <br /><input type="text" name="name" value={searchParams.name} onChange={handleChange} className='border rounded m-2' /></div>
              </td>
              <td className='bg-light'><br /><br /><br />
                <button className='btn btn-outline-warning' onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" /></svg>
                  Search
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <table className='table table-striped table-hover border'>
          <thead className='bg-dark'>
            <tr>
              <th className='bg-warning-subtle'>Id</th>
              <th className='bg-warning-subtle'>Name</th>
              <th className='bg-warning-subtle'>Created date</th>
              <th className='bg-warning-subtle'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((cat, index) => (
                <tr key={index} >
                  <td className='bg-warning-subtle'>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{cat.created_date}</td>
                  <td>
                    <button onClick={() => openModal(cat)} className='btn btn-outline-info rounded-circle m-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg></button>
                    <Link to={`/edit/${cat.id}`} className='btn btn-outline-primary rounded-circle m-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg>
                    </Link>
                    <button onClick={() => handlDelete(cat.id)} className='btn btn-outline-danger rounded-circle m-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" /><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" /></svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;


