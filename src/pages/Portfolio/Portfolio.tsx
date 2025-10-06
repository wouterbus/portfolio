import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProjects } from '../../data/mockData';
import './Portfolio.css';

export default function Portfolio() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'web', 'mobile', 'design'];

  const filteredProjects = selectedCategory === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.category === selectedCategory);

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <button 
          className="back-button" 
          onClick={() => navigate('/')}
        >
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
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="portfolio-grid">
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            className="portfolio-item"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="portfolio-image">
              <img src={project.image} alt={project.title} />
              <div className="portfolio-overlay">
                <div className="portfolio-info">
                  <h3>
                    {project.title}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="external-link"
                        title="Visit website"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15,3 21,3 21,9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    )}
                  </h3>
                  <div className="portfolio-tools">
                    {project.tools.map((tool, index) => (
                      <span key={index} className="tool-tag">
                        {tool}
                      </span>
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
