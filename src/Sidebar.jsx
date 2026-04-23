import React from 'react';
import { useTheme } from './ThemeContext'; //
import oval from './oval.png';
const Sidebar = () => {
  const { theme, toggleTheme } = useTheme(); //

  return (
    <aside className="sidebar">
      {/* Top Logo Section */}
      <div className="logo-container">
        <div className="logo-main">
          <div className="logo-bottom-shade"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26"><path fill="#FFF" fillRule="evenodd" d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"/></svg>
        </div>
      </div>
      
      { }
      <div className="sidebar-footer">
        <button 
          className="theme-toggle" 
          aria-label="Toggle dark mode"
          onClick={toggleTheme} //
        >
          {theme === 'light' ? (
            
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.502 11.342a.703.703 0 00-.588-.128 7.499 7.499 0 01-2.274.339 7.513 7.513 0 01-7.514-7.514c0-.781.116-1.547.347-2.277a.702.702 0 00-.716-.904 9.385 9.385 0 00-8.757 9.386 9.362 9.362 0 009.362 9.362 9.424 9.424 0 009.117-6.716.702.702 0 00-.027-.548z" fill="#7E88C3" fillRule="nonzero"/></svg>
          ) : (
           
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 15.625c-3.107 0-5.625-2.518-5.625-5.625S6.893 4.375 10 4.375 15.625 6.893 15.625 10s-2.518 5.625-5.625 5.625zM10 0a.625.625 0 01.625.625v2.5a.625.625 0 01-1.25 0V.625A.625.625 0 0110 0zm6.72 2.655a.625.625 0 01.883 0l1.768 1.768a.625.625 0 11-.884.884l-1.767-1.768a.625.625 0 010-.884zM20 10a.625.625 0 01-.625.625h-2.5a.625.625 0 010-1.25h2.5A.625.625 0 0120 10zm-2.655 6.72a.625.625 0 010 .883l-1.768 1.768a.625.625 0 11-.884-.884l1.768-1.767a.625.625 0 01.884 0zM10 20a.625.625 0 01-.625-.625v-2.5a.625.625 0 011.25 0v2.5A.625.625 0 0110 20zm-6.72-2.655a.625.625 0 010-.883l1.767-1.768a.625.625 0 11.884.884L4.165 17.35a.625.625 0 01-.884 0zM0 10a.625.625 0 01.625-.625h2.5a.625.625 0 010 1.25H.625A.625.625 0 010 10zm2.655-6.72a.625.625 0 01.883 0L5.306 5.05a.625.625 0 11-.884.884L2.655 4.165a.625.625 0 010-.884z" fill="#858BB2" fillRule="nonzero"/></svg>
          )}
        </button>
        <div className="divider"></div>
        <div className="user-avatar">
          <img src={oval} alt="User Profile" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;