import { useState } from 'react';
import './UISliderBox.css';

interface UISliderBoxProps {
  item: {
    id: string;
    title: string;
    style?: string;
  };
  onSectionChange: (section: string) => void;
}

export default function UISliderBox({ item, onSectionChange }: UISliderBoxProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <div
      key={item.id}
      className={`grid-box ui-slider-box style-${item.style}`}
      onClick={() => onSectionChange('UI')}
    >
      <div className="slider-container">
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
            <h3>{item.title}</h3>
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
    </div>
  );
}
