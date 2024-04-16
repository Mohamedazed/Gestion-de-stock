import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateType() {
  const [type, settype] = useState('');
    const navigate = useNavigate();
    
    const handleCreate = (e) => {
        e.preventDefault();
        const created_date = new Date().toISOString();
        axios.post('http://localhost:8081/types/create', {
        name: type,
        created_date: created_date,
        })
        .then(res => {
            console.log(res)
            navigate('/types')
        })
        .catch(err => {console.log(err)});
    };

    return (
        <div className="container">
            
          <div>
            <h3 style={{ marginTop: '70px' }}>Create Type</h3>
            <p>
              <span>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Dashboard
                </Link>
              </span>{' '}
              / <span style={{ color: 'gray' }}>Create Type</span>
            </p>
          </div>
    
          <div>
            <div className="w-50 rounded p-3">
              <h2>Create a New type:</h2>
              <form>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    value={type}
                    onChange={(e) => settype(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <Link to="/employees/types" className="btn btn-secondary">
                    Cancel
                  </Link>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleCreate}
                  >
                    Create Category
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      );
    };