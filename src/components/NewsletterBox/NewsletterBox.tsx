import { useState } from 'react';
import './NewsletterBox.css';

interface NewsletterBoxProps {
  item: {
    id: string;
    number?: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function NewsletterBox({ item, onSectionChange }: NewsletterBoxProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Random thumbnail images like portfolio banners
  const thumbnailImages = [
    '/PortraitsImages/portrait-alice.png',
    '/PortraitsImages/portrait-andy.png',
    '/PortraitsImages/portrait-bia.png',
    '/PortraitsImages/portrait-bianca.png',
    '/PortraitsImages/portrait-camila.png',
    '/PortraitsImages/portrait-diana.png',
    '/PortraitsImages/portrait-elza.png',
    '/PortraitsImages/portrait-isa.png',
    '/PortraitsImages/portrait-marcelo.png',
    '/PortraitsImages/portrait-mom.png',
    '/PortraitsImages/portrait-vincent.png',
    '/PortraitsImages/portrait-wesley.png',
  ];

  // Select a random thumbnail
  const randomThumbnail = thumbnailImages[Math.floor(Math.random() * thumbnailImages.length)];

  const handleSubscribe = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (email && name) {
      setIsSubscribed(true);
      // Here you would typically send the data to your backend
      console.log('Newsletter subscription:', { email, name });
    }
  };

  return (
    <div
      key={item.id}
      className="grid-box newsletter-box"
      onClick={() => onSectionChange('Newsletter')}
    >
      <div className="newsletter-header">
        <img 
          src={randomThumbnail} 
          alt="Newsletter thumbnail" 
          className="newsletter-thumbnail"
        />
        <div className="newsletter-title-section">
          <h3 className="newsletter-title">News</h3>
        </div>
        
        <div className="newsletter-tooltip">
          <svg className="tooltip-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <div className="tooltip-content">
            <p>We respect your privacy. Your email will only be used to send you relevant news and updates. You can unsubscribe at any time.</p>
          </div>
        </div>
      </div>
      
      <div className="newsletter-form">
        {!isSubscribed ? (
          <>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => {
                e.stopPropagation();
                setName(e.target.value);
              }}
              className="newsletter-input"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => {
                e.stopPropagation();
                setEmail(e.target.value);
              }}
              className="newsletter-input"
            />
            <button
              onClick={handleSubscribe}
              className="newsletter-button"
            >
              Subscribe
            </button>
          </>
        ) : (
          <div className="newsletter-success">
            <div className="success-icon">✓</div>
            <h3>Subscribed!</h3>
            <p>Thank you for subscribing to our newsletter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
