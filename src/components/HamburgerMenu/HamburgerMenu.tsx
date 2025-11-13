import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HamburgerMenu.css';

interface HamburgerMenuProps {
  className?: string;
}

export default function HamburgerMenu({}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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
        <div className="mobile-menu-overlay">
          <div className="mobile-menu" ref={menuRef}>
            <button
              className="mobile-menu-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
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
