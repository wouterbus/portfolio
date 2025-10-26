import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState } from 'react';
import './HeaderThemeSwitcher.css';

export default function HeaderThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(theme);

  const themes = [
    { value: 'light', label: 'Light', icon: '/light.svg' },
    { value: 'dark', label: 'Dark', icon: '/dark.svg' },
  ] as const;

  const handleThemeChange = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Start the transition animation
    setTimeout(() => {
      const currentIndex = themes.findIndex(t => t.value === theme);
      const nextIndex = (currentIndex + 1) % themes.length;
      setTheme(themes[nextIndex].value);
      setCurrentTheme(themes[nextIndex].value);
      
      // End the transition animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 25);
  };

  const currentThemeData = themes.find(t => t.value === currentTheme);

  const oppositeLang = language === 'en' ? 'PT' : 'EN';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button
        aria-label="Toggle language"
        className="header-theme-switcher"
        onClick={toggleLanguage}
        style={{ width: 'auto', padding: '8px 12px' }}
      >
        {oppositeLang}
      </button>
      <div className="header-theme-switcher" onClick={handleThemeChange}>
        <div className="theme-icon-container">
          <img 
            src={currentThemeData?.icon} 
            alt={currentThemeData?.label}
            className={`theme-icon ${isTransitioning ? 'transitioning' : ''}`}
          />
        </div>
      </div>
    </div>
  );
}
