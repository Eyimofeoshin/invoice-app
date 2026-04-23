
import React, { useState } from 'react';
import Sidebar from './Sidebar';      
import Header from './Header';        
import InvoiceList from './InvoiceList';
import './style.css';



const InvoiceCard = ({ invoice }) => {
  return (
    <div className="invoice-row">
      <span className="id">#{invoice.id}</span>
      <span className="due">Due {invoice.paymentDue}</span>
      <span className="client">{invoice.clientName}</span>
      <span className="total">£{invoice.total}</span>
      <div className={`status ${invoice.status}`}>{invoice.status}</div>
      <span className="arrow">{">"}</span>
    </div>
  );
};