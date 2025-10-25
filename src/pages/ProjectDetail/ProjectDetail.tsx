import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/sanity';
import './ProjectDetail.css';

// Utility: cycle distinct, non-purple colors; shuffle order per project via seed
const getStableToolColors = (tools: string[], seedStr?: string) => {
  // Keep the hex codes we've been using, limited to clear, distinct hues
  const colors = ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#06b6d4', '#f59e0b'];
  const darkColors = ['#1d4ed8', '#16a34a', '#ea580c', '#dc2626', '#0891b2', '#d97706'];

  // Seeded randomness to make order unique per project but stable across renders
  const hashString = (str: string) => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return h >>> 0;
  };
  const seed = seedStr ? hashString(seedStr) : Math.floor(Math.random() * 2 ** 32);
  let s = seed;
  const rand = () => {
    // Mulberry32 PRNG
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
  mobileHeroBanner?: {
    asset: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
  category: string;
  shortDescription: string;
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
  downloadables?: Array<{ _key: string; asset?: { _ref: string }; label?: string; url?: string; mimeType?: string; extension?: string }>;
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
          shortDescription,
          body,
          tools,
          desktopImages,
          mobileImages,
          link,
          downloadables[]{ _key, asset, label, "url": asset->url, "mimeType": asset->mimeType, "extension": asset->extension }
        }`;
        const data = await client.fetch(query, { slug: projectId });
        console.log('Fetched project data:', data);
        setSanityProject(data);
        
        // Generate stable colors for tools
        if (data && data.tools) {
          const seed = data?.slug?.current || data?._id || '';
          setToolColors(getStableToolColors(data.tools, seed));
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

  const renderPortableBody = (body: any[] | undefined) => {
    if (!Array.isArray(body)) return null;
    const stripHtml = (text: string) => text.replace(/<[^>]*>/g, '');
    return body.map((block, index) => {
      if (block?._type === 'block' && Array.isArray(block.children)) {
        const raw = block.children.map((child: any) => child?.text || '').join('');
        const text = stripHtml(raw);
        const style = block.style || 'normal';
        if (style === 'h1') return <h1 key={index}>{text}</h1>;
        if (style === 'h2') return <h2 key={index}>{text}</h2>;
        if (style === 'h3') return <h3 key={index}>{text}</h3>;
        if (style === 'blockquote') return <blockquote key={index}>{text}</blockquote>;
        return <p key={index}>{text}</p>;
      }
      if (block?._type === 'code' && typeof block.code === 'string') {
        const lang = block.language || 'plaintext';
        return (
          <pre key={index} className={`code-block lang-${lang}`}>
            <code>
              {block.code}
            </code>
          </pre>
        );
      }
      if (block?._type === 'image' && block.asset?._ref) {
        try {
          const src = urlFor(block).width(1200).fit('max').url();
          return (
            <div key={index} className="project-body-image">
              <img src={src} alt={project?.title || 'Project image'} style={{ width: '100%', height: 'auto' }} />
            </div>
          );
        } catch {
          return null;
        }
      }
      return null;
    });
  };

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
          ← {project!.title}
        </button>
        <h2>
          {project!.link?.url && (
            <a 
              href={project!.link.url}
              target={project!.link.openInNewTab ? '_blank' : '_self'} 
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
        </h2>
      </div>
      
      <div className="project-content">
                {/* Short description and tools (same visuals/classes as meta/tools) */}
                {project!.shortDescription && (
          <div className="project-description">
            <h1>{project!.shortDescription}</h1>
          </div>
        )}
                {project!.tools && project!.tools.length > 0 && (
          <div className="project-meta">
            <div className="project-tools">
              <div className="tools-list">
                {project!.tools.map((tool, index) => {
                  const colors = toolColors[index];
                  const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
                  const isGoofyTheme = document.documentElement.getAttribute('data-theme') === 'goofy';
                  let backgroundColor = colors?.light || '#3b82f6';
                  if (isDarkTheme && colors) {
                    backgroundColor = colors.dark;
                  } else if (isGoofyTheme) {
                    backgroundColor = index % 2 === 0 ? '#dc2626' : '#2563eb';
                  }
                  return (
                    <span
                      key={index}
                      className="tool-tag tool-tag-random"
                      style={{ backgroundColor }}
                    >
                      {tool}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div className="project-image">
          <img
            src={urlFor(project!.heroBanner).url()}
            alt={project!.title} 
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
        </div>
        
        {/* Mobile Hero Banner */}
        {project!.mobileHeroBanner && (
          <div className="project-mobile-image">
            <img
              src={urlFor(project!.mobileHeroBanner).url()}
              alt={`${project!.title} - Mobile View`} 
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center'
              }}
            />
          </div>
        )}
        
        <div className="">
          
          <div className="project-description">
            <h1>About this project</h1>
            <div className="project-body-content">
              {project!.body && (
                <div className="project-body-rich">
                  {renderPortableBody(project!.body)}
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop Project Images - Hidden on Mobile */}
          {project!.desktopImages && project!.desktopImages.length > 0 && (
            <div className="project-showcase desktop-showcase">
              <div className="showcase-images">
                {project!.desktopImages.map((image, index) => (
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
          {project!.mobileImages && project!.mobileImages.length > 0 && (
            <div className="project-showcase mobile-showcase-only">
              <div className="showcase-images mobile-showcase">
                {project!.mobileImages.map((image, index) => (
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
            {project!.downloadables && project!.downloadables.length > 0 && (
              <div className="project-downloads">
                <h1>Downloadables</h1>
                {project!.downloadables.map((file) => {
                  if (!file.url) return null;
                  const isPdf = (file.mimeType?.toLowerCase() === 'application/pdf') || (file.extension?.toLowerCase() === 'pdf') || /\.pdf(\?|$)/i.test(file.url);
                  return (
                    <a
                      key={file._key}
                      href={file.url}
                      className="project-link"
                      target={isPdf ? '_blank' : undefined}
                      rel={isPdf ? 'noopener noreferrer' : undefined}
                      download={isPdf ? undefined : ''}
                    >
                      {file.label || (isPdf ? 'Open PDF' : 'Download')}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
