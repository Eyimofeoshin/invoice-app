import React from 'react';
import { useInvoices } from './InvoiceContext';
import emptyIllustration from './Email-campaign.png';
import './style.css';

const InvoiceList = ({ filterStatus, onSelectInvoice }) => {
  const { invoices } = useInvoices();

  const filteredInvoices = !filterStatus || filterStatus === 'all'
    ? invoices 
    : invoices.filter(inv => inv.status.toLowerCase() === filterStatus.toLowerCase());

  if (filteredInvoices.length === 0) {
    return (
      <div className="empty-state-container">
        <img src={emptyIllustration} alt="No invoices" />
        <h2 className="heading-m">There is nothing here</h2>
        <p className="body-variant">
          Create an invoice by clicking the <br/>
          <strong>New Invoice</strong> button and get started
        </p>
      </div>
    );
  }

  return (
    <section className="invoice-list">
      {filteredInvoices.map(inv => (
        <div key={inv.id} className="invoice-card" onClick={() => onSelectInvoice(inv.id)}>
          <div className="card-left">
            <span className="invoice-id"><span className="hash">#</span>{inv.id}</span>
            <span className="payment-due">Due {inv.paymentDue}</span>
            <span className="client-name">{inv.clientName}</span>
          </div>
          <div className="card-right">
            <span className="invoice-total">£{inv.total}</span>
            <div className={`status-badge ${inv.status.toLowerCase()}`}>
              <div className="status-dot"></div>
              {inv.status}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default InvoiceList;