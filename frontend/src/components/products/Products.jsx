// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import ShowProdModal from './modalsProd/ShowProdModal';

// export default function Products() {
//   const [data, setData] = useState([]);
//   const [searchId, setSearchId] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchCategory, setSearchCategory] = useState('');
//   const [searchSupplier, setSearchSupplier] = useState('');
  
  // const [selectedproduct, setSelectedproduct] = useState(null);
  // const [isShowModalOpen, setShowModalOpen] = useState(false);
  // const [isEditModalOpen, setEditModalOpen] = useState(false);
  // const [product,setproduct] = useState(null)

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   useEffect(() => {
//     fetchData();
//   }, [currentPage, searchId, searchTerm, searchCategory, searchSupplier]);
 
//   const fetchData = async () => {
//     try {
//       const queryParams = {
//         id: searchId,
//         name: searchTerm,
//         category: searchCategory,
//         supplier: searchSupplier,
//         page: currentPage,
//         pageSize: pageSize,
//       };
//         const response = await axios.get('http://localhost:8081/products', { params: queryParams })
//         const products = response.data.result;
//         const updatedData = await Promise.all(products.map(async (prod) => {
//           const supplierName = await fetchSupplierName(prod.Code_Supplier);
//           return { ...prod, supplierName };
//         }));
//         setData(updatedData);
//         setTotalPages(Math.ceil(response.data.result.length / pageSize));
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };


 
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8081/products/delete/${id}`);
//       setData(prevData => prevData.filter(prod => prod.Code_Product !== id));
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   const fetchSupplierName = async (Code_Supplier) => {
//     try {
//       const response = await axios.get(`http://localhost:8081/suppliers/show/${Code_Supplier}`);
//       return response.data.result[0].Name; // Assuming the API returns a single supplier
//     } catch (error) {
//       console.error('Error fetching supplier name:', error);
//       return 'Supplier Not Found'; // Default value if supplier name is not found
//     }
//   };

//   const handleSearch = async () => {
//     setCurrentPage(1);
//     fetchData();
//     try {
//       const response = await axios.get(`http://localhost:8081/products/search`, {
//         params: {
//           id: searchId,
//           name: searchTerm,
//           category: searchCategory,
//           supplier: searchSupplier
//         }
//       });
//       const products = response.data.result;
//       const updatedData = await Promise.all(products.map(async (prod) => {
//         const supplierName = await fetchSupplierName(prod.Code_Supplier);
//         return { ...prod, supplierName };
//       }));
//       setData(updatedData);
//     } catch (error) {
//       console.error('Error searching products:', error);
//     }
//   };

  // const openShowModal = (product) => {
  //   setSelectedproduct(product);
  //   setShowModalOpen(true);
  // };

  // const closeShowModal = () => {
  //   setShowModalOpen(false);
  // };

  // const openEditModal = (product) => {
  //   setSelectedproduct(product);
  //   setEditModalOpen(true);
  // };

  // const closeEditModal = () => {
  //   setEditModalOpen(false);
  // };

//   return (
//     <div className="container">
//       <div style={{ marginTop: '70px' }}>
//         <h3>Products</h3>
//         <p>
//           <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
//           / <span style={{ color: 'gray' }}>Products</span>
//         </p>
//       </div>

      // {isShowModalOpen && (
      //     <ShowProdModal
      //       isOpen={isShowModalOpen}
      //       onClose={closeShowModal}
      //       product={selectedproduct}
      //     />
      //   )}

      // {isEditModalOpen && (
      //     <EditSuppModal
      //       isOpen={isEditModalOpen}
      //       onClose={closeEditModal}
      //       product={product}
      //       handleChange={handleChange} 
      //       handleSubmit={handleSubmit} 
      //     />
      //   )}

//       <div>
//       <table className='table border'>
//           <thead >
//             <tr >
//               <th className='bg-warning-subtle'>
//                 <div className='m-2'>
//                   <h2 >Liste des Products :</h2>
//                 </div>
//               </th>
//               <th className='bg-warning-subtle'>
//                   <div className='m-2'>
//                     <Link to="/products/create" className='btn btn-warning' >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/></svg> New Product
//                     </Link>
//                   </div>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className='bg-light'>
//               <td className='bg-light'>
//               <h5 className='bg-light m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Products</h5>
              
//                 ID: <input type="text"  value={searchId} onChange={(e) => setSearchId(e.target.value)} className='border rounded m-2'/>
//                 Name: <input type="text"  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='border rounded m-2'/>
//                 Categorie:  <input type="text"  value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className='border rounded m-2'/>
//                 Supplier:  <input type="text"  value={searchSupplier} onChange={(e) => setSearchSupplier(e.target.value)} className='border rounded m-2'/>
                
//               </td>
//               <td className='bg-light'><br/><br/>
//               <button className='btn btn-success' onClick={() => handleSearch()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
//                    Search
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <div className="border p-2 bg-light mb-5 pb-0">
//         <div style={{ display: 'inline-flex', alignItems: 'center' }}>
//           <p style={{ marginRight: '10px' }}>Show</p>
//           <input type='number' value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ width: '60px', padding: '3px', marginRight: '10px',appearance: 'textfield',}}  className='mb-3'/>
//           <p style={{ marginLeft: '5px' }}> lines</p>
//         </div>
//         <table className='table table-striped table-hover border'>
//           <thead className='bg-dark text-white'>
//             <tr>
//               <th className='bg-warning-subtle'>Id</th>
//               <th className='bg-warning-subtle'>Image</th>
//               <th className='bg-warning-subtle'>Name</th>
//               <th className='bg-warning-subtle'>Catégory</th>
//               <th className='bg-warning-subtle'>Price for sale</th>
//               <th className='bg-warning-subtle'>Quantity</th>
//               <th className='bg-warning-subtle'>Supplier</th>
//               <th className='bg-warning-subtle'>Date d'ajout</th>
//               <th className='bg-warning-subtle text-center'>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(data) && data.length > 0 ? (
//               data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((prod) => (
//                 <tr key={prod.Code_Product} >
//                   <td className='bg-warning-subtle'>{prod.Code_Product}</td>
//                   <td><img src={`http://localhost:8081/${prod.Product_Image.replace(/\\/g, '/')}`} alt="Product" width='150px' height='100px'/></td>
//                   <td>{prod.name}</td>
//                   <td>{prod.Categorie}</td>
//                   <td>{prod.prix_sale}DH</td>
//                   <td>{prod.Quantite}</td>
//                   <td>{prod.supplierName}</td>
//                   <td>{prod.Date_Ajout}</td>
//                   <td className='bg-warning-subtle text-center'>
//                   <button onClick={() => openShowModal(prod)} className='btn btn-outline-info rounded-circle m-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg></button>
                    
//                     <Link to={`/products/edit/${prod.Code_Product}`} className='btn btn-outline-primary rounded-circle m-1'>
//                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>
//                     </Link>
//                     <button onClick={() => handleDelete(prod.Code_Product)} className='btn btn-outline-danger rounded-circle m-1'>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8">No data available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
        
//         <div className='d-flex justify-content-center'>
//           <nav aria-label='Page navigation example'>
//             <ul className='pagination'>
//               <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                 <button
//                   className='page-link'
//                   onClick={handlePreviousPage}
//                   disabled={currentPage === 1}
//                 >
//                   Previous
//                 </button>
//               </li>
//               {totalPages <= 10 ? (
//                 // Display all page buttons if total pages are less than or equal to 10
//                 Array.from({ length: totalPages }, (_, index) => (
//                   <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
//                     <button
//                       className='page-link'
//                       onClick={() => setCurrentPage(index + 1)}
//                     >
//                       {index + 1}
//                     </button>
//                   </li>
//                 ))
//               ) : (
//                 // Display up to 10 page buttons dynamically
//                 Array.from({ length: 10 }, (_, index) => {
//                   const page = index + 1 + (currentPage > 5 ? currentPage - 5 : 0);
//                   return (
//                     page <= totalPages && (
//                       <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
//                         <button
//                           className='page-link'
//                           onClick={() => setCurrentPage(page)}
//                         >
//                           {page}
//                         </button>
//                       </li>
//                     )
//                   );
//                 })
//               )}
//               <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                 <button
//                   className='page-link'
//                   onClick={handleNextPage}
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShowProdModal from './modalsProd/ShowProdModal';

export default function Products() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [selectedproduct, setSelectedproduct] = useState(null);
  const [isShowModalOpen, setShowModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, pageSize]);

  const fetchData = async () => {
    try {
      const queryParams = {
        name: searchTerm,
      };
      const response = await axios.get('http://localhost:8081/products', { params: queryParams });
      const products = response.data.result;
      const updatedData = await Promise.all(products.map(async (prod) => {
        const supplierName = await fetchSupplierName(prod.Code_Supplier);
        return { ...prod, supplierName };
      }));
      setData(updatedData);
      setTotalPages(Math.ceil(updatedData.length / pageSize));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/products/delete/${id}`);
      setData((prevData) => prevData.filter((prod) => prod.Code_Product !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const fetchSupplierName = async (Code_Supplier) => {
    try {
      const response = await axios.get(`http://localhost:8081/suppliers/show/${Code_Supplier}`);
      return response.data.result[0].Name; // Assuming the API returns a single supplier
    } catch (error) {
      console.error('Error fetching supplier name:', error);
      return 'Supplier Not Found'; // Default value if supplier name is not found
    }
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    try {
      const response = await axios.get(`http://localhost:8081/products/search`, {
        params: {
          name: searchTerm,
        }
      });
      setData(response.data.result);
      setTotalPages(Math.ceil(response.data.result.length / pageSize));
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const openShowModal = (product) => {
    setSelectedproduct(product);
    setShowModalOpen(true);
  };

  const closeShowModal = () => {
    setShowModalOpen(false);
  };

  const openEditModal = (product) => {
    setSelectedproduct(product);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const visibleProducts = data.slice(startIndex, endIndex);

  return (
    <div className="container" >
      <div style={{ marginTop: '70px' }}>
        <h3>Products</h3>
        <p>
          <span>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Dashboard{' '}
            </Link>
          </span>
          / <span style={{ color: 'gray' }}>Products</span>
        </p>
      </div>

      {isShowModalOpen && (
        <ShowProdModal
          isOpen={isShowModalOpen}
          onClose={closeShowModal}
          product={selectedproduct}
        />
      )}

      {isEditModalOpen && (
        <EditSuppModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          product={product}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      <div className='d-flex justify-content-between border border-warning p-3 m-3 bg-light'>
        <h2>Liste des Products :</h2>
        <Link to="/products/create" className="btn btn-warning rounded-pill pt-2 shadow" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-circle-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
          </svg>{' '}
          New Product
        </Link>
      </div>


      <div className='border border-warning p-3 m-3 bg-light'>
        <div className='d-flex justify-content-between'>
        <h5 className='mt-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Products</h5>
        
        <div className='input-group w-50'>
          <input type="text" name="name" value={searchTerm} class="form-control" onChange={(e) => setSearchTerm(e.target.value)} className='form-control rounded-start-pill border-end-0' placeholder='Search product' />
          <span className='input-group-text bg-white border-start-0 '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg></span>
          <button onClick={() => handleSearch()} className='btn border btn-success shadow-sm' style={{zIndex: 0}}>Search</button>
        </div>
        </div>
      </div>

      <div className="row border border-warning p-3 m-3 bg-light" >
        {visibleProducts.map((prod) => (
          <div className="col-md-4 mb-3" key={prod.Code_Product}>
            <div className="card">
              <img
                src={`http://localhost:8081/${prod.Product_Image.replace(/\\/g, '/')}`}
                className="card-img-top"
                alt="Product" height='200px'
              />
              <div className="card-body">
                <h4 className="card-title text-center">{prod.name}</h4>
                <p className="card-text">Category: {prod.Categorie}</p>
                <p className="card-text">Price for sale: {prod.prix_sale}DH</p>
                <p className="card-text">Quantity: {prod.Quantite}</p>
                <p className="card-text">Supplier: {prod.supplierName}</p>
                <p className="card-text">Date d'ajout: {formatDate(prod.Date_Ajout)}</p>
                <div className="text-center">
                  <button onClick={() => openShowModal(prod)} className="btn btn-outline-info rounded-circle m-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16"><path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/><path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>
                  </button>
                  <Link to={`/products/edit/${prod.Code_Product}`} className="btn btn-outline-primary rounded-circle m-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                      />
                    </svg>
                  </Link>
                  <button onClick={() => handleDelete(prod.Code_Product)} className="btn btn-outline-danger rounded-circle m-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                      />
                      <path
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
