import React, { useState } from 'react';
import './style.css';

const Header = ({ onOpenForm, filterStatus, setFilterStatus, count }) => {
  const [showMenu, setShowMenu] = useState(false);

  const statuses = ['Draft', 'Pending', 'Paid'];

  const handleFilterChange = (status) => {
   
    setFilterStatus(filterStatus === status ? 'all' : status);
  };

  return (
    <header className="header-main">
      <div className="header-left">
        <h1 className="heading-l">Invoices</h1>
        <p className="body-variant">
          {count === 0 ? 'No invoices' : `There are ${count} total invoices`}
        </p>
      </div>

      <div className="header-right">
        {/* The Clickable Filter Group */}
        <div className="filter-wrapper">
          <div className="filter-group" onClick={() => setShowMenu(!showMenu)}>
            <span>Filter by status</span>
            <svg className={showMenu ? 'arrow-up' : ''} width="11" height="7" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
            </svg>
          </div>

          {/* THE ACTUAL DROPDOWN MENU */}
          {showMenu && (
            <div className="filter-dropdown">
              {statuses.map((status) => (
                <label key={status} className="filter-option">
                  <input 
                    type="checkbox" 
                    checked={filterStatus === status}
                    onChange={() => handleFilterChange(status)}
                  />
                  <span className="checkbox-custom"></span>
                  {status}
                </label>
              ))}
            </div>
          )}
        </div>
        
        <button className="new-invoice-btn" onClick={onOpenForm}>
          <div className="plus-icon-bg">
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.313 10.035v-3.722h3.722v-2.0h-3.722v-3.722h-2.0v3.722h-3.722v2.0h3.722v3.722z" fill="#7C5DFA" fillRule="nonzero"/></svg>
          </div>
          <span>New Invoice</span>
        </button>
      </div>
    </header>
  );
};

export default Header;