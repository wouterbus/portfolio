import { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/sanity';
import './PortfolioBox3.css';

interface SanityProject {
  _id: string;
  title: string;
  heroBanner: {
    asset: {
      _ref: string;
    };
  };
  thumbnail?: {
    asset: {
      _ref: string;
    };
  };
  thumbnailVideoUrl?: string;
  slug: {
    current: string;
  };
}

interface PortfolioBox3Props {
  item: {
    id: string;
    title: string;
    style?: string;
  };
  onPortfolioBox3Click: () => void;
  onProjectClick?: (slug: string) => void;
}

export default function PortfolioBox3({ item, onPortfolioBox3Click, onProjectClick }: PortfolioBox3Props) {
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"
          && (category == "graphic-design" || "graphic-design" in coalesce(categories, []))
          && !(category == "web-design" || "web-design" in coalesce(categories, []))
          && !(category == "ui-ux-design" || "ui-ux-design" in coalesce(categories, []))
          && featured != true
        ] | order(order asc, _createdAt desc) [0..2] {
          _id,
          title,
          heroBanner,
          thumbnail,
          "thumbnailVideoUrl": thumbnailVideo.asset->url,
          slug
        }`;
        const data = await client.fetch(query);
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching Graphic Design projects for portfolio box 3:', error);
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
          projects.map((project) => {
            const displayVideoUrl = project.thumbnailVideoUrl;
            const displayImage = project.thumbnail || project.heroBanner;
            return (
              <div 
                key={project._id}
                className="portfolio-item-small"
                onClick={(e) => {
                  e.stopPropagation();
                  onProjectClick?.(project.slug.current);
                }}
              >
                {displayVideoUrl ? (
                  <video src={displayVideoUrl} muted loop autoPlay playsInline />
                ) : (
                  <img
                    src={urlFor(displayImage).width(200).height(150).fit('crop').url()}
                    alt={project.title}
                  />
                )}
                <div className="portfolio-overlay">
                  <div className="portfolio-content">
                    <h3>{project.title}</h3>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div 
          className="portfolio-item-small portfolio-title-small"
          onClick={onPortfolioBox3Click}
        >
          <h3>Graphic Design</h3>
        </div>
      </div>

    </div>
  );
}


