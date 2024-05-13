import React from 'react'

export default function EditModalProfil({ isOpen, onClose, values, setValues ,handleChange, handleSubmit }) {
    if (!isOpen) {
        return null;
      }
  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block', width: '100%' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-warning-subtle d-flex justify-content-between">
                    <h5 className="modal-title">Edit values</h5>
                    <button type="button" className="close bg-danger text-light ps-2 pe-2 rounded pt-1" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className='form-group mb-3'>
                        <label> <b>Name :</b></label>
                        <input type='text' className='form-control rounded-pill' id='name' name='name' value={values.name} onChange={handleChange} required />
                      </div>
                      <div className="form-group mb-3">
                        <label><b>Select Image :</b></label>
                        <input type="file" name="image" onChange={(e) => setValues({...values, image: e.target.files[0]})} className="form-control rounded-pill" />
                      </div>
                    
                      <div className='d-flex justify-content-end'>
                        <button className='btn text-primary rounded-pill ms-2' onClick={onClose}>Cancel</button>
                        <button type="submit" className='btn btn-primary rounded-pill'>Update</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
  )
}

