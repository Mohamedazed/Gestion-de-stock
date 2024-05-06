import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddModC() {
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
                navigate('/employe/empHome')
            })
            .catch(err => {console.log(err)});
        };
    
        return (
            <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block', width: '100%' }}>
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-warning-subtle">
                            <h5 className="modal-title">Add product</h5>
                        </div>
                        <div className="modal-body bg-light">
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
            </div>
          );
        };
        
    
