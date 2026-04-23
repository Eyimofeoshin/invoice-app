import React, { useState } from 'react';
import InvoiceList from './InvoiceList';
import './style.css';

const Home = ({ onSelectInvoice }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]); // Array allows selecting multiple statuses

  const handleFilterToggle = (status) => {
    if (activeFilters.includes(status)) {
      setActiveFilters(activeFilters.filter((f) => f !== status));
    } else {
      setActiveFilters([...activeFilters, status]);
    }
  };

  // Pass 'all' if empty, otherwise pass the list of filters
  const filterStatus = activeFilters.length === 0 ? 'all' : activeFilters;

  return (
    <main className="main-content">
      <div className="content-container">
        <header className="header-main">
          <div className="header-left">
            <h1 className="heading-l">Invoices</h1>
            <p className="body-variant">
              {activeFilters.length > 0 
                ? `Filtering by ${activeFilters.join(', ')}` 
                : 'There are 7 total invoices'}
            </p>
          </div>

          <div className="header-right">
            <div className="filter-wrapper">
              <div className="filter-group" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <span>Filter by status</span>
                <svg className={isFilterOpen ? 'arrow-up' : ''} width="11" height="7">
                  <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {isFilterOpen && (
                <div className="filter-dropdown">
                  {['draft', 'pending', 'paid'].map((status) => (
                    <label className="filter-option" key={status}>
                      <input 
                        type="checkbox" 
                        checked={activeFilters.includes(status)}
                        onChange={() => handleFilterToggle(status)}
                      />
                      <span className="checkbox-custom"></span>
                      {status}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button className="new-invoice-btn">
              <div className="plus-icon-bg">
                <svg width="11" height="11"><path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z" fill="#7C5DFA"/></svg>
              </div>
              <span>New Invoice</span>
            </button>
          </div>
        </header>

        <InvoiceList filterStatus={filterStatus} onSelectInvoice={onSelectInvoice} />
      </div>
    </main>
  );
};

export default Home;