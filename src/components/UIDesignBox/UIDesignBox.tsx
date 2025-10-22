import { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/sanity';
import './UIDesignBox.css';

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

interface UIDesignBoxProps {
  item: {
    id: string;
    title: string;
    style?: string;
  };
  onUIDesignClick: () => void;
  onProjectClick?: (slug: string) => void;
}

export default function UIDesignBox({ item, onUIDesignClick, onProjectClick }: UIDesignBoxProps) {
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project" && category == "ui-ux-design"] | order(order asc, _createdAt desc) [0..2] {
          _id,
          title,
          heroBanner,
          slug
        }`;
        const data = await client.fetch(query);
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching UI/UX design projects:', error);
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
      className={`grid-box ui-design-box ${item.style ? `style-${item.style}` : ''}`}
    >
      <div className="ui-design-grid-small">
        <div 
          className="ui-design-item-small ui-design-title-small"
          onClick={onUIDesignClick}
        >
          <h3>UI Design</h3>
        </div>
        {loading ? (
          <>
            <div className="ui-design-item-small ui-design-loading">
              <div>Loading...</div>
            </div>
            <div className="ui-design-item-small ui-design-loading">
              <div>Loading...</div>
            </div>
            <div className="ui-design-item-small ui-design-loading">
              <div>Loading...</div>
            </div>
          </>
        ) : (
          projects.map((project) => (
            <div 
              key={project._id}
              className="ui-design-item-small"
              onClick={(e) => {
                e.stopPropagation();
                onProjectClick?.(project.slug.current);
              }}
            >
              <img 
                src={urlFor(project.heroBanner).width(200).height(150).fit('crop').url()} 
                alt={project.title} 
              />
              <div className="ui-design-overlay">
                <div className="ui-design-info">
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


