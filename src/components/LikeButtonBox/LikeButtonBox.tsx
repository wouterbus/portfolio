import { useState } from 'react';
import './LikeButtonBox.css';

interface LikeButtonBoxProps {
  item: {
    id: string;
    number?: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
  onLikeToggle: (isLiked: boolean) => void;
}

export default function LikeButtonBox({ item, onSectionChange, onLikeToggle }: LikeButtonBoxProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    onLikeToggle(newIsLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Copy your website URL to clipboard
    navigator.clipboard.writeText('https://wouterbus.com/').then(() => {
      console.log('Website URL copied to clipboard');
      setIsCopied(true);
      // Reset after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
    });
  };

  const handleSleep = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Sleep action - could add sleep tracking logic here
    console.log('Sleep clicked');
  };

  const handleRepeat = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Repeat action - could add repeat logic here
    console.log('Repeat clicked');
  };

  return (
    <div
      key={item.id}
      className="grid-box like-button-box"
      onClick={() => onSectionChange('Like')}
    >
      <div className="like-container">
        <div className="action-grid">
          <button 
            className="action-button share-button"
            onClick={handleShare}
          >
            <svg className="action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span className="action-text">{isCopied ? 'Copied to Clipboard!' : 'Share'}</span>
          </button>
          
          <button 
            className={`action-button like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <svg className="action-icon" width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="action-text">Like</span>
          </button>
          
          <button 
            className="action-button sleep-button"
            onClick={handleSleep}
          >
            <svg className="action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <span className="action-text">Sleep</span>
          </button>
          
          <button 
            className="action-button repeat-button"
            onClick={handleRepeat}
          >
            <svg className="action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
            <span className="action-text">Repeat</span>
          </button>
        </div>
      </div>
    </div>
  );
}
