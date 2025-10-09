import { useState } from 'react';
import './DeveloperBox.css';

interface DeveloperBoxProps {
  item: {
    id: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function DeveloperBox({ item, onSectionChange }: DeveloperBoxProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  console.log('DeveloperBox rendered with item:', item);

  const projectImages = [
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=600&fit=crop',
  ];

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % projectImages.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open WhatsApp with a pre-filled message
    const message = encodeURIComponent("Hi! I'm interested in your development services. Can we discuss a project?");
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  return (
    <div
      key={item.id}
      className="grid-box developer-box"
      onClick={() => onSectionChange('Developer')}
    >
      <div className="developer-container">
        <div className="developer-slider">
          <button className="slider-btn prev-btn" onClick={prevSlide}>
            ‹
          </button>
          <div className="slider-content">
            <img 
              src={projectImages[currentSlide]} 
              alt={`Project ${currentSlide + 1}`}
              className="slider-image"
            />
            <div className="slider-info">
              <span className="project-number">Project #{currentSlide + 1}</span>
            </div>
          </div>
          <button className="slider-btn next-btn" onClick={nextSlide}>
            ›
          </button>
        </div>
        
        <div className="slider-dots">
          {projectImages.map((_, index) => (
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
          <div className="project-name">
            <h3>Project #{currentSlide + 1}</h3>
          </div>
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
