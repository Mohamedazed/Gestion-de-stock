import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Create() {
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();
    
    const handleCreate = (e) => {
        e.preventDefault();
        const created_date = new Date().toISOString();
        axios.post('http://localhost:8081/categories/create', {
        name: categoryName,
        created_date: created_date,
        })
        .then(res => {
            console.log(res)
            navigate('/categories')
        })
        .catch(err => {console.log(err)});
    };

    return (
        <div className="container ">
            
          <div>
            <h3 style={{ marginTop: '70px' }}>Create Category</h3>
            <p>
              <span>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Dashboard
                </Link>
              </span>{' '}
              / <span style={{ color: 'gray' }}>Create Category</span>
            </p>
          </div>
    
          <div className='mt-3 '>
            <div className="w-50 rounded p-3 border bg-light w-50 shadow-sm">
              <h4 className='text-center'>Create a New Category:</h4>
              <form>

                <div className="mb-3">
                  <label htmlFor="categoryName" className="form-label">
                    Category Name:
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <Link to="/categories" className="btn border border-success text-success rounded-pill">
                    Cancel
                  </Link>
                  <button
                    type="button"
                    className="btn btn-success rounded-pill"
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      );
    };
    
