import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEmp() {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        salary: "",
        address: "",
        type_id: "",
        image: "",
      });
      const [type, setType] = useState([]);
      const navigate = useNavigate()
    
      useEffect(() => {
        axios.get("http://localhost:8081/employees/types")
          .then((res) => {
             setType(res.data.result);
            })
          .catch((err) => console.log('Error fetching types:', err));
      }, []);
    
      const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('address', employee.address);
        formData.append('salary', employee.salary);
        formData.append('image', employee.image);
        formData.append('type_id', employee.type_id);
    
        axios.post('http://localhost:8081/employes/create', formData)
        .then(result => {
            if(result.data.Status) {
                navigate('/employees')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
      }
    
      return (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <div className="p-3 rounded w-50 border">
            <h3 className="text-center">Add Employee</h3>
            <form className="row g-1" onSubmit={handleSubmit}>
              <div className="col-12">
                <label className="form-label">
                  Name 
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputName"
                  placeholder="Enter Name"
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control rounded-0"
                  id="inputEmail4"
                  placeholder="Enter Email"
                  autoComplete="off"
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-0"
                  id="inputPassword4"
                  placeholder="Enter Password"
                  onChange={(e) =>
                    setEmployee({ ...employee, password: e.target.value })
                  }
                />
                <label className="form-label">
                  Salary
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputSalary"
                  placeholder="Enter Salary"
                  autoComplete="off"
                  onChange={(e) =>
                    setEmployee({ ...employee, salary: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  autoComplete="off"
                  onChange={(e) =>
                    setEmployee({ ...employee, address: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                        <label className="form-label">Type</label>
                        <select name="type" id="type" className="form-select"
                            onChange={(e) => {
                                setEmployee({ ...employee, type_id: e.target.value });
                            }}>
                            <option value="">Select Type</option>
                            {type.map((c) => {
                              return <option key={c.id} value={c.id}>{c.name}</option>;
                            })}
                        </select>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label" >
                  Select Image
                </label>
                <input
                  type="file"
                  className="form-control rounded-0"
                  id="inputGroupFile01"
                  name="image"
                  onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };
