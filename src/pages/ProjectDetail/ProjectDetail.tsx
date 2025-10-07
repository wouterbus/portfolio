import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/sanity';
import './ProjectDetail.css';

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
  const assignedColors = [];
  const assignedDarkColors = [];
  
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
  mobileHeroBanner?: {
    asset: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
  category: string;
  about: string;
  body: any[];
  tools: string[];
  desktopImages?: Array<{
    _key: string;
    asset: {
      _ref: string;
    };
  }>;
  mobileImages?: Array<{
    _key: string;
    asset: {
      _ref: string;
    };
  }>;
  link: {
    url: string;
    linkType: string;
    openInNewTab: boolean;
  };
}

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [sanityProject, setSanityProject] = useState<SanityProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [toolColors, setToolColors] = useState<Array<{light: string, dark: string}>>([]);
  
  useEffect(() => {
    const fetchSanityProject = async () => {
      try {
        console.log('Fetching project with slug:', projectId);
        const query = `*[_type == "project" && slug.current == $slug][0] {
          _id,
          title,
          heroBanner,
          mobileHeroBanner,
          slug,
          category,
          about,
          body,
          tools,
          desktopImages,
          mobileImages,
          link
        }`;
        const data = await client.fetch(query, { slug: projectId });
        console.log('Fetched project data:', data);
        setSanityProject(data);
        
        // Generate stable colors for tools
        if (data && data.tools) {
          setToolColors(getStableToolColors(data.tools));
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchSanityProject();
    } else {
      setLoading(false);
    }
  }, [projectId]);

  const project = sanityProject;

  if (loading) {
    return (
      <div className="project-detail-page">
        <div className="project-loading">
          <h1>Loading Project...</h1>
          <p>Fetching project with slug: {projectId}</p>
        </div>
      </div>
    );
  }

  if (!project && !loading) {
    return (
      <div className="project-detail-page">
        <div className="project-not-found">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist or hasn't been published yet.</p>
          <p>Slug: {projectId}</p>
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
          {project.link?.url && (
            <a 
              href={project.link.url} 
              target={project.link.openInNewTab ? '_blank' : '_self'} 
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
          <img 
            src={urlFor(project.heroBanner).url()}
            alt={project.title} 
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
        </div>
        
        {/* Mobile Hero Banner */}
        {project.mobileHeroBanner && (
          <div className="project-mobile-image">
            <img 
              src={urlFor(project.mobileHeroBanner).url()}
              alt={`${project.title} - Mobile View`} 
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center'
              }}
            />
          </div>
        )}
        
        <div className="project-info">
          <div className="project-meta">
            <div className="project-category">
              <span className="label">Category:</span>
              <span className="value">{project.category}</span>
            </div>
            <div className="project-tools">
              <span className="label">Tools:</span>
              <div className="tools-list">
                {project.tools.map((tool, index) => {
                  const colors = toolColors[index];
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
          </div>
          
          <div className="project-description">
            <h3>About this project</h3>
            <div className="project-body-content">
              <p>{project.about}</p>
              {project.body && (
                <div 
                  className="project-body-rich"
                  dangerouslySetInnerHTML={{ __html: project.body }}
                />
              )}
            </div>
          </div>
          
          {/* Desktop Project Images - Hidden on Mobile */}
          {project.desktopImages && project.desktopImages.length > 0 && (
            <div className="project-showcase desktop-showcase">
              <h3>Desktop View</h3>
              <div className="showcase-images">
                {project.desktopImages.map((image, index) => (
                  <div key={image._key} className="showcase-image">
                    <img 
                      src={urlFor(image).width(1200).fit('max').url()}
                      alt={`Desktop view ${index + 1}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        objectPosition: 'center'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Mobile Project Images - Hidden on Desktop */}
          {project.mobileImages && project.mobileImages.length > 0 && (
            <div className="project-showcase mobile-showcase-only">
              <h3>Mobile View</h3>
              <div className="showcase-images mobile-showcase">
                {project.mobileImages.map((image, index) => (
                  <div key={image._key} className="showcase-image">
                    <img 
                      src={urlFor(image).width(600).fit('max').url()}
                      alt={`Mobile view ${index + 1}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        objectPosition: 'center'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="project-links">
            {project.link?.url && (
              <a 
                href={project.link.url} 
                target={project.link.openInNewTab ? '_blank' : '_self'} 
                rel="noopener noreferrer" 
                className="project-link"
              >
                {project.link.linkType === 'github' ? 'View Code' : 
                 project.link.linkType === 'pdf' ? 'View PDF' : 
                 'View Live Site'}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
