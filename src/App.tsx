import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

import HeaderThemeSwitcher from './components/HeaderThemeSwitcher/HeaderThemeSwitcher';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';

// Import pages
import Home from './pages/Home/Home';
import Portfolio from './pages/Portfolio/Portfolio';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import Dribbbles from './pages/Dribbbles/Dribbbles';

// Header component
function Header({
  likeCount
}: {
  likeCount: number;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="header-container">
      <div className="header-left">
        <div className="studio-tag">
          <img
            src="/logo_fav.svg"
            alt="Studio W Logo"
            className="studio-logo"
          />
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
            className={`header-tab ${location.pathname === '/dribbbles' ? 'active' : ''}`}
            onClick={() => navigate('/dribbbles')}
          >
            Dribbbles
          </button>
          <button
            className={`header-tab ${location.pathname === '/ideas' ? 'active' : ''}`}
            onClick={() => navigate('/ideas')}
          >
            Ideas
          </button>
        </div>
      </div>
      <div className="header-right">
        <div className="likes-counter">
          <svg
            key={likeCount}
            className="heart-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="likes-count">{likeCount}</span>
        </div>
        <div className="location">São Paulo, SP, Brazil</div>
        <div className="local-time">{formatTime(currentTime)}</div>
        <HeaderThemeSwitcher />
      </div>
    </div>
  );
}

function AppContent() {
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeToggle = (isLiked: boolean) => {
    setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
  };

  return (
    <div className="app">
      <Header
        likeCount={likeCount}
      />
      <Routes>
        <Route path="/" element={<Home likeCount={likeCount} onLikeToggle={handleLikeToggle} />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/dribbbles" element={<Dribbbles />} />
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
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;