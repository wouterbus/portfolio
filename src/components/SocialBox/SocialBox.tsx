import './SocialBox.css';

interface SocialBoxProps {
  item: {
    id: string;
    title: string;
  };
}

export default function SocialBox({ item }: SocialBoxProps) {
  const socials = [
    { id: 'insta', label: 'Instagram', href: 'https://instagram.com/', icon: '/insta.svg' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/', icon: '/github.svg' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: '/linkedin.svg' },
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/', icon: '/whatsapp.svg' },
  ];

  return (
    <div key={item.id} className="grid-box social-box">
      <div className="social-grid">
        {socials.map((s) => (
          <a key={s.id} className="social-item" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
            <div className="social-icon-wrap">
              <img className="social-icon" src={s.icon} alt={s.label} />
              <div className="social-badge">
                <span className="social-badge-text">{s.label}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}


