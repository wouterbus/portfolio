import { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/sanity';
import './FeaturedBox.css';

interface SanityProject {
  _id: string;
  title: string;
  heroBanner: {
    asset: {
      _ref: string;
    };
  };
  thumbnail: {
    asset: {
      _ref: string;
    };
  };
  thumbnailVideoUrl?: string;
  slug: {
    current: string;
  };
  category?: string;
  categories?: string[];
  featured?: boolean;
}

interface FeaturedBoxProps {
  item: {
    id: string;
    title: string;
  };
  onProjectClick: (slug: string) => void;
}

export default function FeaturedBox({ onProjectClick }: FeaturedBoxProps) {
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project" && featured == true] | order(order asc, _createdAt desc) [0] {
          _id,
          title,
          heroBanner,
          thumbnail,
          "thumbnailVideoUrl": thumbnailVideo.asset->url,
          slug,
          category,
          categories,
          featured,
          order
        }`;
        const data = await client.fetch(query);
        setProjects(data ? [data] : []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid-box featured-box">
        <div className="project-loading">
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="grid-box featured-box">
        <div className="project-empty">
          <h3>No projects yet</h3>
          <p>Create your first project in Sanity Studio</p>
        </div>
      </div>
    );
  }

  // Get the first project for the main display
  const mainProject = projects[0];

  // Determine media to display: prefer video thumbnail, then image thumbnail, then heroBanner
  const displayVideoUrl = mainProject.thumbnailVideoUrl;
  const displayImage = mainProject.thumbnail || mainProject.heroBanner;
  
  if (!displayImage && !displayVideoUrl) {
    console.error('Project missing both thumbnail and heroBanner:', mainProject);
    return (
      <div className="grid-box featured-box">
        <div className="project-error">
          <h3>Project Missing Image</h3>
          <p>Please add a thumbnail or hero banner to this project in Sanity Studio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-box featured-box">
      <div 
        className="main-project-display"
        onClick={() => onProjectClick(mainProject.slug.current)}
      >
        <div className="hero-banner">
          {displayVideoUrl ? (
            <video
              src={displayVideoUrl}
              muted
              loop
              autoPlay
              playsInline
            />
          ) : (
            <img 
              src={urlFor(displayImage).width(800).height(600).fit('crop').url()} 
              alt={mainProject.title}
              onError={(e) => {
                console.error('Image failed to load:', e);
                (e.target as HTMLImageElement).src = '/placeholder-image.png';
              }}
            />
          )}
          <div className="project-overlay">
            <div className="project-info">
              <h3 className="project-title">{mainProject.title}</h3>
              <span className="project-category">{(mainProject.categories && mainProject.categories.join(', ')) || mainProject.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
