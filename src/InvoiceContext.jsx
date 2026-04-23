import React, { createContext, useContext, useState } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([
    { 
      id: 'RT3080', 
      paymentDue: '19 Aug 2021', 
      clientName: 'Jensen Huang', 
      total: 1800.90, 
      status: 'Paid',
      description: 'Re-branding',
      clientEmail: 'jensenh@nvidia.com',
      senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
      clientAddress: { street: '106 Kendal Street', city: 'Sharrington', postCode: 'NR24 2PB', country: 'United Kingdom' },
      items: [{ name: 'Brand Guidelines', quantity: 1, price: 1800.90, total: 1800.90 }]
    },
    { id: 'XM9141', paymentDue: '20 Sep 2021', clientName: 'Alex Grim', total: 556.00, status: 'Pending' },
    { id: 'RG0314', paymentDue: '01 Oct 2021', clientName: 'John Morrison', total: 14002.33, status: 'Paid' }
  ]);

  const addInvoice = (newInvoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
  };

  const updateInvoice = (id, updatedInvoice) => {
    setInvoices((prev) => 
      prev.map(inv => inv.id === id ? updatedInvoice : inv)
    );
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter(inv => inv.id !== id));
  };

  // NEW: Mark as Paid function
  const markAsPaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: 'Paid' } : inv
      )
    );
  };

  const getInvoice = (id) => invoices.find(inv => inv.id === id);

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, updateInvoice, deleteInvoice, getInvoice, markAsPaid }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
};