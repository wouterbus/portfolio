import { useState } from 'react';
import './IntroBox.css';

type Language = 'en' | 'pt' | 'nl';

interface IntroTexts {
  en: string;
  pt: string;
  nl: string;
}

interface IntroBoxProps {
  item: {
    id: string;
    number?: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function IntroBox({ item, onSectionChange }: IntroBoxProps) {
  const [language, setLanguage] = useState<Language>('en');

  const introTexts: IntroTexts = {
    en: "I'm Wouter, a Creative Developer from Holland. I love bringing ideas to life with unique yet functional interfaces.",
    pt: "Sou Wouter, Creative Developer da Holanda. Adoro criar interfaces que tornam ideias em experiências únicas e funcionais.",
    nl: "Ik ben Wouter, een Creative Developer. Ik breng ideeën tot leven met unieke, boeiende en functionele digitale ervaringen."
  };

  return (
    <div
      key={item.id}
      className="grid-box intro-box"
      onClick={() => onSectionChange('Wouter Bus')}
    >
      <div className="intro-content">
        <div className="intro-header">
          <span className="box-number">{item.number}</span>
          <h2 className="intro-title">{item.title}</h2>
        </div>
        
        <p className="intro-text">{introTexts[language]}</p>
        
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
