import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { client, urlFor } from '../../lib/sanity';
import './Portfolio.css';

// Utility: cycle distinct colors; shuffle per project via slug/id seed
const getStableToolColors = (tools: string[], seedStr: string) => {
  const colors = ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#06b6d4', '#f59e0b'];
  const darkColors = ['#1d4ed8', '#16a34a', '#ea580c', '#dc2626', '#0891b2', '#d97706'];

  const hashString = (str: string) => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return h >>> 0;
  };
  let s = hashString(seedStr || '');
  const rand = () => {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const shuffle = <T,>(arr: T[]): T[] => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const shuffledLight = shuffle(colors);
  const shuffledDark = shuffle(darkColors);

  return tools.map((_, index) => ({
    light: shuffledLight[index % shuffledLight.length],
    dark: shuffledDark[index % shuffledDark.length],
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
  category?: string; // deprecated single category
  categories?: string[]; // new multi categories
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'web-design', 'ui-ux-design', 'graphic-design'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
              const query = `*[_type == "project"] | order(order asc, _createdAt desc) {
                _id,
                title,
                heroBanner,
                slug,
                category,
                categories,
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

  // Sync selected category with URL query parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => {
        const multi = Array.isArray(project.categories) ? project.categories : []
        return multi.includes(selectedCategory) || project.category === selectedCategory
      });

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
              onClick={() => {
                setSelectedCategory(category);
                if (category === 'all') {
                  setSearchParams({});
                } else {
                  setSearchParams({ category });
                }
              }}
            >
              {category === 'all' ? 'All' : 
               category === 'web-design' ? 'Web Design' :
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
                          const seed = project.slug?.current || project._id || '';
                          const projectToolColors = getStableToolColors(project.tools, seed);
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
