import React from 'react';



const DeleteModal = ({ invoiceId, onDelete, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-delete-btn" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;