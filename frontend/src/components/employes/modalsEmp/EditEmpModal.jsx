import React from 'react'

export default function EditEmpModal({ isOpen, onClose, employee,types, handleChange, handleSubmit,handleFileChange }) {
        if (!isOpen) {
            return null;
          }
    
      return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' , width:'100%'}}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit employee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className='form-group mb-3'>
                    <label> Name :</label>
                    <input type='text' className='form-control' id='Name' name='Name' value={employee.Name} onChange={handleChange} required />
                  </div>
                  <div className="form-group mb-3">
                  <label>Phone:</label>
                  <input type="text" name="Phone" value={employee.Phone} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group mb-3">
                  <label>Email:</label>
                  <input type="email" name="Email" value={employee.Email} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group mb-3">
                  <label>salary:</label>
                  <input type="text" name="salary" value={employee.salary} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group mb-3">
                  <label>Address:</label>
                  <input type="text" name="Adresse" value={employee.Adresse} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-12">
                   <label className="form-label">
                     types
                   </label>
                   <select name="types" id="types" className="form-select"
                       onChange={handleChange}>
                     {types.map((c) => {
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
                  name="image"
                  onChange={handleFileChange}
                />
              </div>

                  <button type="submit" className='btn btn-primary'>Update</button>
                  <button  className='btn btn-secondary ms-2' onClick={onClose}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
  )
}
