import './ColorBox.css';

interface ColorBoxProps {
  item: {
    id: string;
    number?: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function ColorBox({ item, onSectionChange }: ColorBoxProps) {
  return (
    <div
      key={item.id}
      className="grid-box"
      onClick={() => onSectionChange('Color')}
    >
      <div className="header">
        <h3 className="box-number">{item.number}</h3>
        <h3>{item.title}</h3>
      </div>
      <div className="content">
        <p>This is a color box with global header classes.</p>
        <p>You can add any content here.</p>
      </div>
    </div>
  );
}
