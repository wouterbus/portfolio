import { useState } from 'react';
import './IntroBox.css';

type Language = 'en' | 'pt' | 'nl';
type Section = 'About' | 'Profile' | 'Skills';
type FormStep = 'greeting' | 'intro' | 'purpose' | 'phone' | 'thankyou';

interface IntroTexts {
  en: string;
  pt: string;
  nl: string;
}

interface IntroBoxProps {
  item: {
    id: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

interface FormData {
  name: string;
  purpose: string;
  phone: string;
}

export default function IntroBox({ item, onSectionChange }: IntroBoxProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [currentSection, setCurrentSection] = useState<Section>('About');
  
  // Form states
  const [formStep, setFormStep] = useState<FormStep>('greeting');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    purpose: '',
    phone: ''
  });
  const [tempInput, setTempInput] = useState('');

  const introTexts: IntroTexts = {
    en: `I'm a creative developer from Holland with a passion for bringing ideas to life through unique and functional interfaces.`,
    pt: "Sou um desenvolvedor criativo da Holanda com paixão por dar vida a ideias através de interfaces únicas e funcionais.",
    nl: "Ik ben een creatieve ontwikkelaar uit Nederland met een passie voor het tot leven brengen van ideeën door unieke en functionele interfaces."
  };

  const purposeOptions = [
    "→ I'm looking for a website or design project",
    "→ I'm interested in a collaboration or partnership",
    "→ I just wanted to say hi"
  ];

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sections: Section[] = ['About', 'Profile', 'Skills'];
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    setCurrentSection(sections[nextIndex]);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempInput.trim()) {
      setFormData({ ...formData, name: tempInput });
      setTempInput('');
      setTimeout(() => setFormStep('intro'), 300);
    }
  };

  const handlePurposeSelect = (purpose: string) => {
    setFormData({ ...formData, purpose });
    setTimeout(() => setFormStep('phone'), 300);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempInput.trim()) {
      setFormData({ ...formData, phone: tempInput });
      setTempInput('');
      setTimeout(() => setFormStep('thankyou'), 300);
    }
  };

  const handleFinalSubmit = () => {
    console.log('Form submitted:', formData);
    setFormStep('thankyou');
  };

  const renderFormContent = () => {
    switch (formStep) {
      case 'greeting':
        return (
          <div className="form-step fade-in">
            <h3 className="form-question">Hey there! First of all — my name is Wouter. What is yours?</h3>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                placeholder="Type your name..."
                className="form-input"
                autoFocus
              />
              <button type="submit" className="form-btn">Continue →</button>
            </form>
          </div>
        );

      case 'intro':
        return (
          <div className="form-step fade-in">
            <h3 className="form-greeting">Nice to meet you, {formData.name.split(' ')[0]}!</h3>
            <p className="form-text">
              I'm a Creative Developer from Holland with a passion for bringing ideas to life through unique and functional interfaces.
            </p>
            <button
              onClick={() => setFormStep('purpose')}
              className="form-btn"
            >
              Next →
            </button>
          </div>
        );

      case 'purpose':
        return (
          <div className="form-step fade-in">
            <h3 className="form-question">What brings you here today?</h3>
            <div className="purpose-options">
              {purposeOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePurposeSelect(option)}
                  className="purpose-btn"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'phone':
        return (
          <div className="form-step fade-in">
            <h3 className="form-question">
              Okay, this might sound a little forward... but—uhm... can I get your number?
            </h3>
            <form onSubmit={handlePhoneSubmit}>
              <input
                type="tel"
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                placeholder="+55 11 99999-9999"
                className="form-input"
                autoFocus
              />
              <button type="submit" className="form-btn">Continue →</button>
            </form>
          </div>
        );


      case 'thankyou':
        return (
          <div className="form-step fade-in">
            <h3 className="form-greeting">Thanks, {formData.name}!</h3>
            <p className="form-text">I'll be in touch soon!</p>
            <button
              onClick={() => {
                setFormStep('greeting');
                setFormData({ name: '', purpose: '', phone: '' });
              }}
              className="form-btn-secondary"
            >
              Start Over
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      key={item.id}
      className="grid-box intro-box"
      onClick={() => onSectionChange('Wouter Bus')}
    >
      <div className="intro-content">
        <div className="header start">
          <h2 className="intro-title">{currentSection}</h2>
          <div className="person-link-icon" onClick={handleArrowClick}><span>→</span></div>
        </div>
        
        <div className="intro-text">
          {currentSection === 'About' && (
              <div className="form-container">
                {renderFormContent()}
              </div>
          )}

          {currentSection === 'Profile' && (
            <div className="character-content">
              <div className="level-badge">LVL 27</div>
              
              <div className="character-avatar">
                <svg 
                  className="pixel-avatar" 
                  width="80" 
                  height="80" 
                  viewBox="0 0 80 80"
                >
                  <rect x="20" y="10" width="40" height="40" fill="var(--accent)" />
                  <rect x="28" y="22" width="6" height="6" fill="var(--bg-primary)" />
                  <rect x="46" y="22" width="6" height="6" fill="var(--bg-primary)" />
                  <rect x="32" y="36" width="16" height="4" fill="var(--bg-primary)" />
                  <rect x="25" y="50" width="30" height="25" fill="var(--accent)" />
                  <rect x="10" y="55" width="15" height="8" fill="var(--accent)" />
                  <rect x="55" y="55" width="15" height="8" fill="var(--accent)" />
                  <rect x="30" y="75" width="8" height="10" fill="var(--accent)" />
                  <rect x="42" y="75" width="8" height="10" fill="var(--accent)" />
                </svg>
              </div>
              
              <div className="character-stats">
                <div className="stat-item">
                  <div className="stat-label">Creativity</div>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{ width: '85%' }}></div>
                  </div>
                  <div className="stat-value">85%</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-label">Code</div>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{ width: '92%' }}></div>
                  </div>
                  <div className="stat-value">92%</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-label">Coffee</div>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{ width: '78%' }}></div>
                  </div>
                  <div className="stat-value">78%</div>
                </div>
              </div>
            </div>
          )}

          {currentSection === 'Skills' && (
            <div className="skills-content">
              <div className="skills-list">
                <div className="skill-item">React</div>
                <div className="skill-item">TypeScript</div>
                <div className="skill-item">CSS/SCSS</div>
                <div className="skill-item">Node.js</div>
                <div className="skill-item">UI/UX Design</div>
                <div className="skill-item">Creative Development</div>
              </div>
            </div>
          )}
        </div>
        
        <div className="language-switcher">
          <button
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setLanguage('en');
            }}
          >
            EN
          </button>
          <button
            className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setLanguage('pt');
            }}
          >
            PT
          </button>
          <button
            className={`lang-btn ${language === 'nl' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setLanguage('nl');
            }}
          >
            NL
          </button>
        </div>
      </div>
    </div>
  );
}