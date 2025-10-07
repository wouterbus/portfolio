import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import all the box components
import IntroBox from '../../components/IntroBox/IntroBox';
import CVDownloadBox from '../../components/CVDownloadBox/CVDownloadBox';
import PortraitsBox from '../../components/PortraitsBox/PortraitsBox';
import PortfolioBox from '../../components/PortfolioBox/PortfolioBox';
import HallOfFame from '../../components/HallOfFame/HallOfFame';
import LikeButtonBox from '../../components/LikeButtonBox/LikeButtonBox';
import NewsletterBox from '../../components/NewsletterBox/NewsletterBox';
import ThemeSwitcherBox from '../../components/ThemeSwitcherBox/ThemeSwitcherBox';
import UISliderBox from '../../components/UISliderBox/UISliderBox';
import GridBox from '../../components/GridBox/GridBox';
import EmptyBox from '../../components/EmptyBox/EmptyBox';
import FeaturedBox from '../../components/FeaturedBox/FeaturedBox';
import UIDesignBox from '../../components/UIDesignBox/UIDesignBox';
import GraphicDesignBox from '../../components/GraphicDesignBox/GraphicDesignBox';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import CoffeeBox from '../../components/CoffeeBox/CoffeeBox';
import ShopBox from '../../components/ShopBox/ShopBox';

interface HomeProps {
  likeCount: number;
  onLikeToggle: (isLiked: boolean) => void;
}

export default function Home({ onLikeToggle }: HomeProps) {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('main');

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  if (currentSection === 'Portfolio') {
    navigate('/portfolio');
    return null;
  }

  if (currentSection === 'UIDesign') {
    // Handle UI Design section
    return (
      <div className="main-grid">
        <div className="ui-design-content">
          <div className="ui-design-grid">
            <div className="ui-design-item">
              <h3>Mobile App Design</h3>
              <p>Modern mobile interface design with clean aesthetics and intuitive user experience.</p>
            </div>
            <div className="ui-design-item">
              <h3>Web Dashboard</h3>
              <p>Comprehensive web dashboard design with data visualization and user management.</p>
            </div>
            <div className="ui-design-item">
              <h3>E-commerce Platform</h3>
              <p>Complete e-commerce solution with shopping cart, checkout, and user profiles.</p>
            </div>
            <div className="ui-design-item">
              <h3>Landing Page</h3>
              <p>High-converting landing page design with compelling call-to-actions.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === 'Ideas') {
    return (
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
    );
  }

  return (
    <div className="main-grid">
      <div className="main-grid-content">
        <IntroBox 
          item={{ id: 'intro', title: 'Introduction' }} 
          onSectionChange={handleSectionChange} 
        />
        <PortfolioBox 
          item={{ id: 'portfolio', title: 'Web Design' }} 
          onPortfolioClick={() => navigate('/portfolio')}
          onProjectClick={(slug) => {
            navigate(`/project/${slug}`);
          }}
        />
        <NewsletterBox 
          item={{ id: 'newsletter', title: 'Newsletter' }} 
          onSectionChange={handleSectionChange} 
        />
        <FeaturedBox 
          item={{ id: 'featured-project', title: 'Featured Project' }}
          onProjectClick={(slug) => navigate(`/project/${slug}`)}
        />
        <CVDownloadBox 
          item={{ id: 'cv', title: 'CV Download' }} 
          onSectionChange={handleSectionChange} 
        />
        <LikeButtonBox 
          item={{ id: 'like', title: 'Like Button' }} 
          onSectionChange={handleSectionChange}
          onLikeToggle={onLikeToggle}
        />
        <UIDesignBox 
          item={{ id: 'ui-design', title: 'User Interface Design' }} 
          onUIDesignClick={() => handleSectionChange('UIDesign')}
          onProjectClick={(slug) => {
            navigate(`/project/${slug}`);
          }}
        />
        <PortraitsBox 
          item={{ id: 'portraits', title: 'Portraits' }} 
          onSectionChange={handleSectionChange} 
        />
        <HallOfFame 
          item={{ id: 'hall-of-fame', title: 'My Personal Hall of Fame' }} 
          onSectionChange={handleSectionChange} 
        />
        <ThemeSwitcherBox 
          item={{ id: 'theme', title: 'Theme Switcher' }} 
          onSectionChange={handleSectionChange} 
        />
        <UISliderBox 
          item={{ id: 'slider', title: 'UI Slider' }} 
          onSectionChange={handleSectionChange} 
        />
        <GridBox 
          item={{ id: 'grid', title: 'Pixel Grid' }} 
          onSectionChange={handleSectionChange} 
        />
        <CharacterCard 
          item={{ id: 'character', title: 'Character Card' }} 
          onSectionChange={handleSectionChange} 
        />
        <GraphicDesignBox 
          item={{ id: 'graphic-design', title: 'Graphic Design' }} 
          onGraphicDesignClick={() => handleSectionChange('GraphicDesign')}
          onProjectClick={(slug) => {
            navigate(`/project/${slug}`);
          }}
        />
        <CoffeeBox />
        <ShopBox />
      </div>
    </div>
  );
}
