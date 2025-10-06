import { useParams, useNavigate } from 'react-router-dom';
import { mockProjects } from '../../data/mockData';
import MagentoTheme from '../../components/MagentoTheme/MagentoTheme';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="project-not-found">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <button 
            className="back-button" 
            onClick={() => navigate('/portfolio')}
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  // Show custom Magento Theme component for project ID '2'
  if (projectId === '2') {
    return <MagentoTheme />;
  }

  return (
    <div className="project-detail-page">
      <div className="project-header">
        <button 
          className="back-button" 
          onClick={() => navigate('/portfolio')}
        >
          ← Back to Portfolio
        </button>
        <h1>
          {project.title}
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link"
              title="Visit website"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15,3 21,3 21,9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          )}
        </h1>
      </div>
      
      <div className="project-content">
        <div className="project-image">
          <img src={project.image} alt={project.title} />
        </div>
        
        <div className="project-info">
          <div className="project-meta">
            <div className="project-category">
              <span className="label">Category:</span>
              <span className="value">{project.category}</span>
            </div>
            <div className="project-tools">
              <span className="label">Tools:</span>
              <div className="tools-list">
                {project.tools.map((tool, index) => (
                  <span key={index} className="tool-tag">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="project-description">
            <h3>About this project</h3>
            {project.body ? (
              <div 
                className="project-body-content"
                dangerouslySetInnerHTML={{ __html: project.body }}
              />
            ) : (
              <p>This is a detailed description of the {project.title} project. It showcases the work done, the challenges faced, and the solutions implemented using {project.tools.join(', ')}.</p>
            )}
          </div>
          
          <div className="project-links">
            <a href="#" target="_blank" rel="noopener noreferrer" className="project-link">
              View Live Site
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="project-link">
              View Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
