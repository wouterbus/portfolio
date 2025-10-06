import './GraphicDesignBox.css';
import { mockProjects } from '../../data/mockData';

interface GraphicDesignBoxProps {
  item: {
    id: string;
    title: string;
    style?: string;
  };
  onGraphicDesignClick: () => void;
  onProjectClick?: (projectId: string) => void;
}

export default function GraphicDesignBox({ item, onGraphicDesignClick, onProjectClick }: GraphicDesignBoxProps) {
  return (
    <div
      key={item.id}
      className={`grid-box graphic-design-box ${item.style ? `style-${item.style}` : ''}`}
    >
      <div className="graphic-design-grid-small">
        <div 
          className="graphic-design-item-small graphic-design-title-small"
          onClick={onGraphicDesignClick}
        >
          <h3>Graphic Design</h3>
        </div>
        <div 
          className="graphic-design-item-small"
          onClick={(e) => {
            e.stopPropagation();
            onProjectClick?.('1');
          }}
        >
          <img src={mockProjects[0].image} alt={mockProjects[0].title} />
          <div className="graphic-design-overlay">
            <div className="graphic-design-info">
              <h3>{mockProjects[0].title}</h3>
            </div>
          </div>
        </div>
        <div 
          className="graphic-design-item-small"
          onClick={(e) => {
            e.stopPropagation();
            onProjectClick?.('2');
          }}
        >
          <img src={mockProjects[1].image} alt={mockProjects[1].title} />
          <div className="graphic-design-overlay">
            <div className="graphic-design-info">
              <h3>{mockProjects[1].title}</h3>
            </div>
          </div>
        </div>
        <div 
          className="graphic-design-item-small"
          onClick={(e) => {
            e.stopPropagation();
            onProjectClick?.('3');
          }}
        >
          <img src={mockProjects[2].image} alt={mockProjects[2].title} />
          <div className="graphic-design-overlay">
            <div className="graphic-design-info">
              <h3>{mockProjects[2].title}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


