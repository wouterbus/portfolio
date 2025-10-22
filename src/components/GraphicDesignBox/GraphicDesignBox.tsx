import { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/sanity';
import './GraphicDesignBox.css';

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
}

interface GraphicDesignBoxProps {
  item: {
    id: string;
    title: string;
    style?: string;
  };
  onGraphicDesignClick: () => void;
  onProjectClick?: (slug: string) => void;
}

export default function GraphicDesignBox({ item, onGraphicDesignClick, onProjectClick }: GraphicDesignBoxProps) {
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project" && category == "graphic-design"] | order(order asc, _createdAt desc) [0..2] {
          _id,
          title,
          heroBanner,
          slug
        }`;
        const data = await client.fetch(query);
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching graphic design projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
        {loading ? (
          <>
            <div className="graphic-design-item-small graphic-design-loading">
              <div>Loading...</div>
            </div>
            <div className="graphic-design-item-small graphic-design-loading">
              <div>Loading...</div>
            </div>
            <div className="graphic-design-item-small graphic-design-loading">
              <div>Loading...</div>
            </div>
          </>
        ) : (
          projects.map((project) => (
            <div 
              key={project._id}
              className="graphic-design-item-small"
              onClick={(e) => {
                e.stopPropagation();
                onProjectClick?.(project.slug.current);
              }}
            >
              <img 
                src={urlFor(project.heroBanner).width(200).height(150).fit('crop').url()} 
                alt={project.title} 
              />
              <div className="graphic-design-overlay">
                <div className="graphic-design-info">
                  <h3>{project.title}</h3>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


