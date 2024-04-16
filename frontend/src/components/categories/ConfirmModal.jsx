// ConfirmModal.js

import { useState } from 'react';
import { Button, Modal, Typography } from 'keep-react';
import { CloudArrowUp } from 'phosphor-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}  className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' ,width: '100%' ,paddingBottom: '300px',paddingTop: '6%'}}>
      <Modal.Body className="space-y-3 modal-dialog modal-dialog-centered " role="document" >
        
        <Modal.Content className="modal-body" >
          <Typography variant="div" className='text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-exclamation-triangle-fill mb-2 text-danger" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg> 
            <Typography variant="h3" className="text-body-1 font-medium text-metal-900">
            Confirm Deletion
            </Typography>
            <Typography variant="p" className="text-body-4 font-normal text-metal-600">
              Are you sure you want to delete this category?
            </Typography>
          </Typography>
        </Modal.Content>
        <Modal.Footer className="modal-footer">
          <Button onClick={onClose} size="sm" variant="outline" color="secondary" className='btn rounded-pill'>
            Cancel
          </Button>
          <Button onClick={onConfirm} size="sm" color="primary" className='btn btn-danger rounded-pill'>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
