import { Button, Modal, Typography } from 'keep-react';

const ConfirmSuccess = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}  className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block' ,width: '100%' ,paddingBottom: '300px',paddingTop: '6%'}}>
      <Modal.Body className="space-y-3 modal-dialog modal-dialog-centered " role="document" >
        
        <Modal.Content className="modal-body" >
          <Typography variant="div" className='text-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-check-circle-fill mb-2 text-success" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
            <Typography variant="h3" className="text-body-1 font-medium text-metal-900">
            Creation Confirm
            </Typography>
            <Typography variant="p" className="text-body-4 font-normal text-metal-600 text-secondary">
              Product is created successfully!
            </Typography>
          </Typography>
        </Modal.Content>
          <Button onClick={onClose} size="sm" color="success" className='btn btn-success rounded-pill shadow'>
            Confirm
          </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmSuccess;
