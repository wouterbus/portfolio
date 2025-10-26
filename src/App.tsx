 
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { loadingTracker } from './lib/sanity';
import './App.css';

import HeaderThemeSwitcher from './components/HeaderThemeSwitcher/HeaderThemeSwitcher';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';

// Import pages
import Home from './pages/Home/Home';
import Portfolio from './pages/Portfolio/Portfolio';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
// import Dribbbles from './pages/Dribbbles/Dribbbles';
import Contact from './pages/Contact/Contact';

// Header component
function Header() {
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <div className="header-container">
      <div className="header-left">
        <div className="studio-tag">
          <button
            aria-label="Go to Home"
            className="studio-logo-button"
            onClick={() => navigate('/')}
            style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <img
              src="/logo_fav.svg"
              alt="Studio W Logo"
              className="studio-logo"
            />
          </button>
        </div>
      </div>
      <div className="header-center">
        <HamburgerMenu />
        <div className="header-tabs">
          <button
            className={`header-tab ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            className={`header-tab ${location.pathname === '/portfolio' ? 'active' : ''}`}
            onClick={() => navigate('/portfolio')}
          >
            Portfolio
          </button>
          <button
            className={`header-tab ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={() => navigate('/contact')}
          >
            Contact
          </button>
        </div>
      </div>
      <div className="header-right">
        <HeaderThemeSwitcher />
      </div>
    </div>
  );
}

function Footer() {
  const location = useLocation();
  return (
    <div className="footer-container" id="contact">
      <div className="footer-left">
        <div className="footer-links">
          <a href="mailto:info@wouterbus.com" className="footer-link">info@wouterbus.com</a>
          <span className="footer-separator">•</span>
          <a href="https://wa.me/5521991347181" target="_blank" rel="noopener noreferrer" className="footer-link">+5521991347181</a>
        </div>
      </div>
      <div className="footer-center"></div>
      <div className="footer-right">
        <p className="footer-copy">© Studio W. All rights reserved.</p>
      </div>
    </div>
  );
}

function AppContent() {
  const [inFlight, setInFlight] = useState(0);
  useEffect(() => {
    const unsub = loadingTracker.subscribe(setInFlight);
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        {/* <Route path="/dribbbles" element={<Dribbbles />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/ideas" element={
          <div className="main-grid">
            <div className="ideas-content">
              <div className="ideas-grid">
                <div className="idea-item">
                  <h3>Who I Am</h3>
                  <p>Creative Developer from Holland with a passion for bringing ideas to life through unique and functional interfaces.</p>
                </div>
                <div className="idea-item">
                  <h3>What I Do</h3>
                  <p>I specialize in web development, UI/UX design, and creating digital experiences that combine creativity with functionality.</p>
                </div>
                <div className="idea-item">
                  <h3>My Skills</h3>
                  <p>React, TypeScript, JavaScript, HTML, CSS, Figma, Adobe Creative Suite, and modern web technologies.</p>
                </div>
                <div className="idea-item">
                  <h3>My Approach</h3>
                  <p>I believe in user-centered design, clean code, and creating solutions that are both beautiful and practical.</p>
                </div>
                <div className="idea-item">
                  <h3>What I Like</h3>
                  <p>I love exploring new technologies, experimenting with creative designs, and solving complex problems with elegant solutions.</p>
                </div>
                <div className="idea-item">
                  <h3>My Hobbies</h3>
                  <p>Photography, traveling, exploring new cities, trying different cuisines, and staying up-to-date with design trends.</p>
                </div>
                <div className="idea-item">
                  <h3>What I Read</h3>
                  <p>Design blogs, tech articles, UX research papers, and books about creativity and innovation in digital spaces.</p>
                </div>
                <div className="idea-item">
                  <h3>My Inspiration</h3>
                  <p>I'm inspired by clean design, innovative user experiences, and the intersection of technology and creativity.</p>
                </div>
                <div className="idea-item">
                  <h3>My Values</h3>
                  <p>Quality over quantity, user experience first, continuous learning, and creating meaningful digital experiences.</p>
                </div>
                <div className="idea-item">
                  <h3>My Goals</h3>
                  <p>To create impactful digital solutions, mentor other developers, and contribute to the open-source community.</p>
                </div>
                <div className="idea-item">
                  <h3>My Experience</h3>
                  <p>Years of experience in web development, working with various clients and projects across different industries.</p>
                </div>
                <div className="idea-item">
                  <h3>My Philosophy</h3>
                  <p>Great design is not just about how it looks, but how it works and how it makes users feel.</p>
                </div>
                <div className="idea-item">
                  <h3>My Process</h3>
                  <p>I follow a structured approach: research, ideation, prototyping, testing, and iteration to ensure the best results.</p>
                </div>
                <div className="idea-item">
                  <h3>My Tools</h3>
                  <p>I use modern tools and technologies to create efficient, scalable, and maintainable solutions for my clients.</p>
                </div>
                <div className="idea-item">
                  <h3>My Future</h3>
                  <p>Continuing to grow as a developer, exploring new technologies, and creating even better digital experiences.</p>
                </div>
              </div>
            </div>
          </div>
        } />
      </Routes>
      <div style={{ marginTop: 'auto' }} />
      {inFlight === 0 && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;