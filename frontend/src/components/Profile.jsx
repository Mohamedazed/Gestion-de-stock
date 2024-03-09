import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './profile.css'

const Profile = () => {
  const [admin, setAdmin] = useState({
    image: '',
    name: '',
  });
    const {id} = useParams()
    const navigate = useNavigate()
    const [click,setClick] = useState(false)

    useEffect(() => {
      axios.get(`http://localhost:8081/login/${id}`)
      .then(res => {
        if (res.data && res.data.Result && Array.isArray(res.data.Result) && res.data.Result.length > 0) {
          setAdmin({
                ...admin,
                name: res.data.Result[0].name, 
                image: res.data.Result[0].image
            });console.log(admin)
        } else {
            console.error('Invalid data structure in response:', res.data);
        }
    }).catch(err => console.log(err))
}, [id])

    const handleChange = e => {
      const { name, value } = e.target;
      setAdmin(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setAdmin(prevState => ({
          ...prevState,
          image: file
      }));
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      axios
        .put('http://localhost:3000/auth/admin/edit/' + id, admin)
        .then(result => {
          console.log(result.data);
          navigate('/dashboard/profile/' + id);
        })
        .catch(err => console.log(err));
    };

    const handleEditClick = () => {
      setClick(prevState => !prevState);
    };

  return (
    <div className="profile-container">
      <div className="profile-background"></div>
      <div className="profile-content">
      <img src={`http://localhost:3000/auth/admin/${admin.image}`} className='profile-image'/>
        <h1 className="profile-name">{admin.name}</h1>
        <p className="profile-description">Software Engineer</p>
        <button className='btn btn-info' onClick={handleEditClick}>Edit</button>

        {click ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={admin.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              placeholder="Enter Image URL"
            />
            <button type="submit" className="btn btn-info">
              Save
            </button>
          </form>
        ):null
      }
      </div>
    </div>
  )
}

export default Profile