import './CharacterCard.css';

interface CharacterCardProps {
  item: {
    id: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function CharacterCard({ item, onSectionChange }: CharacterCardProps) {
  return (
    <div
      key={item.id}
      className="grid-box character-card"
      onClick={() => onSectionChange('Character')}
    >
      <div className="character-content">
        {/* Level Badge */}
        <div className="level-badge">LVL 27</div>
        
        {/* Top Half - Pixel Avatar */}
        <div className="character-avatar">
          <svg 
            className="pixel-avatar" 
            width="80" 
            height="80" 
            viewBox="0 0 80 80"
          >
            {/* Head */}
            <rect x="20" y="10" width="40" height="40" fill="var(--accent)" />
            {/* Eyes */}
            <rect x="28" y="22" width="6" height="6" fill="var(--bg-primary)" />
            <rect x="46" y="22" width="6" height="6" fill="var(--bg-primary)" />
            {/* Mouth */}
            <rect x="32" y="36" width="16" height="4" fill="var(--bg-primary)" />
            {/* Body */}
            <rect x="25" y="50" width="30" height="25" fill="var(--accent)" />
            {/* Arms */}
            <rect x="10" y="55" width="15" height="8" fill="var(--accent)" />
            <rect x="55" y="55" width="15" height="8" fill="var(--accent)" />
            {/* Legs */}
            <rect x="30" y="75" width="8" height="10" fill="var(--accent)" />
            <rect x="42" y="75" width="8" height="10" fill="var(--accent)" />
          </svg>
        </div>
        
        {/* Bottom Half - Stats */}
        <div className="character-stats">
          <div className="stat-item">
            <div className="stat-label">Creativity</div>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: '85%' }}></div>
            </div>
            <div className="stat-value">85%</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-label">Code</div>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: '92%' }}></div>
            </div>
            <div className="stat-value">92%</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-label">Coffee</div>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: '78%' }}></div>
            </div>
            <div className="stat-value">78%</div>
          </div>
        </div>
      </div>
    </div>
  );
}


