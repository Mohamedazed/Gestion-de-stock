import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditEmpModal from './modalsEmp/EditEmpModal'
import Employees from './Employees'

export default function EditEmp() {
  const { id} = useParams()
  const [employee, setEmployee] = useState({
      Name: "",
      Email: "",
      Phone: '',
      salary: "",
      Adresse: "",
      type_id: "",
      image: null
    });
    const [types, settypes] = useState([])
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(()=> {
      axios.get("http://localhost:8081/employees/types")
          .then((res) => {console.log(res.data);
             settypes(res.data.result);
            })
          .catch((err) => console.log('Error fetching types:', err));
      

          axios.get('http://localhost:8081/employes/' + id)
          .then(result => {
            const data = result.data.result;
            if (data && data.length > 0) {
              setEmployee({
                ...employee,
                Name: data[0].Name,
                Email: data[0].Email,
                Phone: data[0].Phone,
                Adresse: data[0].Adresse,
                salary: data[0].salary,
                type_id: data[0].type_id,
                image: data[0].image 
              });
            } else {
              console.log("No employee data found");
            }
          }).catch(err => console.log(err));
        
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Name', employee.Name);
    formData.append('Email', employee.Email);
    formData.append('Phone', employee.Phone);
    formData.append('Adresse', employee.Adresse);
    formData.append('salary', employee.salary);
    formData.append('type_id', employee.type_id);
    formData.append('image', employee.image);
    console.log(employee.type_id)
    axios.put(`http://localhost:8081/employes/edit/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(result => {
        if(result.data.Status) {
            navigate('/employees');
        } else {
            alert(result.data.Error);
        }
    })
    .catch(err => console.log(err));
}
const handleFileChange = (e) => {
  const file = e.target.files[0];
  setEmployee(prevState => ({
      ...prevState,
      image: file
  }));
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setEmployee(prevState => ({
    ...prevState,
    [name]: value
  }));
};
const handleCloseModal = () => {
  setIsModalOpen(false);
};
  
return (
  <div className="container">
    <Employees/>
      <EditEmpModal isOpen={true} onClose={handleCloseModal} employee={employee} types={types} handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} />
     
  </div>
)
}

