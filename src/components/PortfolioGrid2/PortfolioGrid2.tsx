import { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/sanity';
import '../../components/PortfolioBox/PortfolioBox.css';

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

interface PortfolioGrid2Props {
  item: {
    id: string;
    title: string;
    style?: string;
  };
  onPortfolioGrid2Click: () => void;
  onProjectClick?: (slug: string) => void;
}

export default function PortfolioGrid2({ item, onPortfolioGrid2Click, onProjectClick }: PortfolioGrid2Props) {
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(order asc, _createdAt desc) [3..5] {
          _id,
          title,
          heroBanner,
          slug
        }`;
        const data = await client.fetch(query);
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects for portfolio grid 2:', error);
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
      className={`grid-box portfolio-box ${item.style ? `style-${item.style}` : ''}`}
    >
      <div className="portfolio-grid-small">
        <div 
          className="portfolio-item-small portfolio-title-small"
          onClick={onPortfolioGrid2Click}
        >
          <h3>All</h3>
        </div>
        {loading ? (
          <>
            <div className="portfolio-item-small portfolio-loading">
              <div>Loading...</div>
            </div>
            <div className="portfolio-item-small portfolio-loading">
              <div>Loading...</div>
            </div>
            <div className="portfolio-item-small portfolio-loading">
              <div>Loading...</div>
            </div>
          </>
        ) : (
          projects.map((project) => (
            <div 
              key={project._id}
              className="portfolio-item-small"
              onClick={(e) => {
                e.stopPropagation();
                onProjectClick?.(project.slug.current);
              }}
            >
              <img
                src={urlFor(project.heroBanner).width(200).height(150).fit('crop').url()}
                alt={project.title}
              />
              <div className="portfolio-overlay">
                <div className="portfolio-content">
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
