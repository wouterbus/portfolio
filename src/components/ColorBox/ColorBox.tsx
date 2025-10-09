import './ColorBox.css';

interface ColorBoxProps {
  item: {
    id: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function ColorBox({ item, onSectionChange }: ColorBoxProps) {
  const colors = [
    { name: 'White', var: '--white', bg: 'var(--white)', hex: '#ffffff' },
    { name: 'Black', var: '--border-color', bg: 'var(--border-color)', hex: '#000000' },
    { name: 'Hover', var: '--hover-bg', bg: 'var(--hover-bg)', hex: '#e7e5e4' },
    { name: 'Purple', var: '--purple-accent', bg: 'var(--purple-accent)', hex: '#6e00ff' }
  ];

  return (
    <div
      key={item.id}
      className="grid-box color-box"
      onClick={() => onSectionChange('Color')}
    >
      <div className="header">
        <h3>{item.title}</h3>
      </div>
      <div className="color-grid">
        {colors.map((color) => (
          <div key={color.var} className="color-column">
            <div className="color-content">
              <div className="lock-icon">🔒</div>
              <div 
                className="color-swatch" 
                style={{ backgroundColor: color.bg }}
              />
              <span className="color-hex">{color.hex}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
