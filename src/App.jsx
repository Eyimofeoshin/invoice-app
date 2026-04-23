import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';      
import Header from './Header';        
import InvoiceList from './InvoiceList';
import InvoiceDetails from './InvoiceDetails';
import InvoiceForm from './InvoiceForm'; 
import { useInvoices, InvoiceProvider } from './InvoiceContext';
import { ThemeProvider } from './ThemeContext';
import './style.css';

// Logic must be inside a component wrapped by the Provider
const AppContent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const { invoices } = useInvoices();

  useEffect(() => {
    const handlePopState = () => setSelectedInvoiceId(null);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectInvoice = (id) => {
    setSelectedInvoiceId(id);
    window.history.pushState({ view: 'details' }, '');
  };

  const handleGoBack = () => {
    setSelectedInvoiceId(null);
    window.history.back();
  };

  const handleOpenNewForm = () => {
    setEditingInvoice(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (invoice) => {
    setEditingInvoice(invoice);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingInvoice(null); 
  };

  return (
    <div className="app-layout">
      <Sidebar /> 
      
      <main className="main-content">
        <div className="content-container">
          {selectedInvoiceId ? (
            <InvoiceDetails 
              invoiceId={selectedInvoiceId} 
              onBack={handleGoBack} 
              onEdit={handleOpenEditForm}
            />
          ) : (
            <>
              <Header 
                onOpenForm={handleOpenNewForm} 
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                count={invoices.length}
              />
              <InvoiceList 
                filterStatus={filterStatus} 
                onSelectInvoice={handleSelectInvoice} 
              />
            </>
          )}
        </div>
      </main>

      {isFormOpen && (
        <div className="form-overlay" onClick={handleCloseForm}>
          <div className="form-drawer" onClick={(e) => e.stopPropagation()}>
            <InvoiceForm 
              invoiceData={editingInvoice} 
              onClose={handleCloseForm} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <AppContent />
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;