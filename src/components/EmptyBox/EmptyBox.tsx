import './EmptyBox.css';

interface EmptyBoxProps {
  item: {
    id: string;
    title: string;
    description?: string;
  };
  onSectionChange: (section: string) => void;
}

export default function EmptyBox({ item, onSectionChange }: EmptyBoxProps) {
  return (
    <div
      key={item.id}
      className="grid-box empty-box"
      onClick={() => onSectionChange('Empty')}
    >
      <div className="empty-content">
        <h3 className="empty-title">{item.title}</h3>
        {item.description && (
          <p className="empty-description">{item.description}</p>
        )}
      </div>
    </div>
  );
}
