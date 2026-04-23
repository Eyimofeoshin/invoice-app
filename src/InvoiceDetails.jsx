import React, { useState } from 'react';
import { useInvoices } from './InvoiceContext';
import DeleteModal from './DeleteModal';

const InvoiceDetails = ({ invoiceId, onBack, onEdit }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { invoices, deleteInvoice } = useInvoices();
  
  const invoice = invoices.find((inv) => inv.id === invoiceId);

  const confirmDelete = () => {
    deleteInvoice(invoice.id);
    onBack(); 
  };

  if (!invoice) return <div className="invoice-view">Invoice not found</div>;

  return (
    <div className="invoice-view">
      <button className="go-back" onClick={onBack}>
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" fillRule="evenodd"/>
        </svg>
        Go back
      </button>

      <div className="details-header">
        <div className="status-container">
          <span className="body-variant">Status</span>
          <div className={`status-badge ${invoice.status?.toLowerCase()}`}>
            <div className="status-dot"></div>
            {invoice.status}
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="edit-btn" onClick={() => onEdit(invoice)}>Edit</button>
          <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>Delete</button>
          <button className="mark-paid-btn">Mark as Paid</button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal 
          invoiceId={invoice.id}
          onDelete={confirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}

      <div className="details-card">
        <div className="top-row">
          <div>
            <h3><span className="hash">#</span>{invoice.id}</h3>
            <p className="body-variant">{invoice.description}</p>
          </div>
          <div className="address body-variant">
            {invoice.senderAddress?.street || invoice.senderStreet}<br/>
            {invoice.senderAddress?.city || invoice.senderCity}<br/>
            {invoice.senderAddress?.postCode || invoice.senderPostCode}<br/>
            {invoice.senderAddress?.country || invoice.senderCountry}
          </div>
        </div>

        <div className="middle-row">
          <div className="dates">
            <div><p className="body-variant">Invoice Date</p><h4>{invoice.createdAt}</h4></div>
            <div><p className="body-variant">Payment Due</p><h4>{invoice.paymentDue}</h4></div>
          </div>
          <div className="bill-to">
            <p className="body-variant">Bill To</p>
            <h4>{invoice.clientName}</h4>
            <p className="body-variant address">
              {invoice.clientAddress?.street || invoice.clientStreet}<br/>
              {invoice.clientAddress?.city || invoice.clientCity}<br/>
              {invoice.clientAddress?.postCode || invoice.clientPostCode}<br/>
              {invoice.clientAddress?.country || invoice.clientCountry}
            </p>
          </div>
          <div className="sent-to">
            <p className="body-variant">Sent to</p>
            <h4>{invoice.clientEmail}</h4>
          </div>
        </div>
        
        <div className="items-table-container">
          <div className="items-table">
            <div className="table-header body-variant">
              <span>Item Name</span>
              <span>QTY.</span>
              <span>Price</span>
              <span>Total</span>
            </div>
            {invoice.items?.map((item, index) => (
              <div className="table-row" key={index}>
                <span className="item-name">{item.name}</span>
                <span className="qty">{item.quantity}</span>
                <span className="price">£ {Number(item.price || 0).toFixed(2)}</span>
                <span className="total">£ {Number(item.total || 0).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="table-footer">
            <span>Amount Due</span>
            <span className="grand-total">£ {Number(invoice.total || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;