import './Partnership.css';

interface PartnershipProps {
  item: {
    id: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function Partnership({ onSectionChange }: PartnershipProps) {
  const handleVisitSite = () => {
    window.open('https://seriguela.com', '_blank');
  };

  return (
    <div
      className="grid-box partnership-box"
      onClick={() => onSectionChange('Partnership')}
    >
      <div className="partnership-container">
        <video
          className="partnership-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/1080X1080.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="partnership-overlay">
          <div className="partnership-content">
            <h2 className="partnership-subtitle">Partnership with</h2>
            <button
              className="partnership-button"
              onClick={(e) => {
                e.stopPropagation();
                handleVisitSite();
              }}
            >
              visit site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
