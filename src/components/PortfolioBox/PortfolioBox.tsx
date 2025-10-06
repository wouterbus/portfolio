import './PortfolioBox.css';
import { mockProjects } from '../../data/mockData';

interface PortfolioBoxProps {
  item: {
    id: string;
    title: string;
    style?: string;
  };
  onPortfolioClick: () => void;
  onProjectClick?: (projectId: string) => void;
}

export default function PortfolioBox({ item, onPortfolioClick, onProjectClick }: PortfolioBoxProps) {
  return (
    <div
      key={item.id}
      className={`grid-box portfolio-box ${item.style ? `style-${item.style}` : ''}`}
    >
      <div className="portfolio-grid-small">
        <div 
          className="portfolio-item-small portfolio-title-small"
          onClick={onPortfolioClick}
        >
          <h3>Portfolio</h3>
        </div>
        <div 
          className="portfolio-item-small"
          onClick={(e) => {
            e.stopPropagation();
            onProjectClick?.('1');
          }}
        >
          <img src={mockProjects[0].image} alt={mockProjects[0].title} />
          <div className="portfolio-overlay">
            <div className="portfolio-info">
              <h3>{mockProjects[0].title}</h3>
            </div>
          </div>
        </div>
        <div 
          className="portfolio-item-small"
          onClick={(e) => {
            e.stopPropagation();
            onProjectClick?.('2');
          }}
        >
          <img src={mockProjects[1].image} alt={mockProjects[1].title} />
          <div className="portfolio-overlay">
            <div className="portfolio-info">
              <h3>{mockProjects[1].title}</h3>
            </div>
          </div>
        </div>
        <div 
          className="portfolio-item-small"
          onClick={(e) => {
            e.stopPropagation();
            onProjectClick?.('3');
          }}
        >
          <img src={mockProjects[2].image} alt={mockProjects[2].title} />
          <div className="portfolio-overlay">
            <div className="portfolio-info">
              <h3>{mockProjects[2].title}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
