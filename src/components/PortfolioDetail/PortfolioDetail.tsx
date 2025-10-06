import { useState } from 'react';
import { mockProjects } from '../../data/mockData';
import './PortfolioDetail.css';

interface PortfolioDetailProps {
  onBack: () => void;
}

export default function PortfolioDetail({ onBack }: PortfolioDetailProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSlidingOut, setIsSlidingOut] = useState(false);

  const categories = ['All', 'Web Development', 'UI/UX Design', 'Graphic Design'];
  const filteredProjects = selectedCategory === 'All' 
    ? mockProjects 
    : mockProjects.filter(project => project.category === selectedCategory);

  const handleBackClick = () => {
    setIsSlidingOut(true);
    setTimeout(() => {
      onBack();
    }, 500); // Match animation duration
  };

  return (
    <div className={`portfolio-detail ${isSlidingOut ? 'slide-out-right' : ''}`}>
      <div className="portfolio-detail-header">
        <button className="back-button" onClick={handleBackClick}>
          ← Back
        </button>
        <h1>Portfolio</h1>
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="portfolio-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} id={`project-${project.id}`} className="portfolio-item">
            <div className="portfolio-image">
              <img src={project.image} alt={project.title} />
              <div className="portfolio-overlay">
                <div className="portfolio-info">
                  <h3>{project.title}</h3>
                  <div className="portfolio-tools">
                    {project.tools.map((tool, index) => (
                      <span key={index} className="tool-tag">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
