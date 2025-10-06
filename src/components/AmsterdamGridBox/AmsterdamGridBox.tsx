import './AmsterdamGridBox.css';

interface AmsterdamGridBoxProps {
  item: {
    id: string;
    number?: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function AmsterdamGridBox({ item, onSectionChange }: AmsterdamGridBoxProps) {

  const amsterdamLetters = [
    ['A', 'M', 'S'],
    ['T', 'E', 'R'],
    ['D', 'A', 'M']
  ];

  return (
    <div
      key={item.id}
      className="grid-box amsterdam-grid-box"
      onClick={() => onSectionChange('Amsterdam')}
    >
      <div className="amsterdam-grid">
        {amsterdamLetters.map((row, rowIndex) => (
          <div key={rowIndex} className="amsterdam-row">
            {row.map((letter, colIndex) => {
              const isEven = (rowIndex + colIndex) % 2 === 0;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`amsterdam-letter ${isEven ? 'even' : 'odd'}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
