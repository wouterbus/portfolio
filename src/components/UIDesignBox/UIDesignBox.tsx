import './UIDesignBox.css';
import { mockProjects } from '../../data/mockData';

interface UIDesignBoxProps {
  item: {
    id: string;
    title: string;
    style?: string;
  };
  onUIDesignClick: () => void;
  onProjectClick?: (projectId: string) => void;
}

export default function UIDesignBox({ item, onUIDesignClick, onProjectClick }: UIDesignBoxProps) {
  return (
    <div
      key={item.id}
      className={`grid-box ui-design-box ${item.style ? `style-${item.style}` : ''}`}
    >
      <div className="ui-design-grid-small">
        <div 
          className="ui-design-item-small ui-design-title-small"
          onClick={onUIDesignClick}
        >
          <h3>UI Design</h3>
        </div>
        <div 
          className="ui-design-item-small"
          onClick={(e) => {
            e.stopPropagation();
            onProjectClick?.('1');
          }}
        >
          <img src={mockProjects[0].image} alt={mockProjects[0].title} />
          <div className="ui-design-overlay">
            <div className="ui-design-info">
              <h3>{mockProjects[0].title}</h3>
            </div>
          </div>
        </div>
        <div 
          className="ui-design-item-small"
          onClick={(e) => {
            e.stopPropagation();
            onProjectClick?.('2');
          }}
        >
          <img src={mockProjects[1].image} alt={mockProjects[1].title} />
          <div className="ui-design-overlay">
            <div className="ui-design-info">
              <h3>{mockProjects[1].title}</h3>
            </div>
          </div>
        </div>
        <div 
          className="ui-design-item-small"
          onClick={(e) => {
            e.stopPropagation();
            onProjectClick?.('3');
          }}
        >
          <img src={mockProjects[2].image} alt={mockProjects[2].title} />
          <div className="ui-design-overlay">
            <div className="ui-design-info">
              <h3>{mockProjects[2].title}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


