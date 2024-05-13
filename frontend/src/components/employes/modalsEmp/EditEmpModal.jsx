import React from 'react'

export default function EditEmpModal({ isOpen, onClose, employee,types, handleChange, handleSubmit,handleFileChange }) {
        if (!isOpen) {
            return null;
          }
    
      return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' , width:'100%'}}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-warning-subtle">
                <h5 className="modal-title">Edit employee</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className='form-group mb-3'>
                    <label><b> Name :</b></label>
                    <input type='text' className='form-control rounded-pill' id='Name' name='Name' value={employee.Name} onChange={handleChange} required />
                  </div>
                  <div className="form-group mb-3">
                  <label><b>Phone:</b></label>
                  <input type="text" name="Phone" value={employee.Phone} onChange={handleChange} className="form-control rounded-pill" />
                </div>
                <div className="form-group mb-3">
                  <label><b>Email:</b></label>
                  <input type="email" name="Email" value={employee.Email} onChange={handleChange} className="form-control rounded-pill" />
                </div>
                <div className="form-group mb-3">
                  <label><b>salary:</b></label>
                  <input type="text" name="salary" value={employee.salary} onChange={handleChange} className="form-control rounded-pill" />
                </div>
                <div className="form-group mb-3">
                  <label><b>Address:</b></label>
                  <input type="text" name="Adresse" value={employee.Adresse} onChange={handleChange} className="form-control rounded-pill" />
                </div>
                <div className="col-12">
                   <label className="form-label"><b> types</b></label>
                   <select name="types" id="types" className="form-select rounded-pill"
                       onChange={handleChange}>
                     {types.map((c) => {
                       return <option key={c.id} value={c.id}>{c.name}</option>;
                     })}
                   </select>
                 </div>
                 <div className="col-12 mb-3">
                <label className="form-label" ><b>Select Image</b></label>
                <input
                  type="file"
                  className="form-control rounded-pill"
                  name="image"
                  onChange={handleFileChange}
                />
              </div>
                 <div className='d-flex justify-content-end'>
                  <button className='btn text-primary ms-2' onClick={onClose}>Cancel</button>
                  <button type="submit" className='btn btn-primary'>Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  )
}
