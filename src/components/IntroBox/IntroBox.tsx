import { useState } from 'react';
import './IntroBox.css';

type Language = 'en' | 'pt' | 'nl';
type Section = 'About' | 'Profile' | 'Skills';

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

export default function IntroBox({ item, onSectionChange }: IntroBoxProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [currentSection, setCurrentSection] = useState<Section>('About');

  const introTexts: IntroTexts = {
    en: `I'm Wouter, a Creative Developer from Holland. I love bringing ideas to life with unique yet functional interfaces.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

My Skills & Expertise:
• Frontend Development: React, TypeScript, Next.js, Vue.js
• UI/UX Design: Figma, Adobe XD, Sketch, InVision
• Backend Technologies: Node.js, Express, MongoDB, PostgreSQL
• Design Tools: Photoshop, Illustrator, After Effects, Premiere Pro
• Version Control: Git, GitHub, GitLab, Bitbucket
• Project Management: Jira, Trello, Asana, Notion

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,
    pt: "Sou Wouter, Creative Developer da Holanda. Adoro criar interfaces que tornam ideias em experiências únicas e funcionais.",
    nl: "Ik ben Wouter, een Creative Developer. Ik breng ideeën tot leven met unieke, boeiende e functionele digitale ervaringen."
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sections: Section[] = ['About', 'Profile', 'Skills'];
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    setCurrentSection(sections[nextIndex]);
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
            <p>{introTexts[language]}</p>
          )}

          {currentSection === 'Profile' && (
            <div className="character-content">
              {/* Level Badge */}
              <div className="level-badge">LVL 27</div>
              
              {/* Top Half - Pixel Avatar */}
              <div className="character-avatar">
                <svg 
                  className="pixel-avatar" 
                  width="80" 
                  height="80" 
                  viewBox="0 0 80 80"
                >
                  {/* Head */}
                  <rect x="20" y="10" width="40" height="40" fill="var(--accent)" />
                  {/* Eyes */}
                  <rect x="28" y="22" width="6" height="6" fill="var(--bg-primary)" />
                  <rect x="46" y="22" width="6" height="6" fill="var(--bg-primary)" />
                  {/* Mouth */}
                  <rect x="32" y="36" width="16" height="4" fill="var(--bg-primary)" />
                  {/* Body */}
                  <rect x="25" y="50" width="30" height="25" fill="var(--accent)" />
                  {/* Arms */}
                  <rect x="10" y="55" width="15" height="8" fill="var(--accent)" />
                  <rect x="55" y="55" width="15" height="8" fill="var(--accent)" />
                  {/* Legs */}
                  <rect x="30" y="75" width="8" height="10" fill="var(--accent)" />
                  <rect x="42" y="75" width="8" height="10" fill="var(--accent)" />
                </svg>
              </div>
              
              {/* Bottom Half - Stats */}
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
