import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client, urlFor } from '../../lib/sanity';
import './Portfolio.css';

// Utility function to generate stable colors for tool tags based on tool name only
const getStableToolColors = (tools: string[]) => {
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1',
    '#14b8a6', '#f43f5e', '#8b5a2b', '#1e40af', '#059669'
  ];
  
  const darkColors = [
    '#1d4ed8', '#047857', '#d97706', '#dc2626', '#7c3aed',
    '#0891b2', '#ea580c', '#65a30d', '#db2777', '#4f46e5',
    '#0f766e', '#e11d48', '#92400e', '#1e3a8a', '#065f46'
  ];

  // Create a simple hash function for consistent color assignment
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  // Create color assignments ensuring no adjacent duplicates within this project
  const assignedColors: string[] = [];
  const assignedDarkColors: string[] = [];
  
  for (let i = 0; i < tools.length; i++) {
    // Use only tool name for consistent color assignment across all projects
    const colorSeed = hashString(tools[i].toLowerCase());
    let colorIndex = colorSeed % colors.length;
    let darkColorIndex = colorSeed % darkColors.length;
    
    // If this is not the first item and the color would be the same as previous
    if (i > 0 && colors[colorIndex] === assignedColors[i - 1]) {
      // Find next available color
      for (let j = 0; j < colors.length; j++) {
        const testIndex = (colorSeed + j) % colors.length;
        if (colors[testIndex] !== assignedColors[i - 1]) {
          colorIndex = testIndex;
          break;
        }
      }
    }
    
    // Same logic for dark colors
    if (i > 0 && darkColors[darkColorIndex] === assignedDarkColors[i - 1]) {
      for (let j = 0; j < darkColors.length; j++) {
        const testIndex = (colorSeed + j) % darkColors.length;
        if (darkColors[testIndex] !== assignedDarkColors[i - 1]) {
          darkColorIndex = testIndex;
          break;
        }
      }
    }
    
    assignedColors.push(colors[colorIndex]);
    assignedDarkColors.push(darkColors[darkColorIndex]);
  }
  
  return tools.map((_, index) => ({
    light: assignedColors[index],
    dark: assignedDarkColors[index]
  }));
};

interface SanityProject {
  _id: string;
  title: string;
  heroBanner: {
    asset: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
  category: string;
  tools: string[];
  shortDescription?: string;
  link?: {
    url: string;
    linkType: string;
    openInNewTab: boolean;
  };
}

export default function Portfolio() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'web-development', 'ui-ux-design', 'graphic-design'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
              const query = `*[_type == "project"] | order(order asc, _createdAt desc) {
                _id,
                title,
                heroBanner,
                slug,
                category,
                tools,
                shortDescription,
                link
              }`;
        const data = await client.fetch(query);
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleProjectClick = (slug: string) => {
    navigate(`/project/${slug}`);
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <button 
          className="back-button" 
          onClick={() => navigate('/')}
        >
          ←
        </button>
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All' : 
               category === 'web-development' ? 'Web Development' :
               category === 'ui-ux-design' ? 'UI/UX Design' :
               category === 'graphic-design' ? 'Graphic Design' :
               category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="portfolio-loading">
          <h2>Loading projects...</h2>
        </div>
      ) : (
        <div className="portfolio-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project._id}
                className="portfolio-item"
                onClick={() => handleProjectClick(project.slug.current)}
              >
                <div className="portfolio-piece-header">
                  <div className="portfolio-title-section">
                    <h3 className="portfolio-title">
                      {project.title}
                    </h3>
                  </div>
                  {project.link && (
                    <div className="portfolio-link-section">
                      <a
                        href={project.link.url}
                        target={project.link.openInNewTab ? '_blank' : '_self'}
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
                    </div>
                  )}
                </div>
                <div className="portfolio-image">
                  <img
                    src={urlFor(project.heroBanner).url()}
                    alt={project.title}
                  />
                <div className="portfolio-overlay">
                    <div className="portfolio-about">
                      <p>{project.shortDescription || 'Discover more about this project by exploring the details below.'}</p>
                      <div className="portfolio-tools-overlay">
                        {project.tools.map((tool, index) => {
                          const projectToolColors = getStableToolColors(project.tools);
                          const colors = projectToolColors[index];
                          // Detect current theme
                          const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
                          const isGoofyTheme = document.documentElement.getAttribute('data-theme') === 'goofy';

                          // Use different colors based on theme
                          let backgroundColor = colors?.light || '#3b82f6';
                          if (isDarkTheme && colors) {
                            backgroundColor = colors.dark;
                          } else if (isGoofyTheme) {
                            // Goofy theme uses alternating red/blue
                            backgroundColor = index % 2 === 0 ? '#dc2626' : '#2563eb';
                          }

                          return (
                            <span
                              key={index}
                              className="tool-tag tool-tag-random"
                              style={{
                                backgroundColor: backgroundColor
                              }}
                            >
                              {tool}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className="see-more-container">
                      <button className="see-more-button">
                        see more
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="portfolio-empty">
              <h2>No projects found</h2>
              <p>No projects match the selected category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
