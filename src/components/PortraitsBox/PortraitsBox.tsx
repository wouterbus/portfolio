import { useState, useEffect } from 'react';
import './PortraitsBox.css';

interface PortraitsBoxProps {
  item: {
    id: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function PortraitsBox({ item, onSectionChange }: PortraitsBoxProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // debug removed

  const portraitImages = [
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

  // Autoplay functionality with reset capability
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portraitImages.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [portraitImages.length, currentSlide]); // Reset when currentSlide changes

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % portraitImages.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + portraitImages.length) % portraitImages.length);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open WhatsApp with a pre-filled message
    const message = encodeURIComponent("Hi! I'm interested in your portrait services. Can we discuss a project?");
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  return (
    <div
      key={item.id}
      className="grid-box portraits-box"
      onClick={() => onSectionChange('Portraits')}
    >
      <div className="portraits-container">
        <div className="portraits-slider">
          <button className="slider-btn prev-btn" onClick={prevSlide}>
            ‹
          </button>
          <div className="slider-content">
            <img 
              src={portraitImages[currentSlide]} 
              alt={`Portrait ${currentSlide + 1}`}
              className="slider-image"
            />
            <div className="slider-info">
              <span className="portrait-number">Portrait #{currentSlide + 1}</span>
            </div>
          </div>
          <button className="slider-btn next-btn" onClick={nextSlide}>
            ›
          </button>
        </div>
        
        <div className="slider-dots">
          {portraitImages.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
              }}
            />
          ))}
        </div>

        <div className="floating-button-container">
          <button 
            className="floating-btn"
            onClick={handleWhatsApp}
          >
            <span className="floating-btn-icon">💬</span>
            <span className="floating-btn-text">WhatsApp for Inquiry</span>
          </button>
        </div>
      </div>
    </div>
  );
}
