import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const EditSuppModal = ({ isOpen, onClose, supplier, handleChange, handleFileChange, handleSubmit }) => {
  const [imageModified, setImageModified] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFiles => {
      handleFileChange(acceptedFiles);
      setImageModified(true);
    }
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block', width: '100%' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-warning-subtle">
            <h4 className="modal-title">Edit Supplier</h4>
          </div>
          <div className="modal-body bg-light">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3 text-center">
                <div {...getRootProps({ className: 'dropzone' })} >
                  <input {...getInputProps()} />
                  <p className='ms-5'><label for='file' className='ms-5' id='uploadbtn' style={{marginTop: '-16px'}}><i className='fas fa-camera'></i></label></p>
                </div>
                {(typeof supplier.image === 'string' && !imageModified) && (
                  <img src={`http://localhost:8081/${supplier.image.replace(/\\/g, '/')}`} className='border border-secondary shadow rounded' alt="Supplier Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                )}
                {(typeof supplier.image !== 'string' || imageModified) && supplier.image && (
                  <img src={URL.createObjectURL(supplier.image)} alt="Supplier Image" className='border border-secondary shadow rounded' style={{ maxWidth: '100%', maxHeight: '200px' }} />
                )}
              </div>
              <div className='form-group mb-3'>
                <label><b> Name :</b></label>
                <input type='text' className='form-control rounded-pill' id='Name' name='Name' value={supplier.Name} onChange={handleChange} required />
              </div>
              <div className="form-group mb-3">
              <label><b>Phone:</b></label>
              <input type="text" name="Phone" value={supplier.Phone} onChange={handleChange} className="form-control rounded-pill" />
            </div>
            <div className="form-group mb-3">
              <label><b>Email:</b></label>
              <input type="email" name="Email" value={supplier.Email} onChange={handleChange} className="form-control rounded-pill" />
            </div>
            <div className="form-group mb-3">
              <label><b>Adresse:</b></label>
              <input type="text" name="Adresse" value={supplier.Adresse} onChange={handleChange} className="form-control rounded-pill" />
            </div>
            <div className="form-group mb-3">
              <label><b>Company:</b></label>
              <input type="text" name="Company" value={supplier.Company} onChange={handleChange} className="form-control rounded-pill" />
            </div>
            <div className='d-flex justify-content-between'>
            <button className='btn text-primary border-primary rounded-pill ms-2' onClick={onClose}>Cancel</button>
            <button type="submit" className='btn btn-primary rounded-pill'>Update</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSuppModal;
