// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'

// export default function EditEmp() {
  
//   const { id} = useParams()
//   const [employee, setEmployee] = useState({
//       Name: "",
//       Email: "",
//       Phone: '',
//       salary: "",
//       Adresse: "",
//       type_id: "",
//       image: null
//     });
//     const [types, settypes] = useState([])
//     const navigate = useNavigate()

//     useEffect(()=> {
//       axios.get("http://localhost:8081/employees/types")
//           .then((res) => {console.log(res.data);
//              settypes(res.data.result);
//             })
//           .catch((err) => console.log('Error fetching types:', err));
      

//           axios.get('http://localhost:8081/employes/' + id)
//           .then(result => {
//             //console.log(result.data);
//             const data = result.data.result;
//             if (data && data.length > 0) {
//               setEmployee({
//                 ...employee,
//                 Name: data[0].Name,
//                 Email: data[0].Email,
//                 Phone: data[0].Phone,
//                 Adresse: data[0].Adresse,
//                 salary: data[0].salary,
//                 type_id: data[0].type_id,
//                 image: data[0].image 
//               });
//             } else {
//               console.log("No employee data found");
//             }
//           }).catch(err => console.log(err));
        
//   }, [])

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('Name', employee.Name);
//     formData.append('Email', employee.Email);
//     formData.append('Phone', employee.Phone);
//     formData.append('Adresse', employee.Adresse);
//     formData.append('salary', employee.salary);
//     formData.append('type_id', employee.type_id);
//     formData.append('image', employee.image);

//     axios.put(`http://localhost:8081/employes/edit/${id}`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     })
//     .then(result => {
//         if(result.data.Status) {
//             navigate('/employees');
//         } else {
//             alert(result.data.Error);
//         }
//     })
//     .catch(err => console.log(err));
// }
  
// return (
//   <div className="d-flex justify-content-center align-items-center mt-3">
//     <div className="p-3 rounded w-50 border">
//       <h3 className="text-center">Edit Employee</h3>
//       <form className="row g-1" onSubmit={handleSubmit}>
//         <div className="col-12">
//           <label className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control rounded-0"
//             value={employee.Name}
//             onChange={(e) =>
//               setEmployee({ ...employee, Name: e.target.value })
//             }
//           />
//         </div>
//         <div className="col-12">
//           <label className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control rounded-0"
//             value={employee.Email}
//             onChange={(e) =>
//               setEmployee({ ...employee, Email: e.target.value })
//             }
//           />
//         </div>
//         <div className='col-12'>
//           <label className="form-label">
//             Phone
//           </label>
//           <input
//             type="text"
//             className="form-control rounded-0"
//             value={employee.Phone}
//             onChange={(e) =>
//               setEmployee({ ...employee, Phone: e.target.value })
//             }
//           />
//         </div>
//         <div className='col-12'>
//           <label className="form-label">
//             Salary
//           </label>
//           <input
//             type="text"
//             className="form-control rounded-0"
//             value={employee.salary}
//             onChange={(e) =>
//               setEmployee({ ...employee, salary: e.target.value })
//             }
//           />
//         </div>
//         <div className="col-12">
//           <label className="form-label">
//             Address
//           </label>
//           <input
//             type="text"
//             className="form-control rounded-0"
//             value={employee.Adresse}
//             onChange={(e) =>
//               setEmployee({ ...employee, Adresse: e.target.value })
//             }
//           />
//         </div>
//         <div className="col-12">
//           <label className="form-label">
//             types
//           </label>
//           <select name="types" id="types" className="form-select"
//               onChange={(e) => setEmployee({...employee, type_id: e.target.value})}>
//             {types.map((c) => {
//               return <option key={c.id} value={c.id}>{c.name}</option>;
//             })}
//           </select>
//         </div>
        // <div className="col-12 mb-3">
        //         <label className="form-label" >
        //           Select Image
        //         </label>
        //         <input
        //           type="file"
        //           className="form-control rounded-0"
        //           name="image"
        //           onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
        //         />
        //       </div>
        
//         <div className="col-12">
//           <button type="submit" className="btn btn-primary w-100">
//             Edit Employee
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )
// }



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

    useEffect(()=> {
      axios.get("http://localhost:8081/employees/types")
          .then((res) => {console.log(res.data);
             settypes(res.data.result);
            })
          .catch((err) => console.log('Error fetching types:', err));
      

          axios.get('http://localhost:8081/employes/' + id)
          .then(result => {
            //console.log(result.data);
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
  
return (
  <div className="container">
    <Employees/>
      <EditEmpModal isOpen={true} employee={employee} types={types} handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} />
     
  </div>
)
}

