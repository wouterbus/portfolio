import './Contact.css';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Contact() {
  const { language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const T = language === 'pt' ? {
    sendMessage: 'Enviar mensagem',
    name: 'Nome',
    email: 'E-mail',
    message: 'Mensagem',
    yourName: 'Seu nome',
    yourEmail: 'voce@exemplo.com',
    sayHello: 'Diga olá...',
    send: 'Enviar',
    sent: 'Mensagem enviada! ',
    failed: 'Falha ao enviar. Tente novamente mais tarde.',
    github: 'GitHub',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp'
  } : {
    sendMessage: 'Send a message',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    yourName: 'Your name',
    yourEmail: 'you@example.com',
    sayHello: 'Say hello...',
    send: 'Send',
    sent: 'Message sent!',
    failed: 'Failed to send. Please try again later.',
    github: 'Github',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    setError(null);
    try {
      await emailjs.send(
        'service_8w50gtj',
        'template_iiu217l',
        { name, email, message },
        '8ChJlG0bjS_kw_6VZ'
      );
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError('Failed to send. Please try again later.');
      console.error('Email send error:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-grid">
        <div className="contact-card">
          <p>{T.email}</p>
          <a className="contact-link" href="mailto:info@wouterbus.com">info@wouterbus.com</a>
          <p>{T.whatsapp}</p>
          <a className="contact-link" href="https://wa.me/5521991347181" target="_blank" rel="noopener noreferrer">+55 21 99134-7181</a>
          <p>{T.github}</p>
          <a className="contact-link external-link-with-icon" href="https://github.com/wouterbus" target="_blank" rel="noopener noreferrer">
            /wouterbus
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15,3 21,3 21,9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <p>{T.instagram}</p>
          <a className="contact-link external-link-with-icon" href="https://www.instagram.com/wouterbus/" target="_blank" rel="noopener noreferrer">
            /wouterbus
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15,3 21,3 21,9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
        <div className="contact-form-box">
          <h2>{T.sendMessage}</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">{T.name}</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={T.yourName} />
            </div>
            <div className="form-row">
              <label htmlFor="email">{T.email}</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={T.yourEmail} required />
            </div>
            <div className="form-row">
              <label htmlFor="message">{T.message}</label>
              <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={T.sayHello} rows={5}></textarea>
            </div>
            <div className="form-actions">
              <button type="submit" className="button-link" disabled={sending}>{sending ? (language === 'pt' ? 'Enviando…' : 'Sending…') : T.send}</button>
              {sent && <span className="send-status">{T.sent}</span>}
              {error && <span className="send-error">{T.failed}</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
