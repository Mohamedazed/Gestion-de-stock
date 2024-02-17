import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditProd() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        supplier: '',
    });
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        // Fetch product details
        axios.get(`http://localhost:8081/products/show/${id}`)
            .then(res => {
                const productData = res.data.result[0];
                setProduct(productData);
            })
            .catch(err => {
                console.error('Error fetching product details:', err);
            });

        // Fetch existing categories
        axios.get('http://localhost:8081/categories')
            .then(res => {
                setCategories(res.data.result);
            })
            .catch(err => {
                console.error('Error fetching categories:', err);
            });

        // Fetch existing suppliers
        axios.get('http://localhost:8081/suppliers')
            .then(res => {
                setSuppliers(res.data.result);
            })
            .catch(err => {
                console.error('Error fetching suppliers:', err);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/products/edit/${id}`, product)
            .then(res => {
                console.log('Product updated successfully');
                navigate('/products')
            })
            .catch(err => {
                console.error('Error updating product:', err);
            });
    };

    return (
        <div className="container mt-4">
            <h3>Edit Product</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select className="form-control" name="category" value={product.category} onChange={handleChange}>
                        <option value="">Select category...</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="text" className="form-control" name="price" value={product.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input type="text" className="form-control" name="quantity" value={product.quantity} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Supplier:</label>
                    <select className="form-control" name="supplier" value={product.supplier} onChange={handleChange}>
                        <option value="">Select supplier...</option>
                        {suppliers.map(supp => (
                            <option key={supp.Code_Supplier} value={supp.Name}>{supp.Name}</option>
                        ))}
                    </select>
                </div>
                
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}


// EditProd.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function EditProd() {
//   const { id } = useParams();
//   const [product, setProduct] = useState({
//     name: '',
//     categorie: '',
//     price: '',
//     quantity: '',
//     supplier: '',
//     product_Image: ''
//   });

//   useEffect(() => {
//     axios.get(`http://localhost:8081/products/show/${id}`)
//       .then(res => {
//         setProduct(res.data.result[0] || {}); // Assuming the API returns a single product
//       })
//       .catch(err => {
//         console.error('Error fetching product details:', err);
//       });
//   }, [id]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setProduct(prevProduct => ({
//       ...prevProduct,
//       [name]: value
//     }));
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     axios.put(`http://localhost:8081/products/edit/${id}`, product)
//       .then(res => {
//         console.log('Product updated successfully:', res.data);
//         // Redirect to product details page or any other route
//       })
//       .catch(err => {
//         console.error('Error updating product:', err);
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Edit Product</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Name:</label>
//           <input type="text" name="name" value={product.name} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Category:</label>
//           <input type="text" name="categorie" value={product.categorie} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Price:</label>
//           <input type="text" name="price" value={product.price} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Quantity:</label>
//           <input type="text" name="quantity" value={product.quantity} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Supplier:</label>
//           <input type="text" name="supplier" value={product.supplier} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Product Image:</label>
//           <input type="text" name="product_Image" value={product.product_Image} onChange={handleChange} className="form-control" />
//         </div>
//         <button type="submit" className="btn btn-primary">Update Product</button>
//       </form>
//     </div>
//   );
// }

