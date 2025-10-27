import { useState, useEffect } from 'react';
import './CVDownloadBox.css';

interface CVDownloadBoxProps {
  item: {
    id: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function CVDownloadBox({ item, onSectionChange }: CVDownloadBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);

  useEffect(() => {
    if (!isModalOpen) {
      // Re-enable hover when modal is closed
      setIsHoverEnabled(true);
    }
  }, [isModalOpen]);

  const handleDownload = (language: string) => {
    // Download CV based on language
    const cvFiles = {
      'Portuguese': '/downloables/resumes/Currículo Wouter.pdf',
      'Dutch': '/downloables/resumes/CV Wouter.pdf',
      'English': '/downloables/resumes/Resumé English.pdf'
    };

    const filePath = cvFiles[language as keyof typeof cvFiles];
    if (filePath) {
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = filePath;
      link.download = `CV-${language}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Close modal after download initiates
    handleCloseModal();
  };

  const handleCloseModal = () => {
    // debug removed
    setIsModalOpen(false);
    setIsHoverEnabled(true);
    // Force a small delay to ensure DOM is updated
    setTimeout(() => {
      // debug removed
    }, 100);
  };

  return (
    <>
      <div
        key={`${item.id}-${isModalOpen}`}
        className={`cv-download-box ${isHoverEnabled ? 'hover-enabled' : 'hover-disabled'}`}
        onClick={() => {
          if (!isModalOpen) {
            setIsModalOpen(true);
            setIsHoverEnabled(false);
            onSectionChange('CV Download');
          }
        }}
      >
        <div className="cv-artwork">
          <img 
            src="/resume-thumbnail.png" 
            alt="CV Download" 
            className="cv-thumbnail"
          />
          <div className="cv-overlay">
            <h2>Resumé</h2>
          </div>
        </div>
        
        {/* CV Download Modal - Inside the box */}
        {isModalOpen ? (
          <div 
            className="cv-modal-container inner-container"
            onClick={handleCloseModal}
          >
            <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
              <div className="cv-modal-header">
                <h2>Download CV</h2>
                <button 
                  className="cv-modal-close"
                  onClick={handleCloseModal}
                >
                  ✕
                </button>
              </div>
              <div className="cv-modal-content">
                <div className="cv-download-buttons">
                  <button 
                    className="cv-download-btn"
                    onClick={() => handleDownload('Portuguese')}
                  >
                    <span className="cv-flag">
                      <img src="/portuguese.svg" alt="Portuguese flag" />
                    </span>
                    <span className="cv-lang">Portuguese</span>
                    <span className="cv-format">PDF</span>
                  </button>
                  <button 
                    className="cv-download-btn"
                    onClick={() => handleDownload('Dutch')}
                  >
                    <span className="cv-flag">
                      <img src="/dutch.svg" alt="Dutch flag" />
                    </span>
                    <span className="cv-lang">Dutch</span>
                    <span className="cv-format">PDF</span>
                  </button>
                  <button 
                    className="cv-download-btn"
                    onClick={() => handleDownload('English')}
                  >
                    <span className="cv-flag">
                      <img src="/english.svg" alt="English flag" />
                    </span>
                    <span className="cv-lang">English</span>
                    <span className="cv-format">PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
