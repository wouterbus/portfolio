import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import emailjs from '@emailjs/browser';
import './IntroBox.css';

type Language = 'en' | 'pt';
type Section = 'Contact' | 'Profile' | 'Skills';
type FormStep = 'greeting' | 'intro' | 'purpose' | 'phone' | 'thankyou';

interface Copy {
  greetingQuestion: string;
  introParagraph: string;
  purposeQuestion: string;
  phoneQuestion: string;
  placeholderName: string;
  placeholderPhone: string;
  continue: string;
  next: string;
  startOver: string;
  thanks: (name: string) => string;
  inTouch: string;
  purposes: string[];
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
  const { language, toggleLanguage } = useLanguage();
  const [currentSection] = useState<Section>('Contact');
  
  // Form states
  const [formStep, setFormStep] = useState<FormStep>('greeting');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    purpose: '',
    phone: ''
  });
  const [tempInput, setTempInput] = useState('');

const COPY: Record<Language, Copy> = {
  en: {
    greetingQuestion: "Hey there! First of all — my name is Wouter. What is yours?",
    introParagraph: "I'm a Creative Developer from Holland with a passion for bringing ideas to life through unique and functional interfaces.",
    purposeQuestion: "What brings you here today?",
    phoneQuestion: "Okay, this might sound strange... but can I get your number?",
    placeholderName: "Type your name...",
    placeholderPhone: "+55 21 99134-7181",
    continue: "Continue →",
    next: "Next →",
    startOver: "Start Over",
    thanks: (name: string) => `Thanks, ${name}!`,
    inTouch: "I'll be in touch soon!",
    purposes: [
      "→ I'm looking for a website or design project",
      "→ I'm interested in a collaboration or partnership",
      "→ I just wanted to say hi",
    ],
  },
  pt: {
    greetingQuestion: "Olá! Primeiro — meu nome é Wouter. Qual é o seu?",
    introParagraph: "Sou um Desenvolvedor Criativo da Holanda, apaixonado por transformar ideias em interfaces únicas e funcionais.",
    purposeQuestion: "O que te traz aqui hoje?",
    phoneQuestion: "Pode me passar seu número?",
    placeholderName: "Digite seu nome...",
    placeholderPhone: "+55 21 99134-7181",
    continue: "Continuar →",
    next: "Próximo →",
    startOver: "Recomeçar",
    thanks: (name: string) => `Obrigado, ${name}!`,
    inTouch: "Entrarei em contato em breve!",
    purposes: [
      "→ Estou procurando um site ou projeto de design",
      "→ Tenho interesse em colaboração ou parceria",
      "→ Só queria dizer oi",
    ],
  },
  
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

  // (removed unused helper)

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempInput.trim()) {
      setFormData({ ...formData, phone: tempInput });
      setTempInput('');
      // send email with latest phone immediately
      (async () => {
        try {
          await emailjs.send(
            'service_8w50gtj',
            'template_4252o3a',
            { name: formData.name, purpose: formData.purpose, phone: tempInput, language },
            '8ChJlG0bjS_kw_6VZ'
          );
          console.log('Email successfully sent!');
        } catch (err) {
          console.error('Email send error:', err);
        }
      })();
      setTimeout(() => setFormStep('thankyou'), 300);
    }
  };

  // final submit handled in phone step - remove unused

  const renderFormContent = () => {
    switch (formStep) {
      case 'greeting':
        return (
          <div className="form-step fade-in">
            <h3 className="form-question">{COPY[language].greetingQuestion}</h3>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                placeholder={COPY[language].placeholderName}
                className="form-input"
                autoFocus
              />
              <button type="submit" className="form-btn">{COPY[language].continue}</button>
            </form>
          </div>
        );

      case 'intro':
        return (
          <div className="form-step fade-in">
            <h3 className="form-greeting">Nice to meet you, {formData.name.split(' ')[0]}!</h3>
            <p className="form-text">{COPY[language].introParagraph}</p>
            <button
              onClick={() => setFormStep('purpose')}
              className="form-btn"
            >
              {COPY[language].next}
            </button>
          </div>
        );

      case 'purpose':
        return (
          <div className="form-step fade-in">
            <h3 className="form-question">{COPY[language].purposeQuestion}</h3>
            <div className="purpose-options">
              {COPY[language].purposes.map((option, idx) => (
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
            <h3 className="form-question">{COPY[language].phoneQuestion}</h3>
            <form onSubmit={handlePhoneSubmit}>
              <input
                type="tel"
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                placeholder={COPY[language].placeholderPhone}
                className="form-input"
                autoFocus
              />
              <button type="submit" className="form-btn">{COPY[language].continue}</button>
            </form>
          </div>
        );


      case 'thankyou':
        return (
          <div className="form-step fade-in">
            <h3 className="form-greeting">{COPY[language].thanks(formData.name)}</h3>
            <p className="form-text">{COPY[language].inTouch}</p>
            <button
              onClick={() => {
                setFormStep('greeting');
                setFormData({ name: '', purpose: '', phone: '' });
              }}
              className="form-btn-secondary"
            >
              {COPY[language].startOver}
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
        </div>
        
        <div className="intro-text">
          {currentSection === 'Contact' && (
              <div className="form-container">
                {renderFormContent()}
              </div>
          )}
        </div>
        
        <div className="language-switcher">
          <button
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (language !== 'en') toggleLanguage();
            }}
          >
            EN
          </button>
          <button
            className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (language !== 'pt') toggleLanguage();
            }}
          >
            PT
          </button>
        </div>
      </div>
    </div>
  );
}