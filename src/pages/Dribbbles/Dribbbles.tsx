import { useState, useEffect } from 'react';
import { client, urlFor } from '../../lib/sanity';
import './Dribbbles.css';

interface DribbbleShot {
  _id: string;
  title: string;
  image: {
    asset: { _ref: string; };
    alt?: string;
  };
  slug: { current: string; };
  order: number;
}

interface LikeState {
  [key: string]: {
    liked: boolean;
    count: number;
  };
}

export default function Dribbbles() {
  const [dribbbles, setDribbbles] = useState<DribbbleShot[]>([]);
  const [loading, setLoading] = useState(true);
  const [likeStates, setLikeStates] = useState<LikeState>({});
  const [error, setError] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDribbbles = async () => {
      try {
        const query = `*[_type == "dribbble"] | order(order asc, _createdAt desc) {
          _id,
          title,
          image,
          slug,
          order
        }`;
        const data = await client.fetch(query);
        setDribbbles(data || []);

        // Initialize like states from localStorage
        const initialLikeStates: LikeState = {};
        data?.forEach((dribbble: DribbbleShot) => {
          const savedState = localStorage.getItem(`dribbble_like_${dribbble._id}`);
          if (savedState) {
            initialLikeStates[dribbble._id] = JSON.parse(savedState);
          } else {
            // Initialize with random like counts between 10-500
            const randomCount = Math.floor(Math.random() * 491) + 10;
            initialLikeStates[dribbble._id] = {
              liked: false,
              count: randomCount
            };
          }
        });
        setLikeStates(initialLikeStates);
      } catch (error) {
        console.error('Error fetching dribbbles:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch dribbbles');
        setDribbbles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDribbbles();
  }, []);

  const handleLike = (dribbbleId: string) => {
    setLikeStates(prev => {
      const currentState = prev[dribbbleId];
      const newLiked = !currentState.liked;
      const newCount = newLiked ? currentState.count + 1 : currentState.count - 1;
      
      const newState = {
        ...prev,
        [dribbbleId]: {
          liked: newLiked,
          count: newCount
        }
      };

      // Save to localStorage
      localStorage.setItem(`dribbble_like_${dribbbleId}`, JSON.stringify(newState[dribbbleId]));
      
      return newState;
    });
  };

  const handleFullscreen = (imageUrl: string, index: number) => {
    setFullscreenImage(imageUrl);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % dribbbles.length
      : (currentIndex - 1 + dribbbles.length) % dribbbles.length;
    
    setCurrentIndex(newIndex);
    setFullscreenImage(urlFor(dribbbles[newIndex].image).width(1200).height(800).fit('max').quality(95).url());
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fullscreenImage) return;
      
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage, currentIndex, dribbbles]);


  if (loading) {
    return (
      <div className="dribbbles-page">
        <div className="dribbbles-header">
          <h1>Dribbble Shots</h1>
        </div>
        <div className="dribbbles-loading">
          <div className="loading-spinner"></div>
          <p>Loading dribbble shots...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dribbbles-page">
        <div className="dribbbles-header">
          <h1>Dribbble Shots</h1>
        </div>
        <div className="dribbbles-error">
          <h3>Error Loading Dribbbles</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dribbbles-page">
      <div className="dribbbles-grid">
        {dribbbles.length > 0 ? (
          dribbbles.map((dribbble) => {
            const likeState = likeStates[dribbble._id] || { liked: false, count: 0 };
            
            return (
              <div key={dribbble._id} className="dribbble-shot">
                <div className="dribbble-image-container">
                  <img 
                    src={urlFor(dribbble.image).width(800).height(600).fit('max').quality(90).url()} 
                    alt={dribbble.image.alt || dribbble.title}
                    className="dribbble-image"
                  />
                </div>
                <div className="dribbble-info">
                  <h3 className="dribbble-title">{dribbble.title}</h3>
                  <div className="dribbble-actions">
                    <button 
                      className="fullscreen-button"
                      onClick={() => handleFullscreen(
                        urlFor(dribbble.image).width(1200).height(800).fit('max').quality(95).url(),
                        dribbbles.indexOf(dribbble)
                      )}
                      aria-label="View in fullscreen"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                      </svg>
                    </button>
                    <button 
                      className="nav-button nav-prev"
                      onClick={() => {
                        const currentIdx = dribbbles.indexOf(dribbble);
                        const prevIdx = (currentIdx - 1 + dribbbles.length) % dribbbles.length;
                        handleFullscreen(
                          urlFor(dribbbles[prevIdx].image).width(1200).height(800).fit('max').quality(95).url(),
                          prevIdx
                        );
                      }}
                      aria-label="Previous image"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15,18 9,12 15,6"/>
                      </svg>
                    </button>
                    <button 
                      className="nav-button nav-next"
                      onClick={() => {
                        const currentIdx = dribbbles.indexOf(dribbble);
                        const nextIdx = (currentIdx + 1) % dribbbles.length;
                        handleFullscreen(
                          urlFor(dribbbles[nextIdx].image).width(1200).height(800).fit('max').quality(95).url(),
                          nextIdx
                        );
                      }}
                      aria-label="Next image"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"/>
                      </svg>
                    </button>
                    <button 
                      className={`like-button ${likeState.liked ? 'liked' : ''}`}
                      onClick={() => handleLike(dribbble._id)}
                      aria-label={`${likeState.liked ? 'Unlike' : 'Like'} this dribbble shot`}
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill={likeState.liked ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      <span className="like-count">{likeState.count}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="dribbbles-empty">
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
              </svg>
              <h3>No Dribbble Shots Yet</h3>
              <p>Start adding some UI/UX design shots to showcase your work!</p>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div className="fullscreen-modal" onClick={closeFullscreen}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="fullscreen-close"
              onClick={closeFullscreen}
              aria-label="Close fullscreen"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            
            <button 
              className="fullscreen-nav fullscreen-nav-prev"
              onClick={() => navigateImage('prev')}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            
            <button 
              className="fullscreen-nav fullscreen-nav-next"
              onClick={() => navigateImage('next')}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
            
            <img 
              src={fullscreenImage} 
              alt={dribbbles[currentIndex]?.title || 'Dribbble shot'}
              className="fullscreen-image"
            />
            
            <div className="fullscreen-info">
              <h3>{dribbbles[currentIndex]?.title}</h3>
              <p>{currentIndex + 1} of {dribbbles.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
