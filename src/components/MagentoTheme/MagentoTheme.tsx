import { useNavigate } from 'react-router-dom';
import './MagentoTheme.css';

interface PDFBox {
  id: string;
  title: string;
  icon: string;
  filename: string;
}

const pdfBoxes: PDFBox[] = [
  { id: '1', title: 'Homepage Design', icon: '🏠', filename: 'homepage-design.pdf' },
  { id: '2', title: 'Product Catalog', icon: '📦', filename: 'product-catalog.pdf' },
  { id: '3', title: 'Shopping Cart', icon: '🛒', filename: 'shopping-cart.pdf' },
  { id: '4', title: 'Checkout Process', icon: '💳', filename: 'checkout-process.pdf' },
  { id: '5', title: 'User Dashboard', icon: '👤', filename: 'user-dashboard.pdf' },
  { id: '6', title: 'Admin Panel', icon: '⚙️', filename: 'admin-panel.pdf' },
  { id: '7', title: 'Mobile Layout', icon: '📱', filename: 'mobile-layout.pdf' },
  { id: '8', title: 'Style Guide', icon: '🎨', filename: 'style-guide.pdf' },
];

export default function MagentoTheme() {
  const navigate = useNavigate();

  const handleDownload = (filename: string) => {
    // In a real app, this would trigger the actual PDF download
    console.log(`Downloading ${filename}`);
    // For demo purposes, we'll just show an alert
    alert(`Downloading ${filename}`);
  };

  return (
    <div className="magento-theme-page">
      <div className="project-header">
        <button 
          className="back-button" 
          onClick={() => navigate('/portfolio')}
        >
          ← Back to Portfolio
        </button>
        <h1>Custom Magento Theme</h1>
      </div>
      
      <div className="project-content">
        <div className="project-image">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop" alt="Custom Magento Theme" />
        </div>
        
        <div className="magento-content">
          <div className="project-description">
            <h3>Project Overview</h3>
            <p>A comprehensive custom Magento theme with modern design principles, responsive layout, and enhanced user experience. The theme includes custom components, optimized performance, and seamless integration with Magento's core functionality.</p>
          </div>
          
          <div className="pdf-grid">
            <h3>Design Documentation</h3>
            <div className="pdf-boxes-grid">
              {pdfBoxes.map((box) => (
                <div 
                  key={box.id}
                  className="pdf-box"
                  onClick={() => handleDownload(box.filename)}
                >
                  <div className="pdf-icon">
                    {box.icon}
                  </div>
                  <div className="pdf-title">
                    {box.title}
                  </div>
                  <div className="download-indicator">
                    📄 PDF
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
