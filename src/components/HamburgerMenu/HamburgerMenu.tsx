import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HamburgerMenu.css';

interface HamburgerMenuProps {
  className?: string;
}

export default function HamburgerMenu({}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`hamburger-button ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay" onClick={handleToggle}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-content">
              <button
                className={`mobile-menu-item ${location.pathname === '/' ? 'active' : ''}`}
                onClick={() => handleNavigate('/')}
              >
                Home
              </button>
              <button
                className={`mobile-menu-item ${location.pathname === '/portfolio' ? 'active' : ''}`}
                onClick={() => handleNavigate('/portfolio')}
              >
                Portfolio
              </button>
              <button
                className={`mobile-menu-item ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={() => handleNavigate('/contact')}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
