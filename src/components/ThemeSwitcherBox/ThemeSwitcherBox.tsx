import { useTheme } from '../../contexts/ThemeContext';
import './ThemeSwitcherBox.css';

interface ThemeSwitcherBoxProps {
  item: {
    id: string;
    number?: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function ThemeSwitcherBox({ item, onSectionChange }: ThemeSwitcherBoxProps) {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Light', type: 'light' },
    { value: 'dark', label: 'Dark', type: 'dark' },
    { value: 'goofy', label: 'Goofy', type: 'goofy' },
  ] as const;

  return (
    <div
      key={item.id}
      className="grid-box theme-switcher-box"
      onClick={() => onSectionChange('Case Study')}
    >
      <div className="theme-switcher-grid">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            className={`theme-btn ${theme === themeOption.value ? 'active' : ''} ${themeOption.type}`}
            onClick={(e) => {
              e.stopPropagation();
              setTheme(themeOption.value);
            }}
            style={{
              '--theme-accent': themeOption.type === 'light' ? '#000000' : 
                               themeOption.type === 'goofy' ? '#FF9D2A' : '#ffffff'
            } as React.CSSProperties}
          >
            {themeOption.label}
          </button>
        ))}
      </div>
    </div>
  );
}
