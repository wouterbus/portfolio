import './HallOfFame.css';

interface Person {
  id: number;
  name: string;
  role: string;
  image: string;
  profileUrl: string;
}

interface HallOfFameProps {
  item: {
    id: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function HallOfFame({ item, onSectionChange }: HallOfFameProps) {
  const hallOfFame: Person[] = [
    {
      id: 1,
      name: 'Malika Favre',
      role: 'Illustrator & Artist',
      image: '/profile-malika-favre.png',
      profileUrl: 'https://www.malikafavre.com/'
    },
    {
      id: 2,
      name: 'KI/KI',
      role: 'DJ & Producer',
      image: '/profile-kiki.png',
      profileUrl: 'https://www.instagram.com/ki.slash.ki/'
    },
    {
      id: 3,
      name: 'Fabrizio Bianchi',
      role: 'Designer & Developer',
      image: '/profile-coolors.png',
      profileUrl: 'https://coolors.co/'
    },
    {
      id: 4,
      name: 'Beirut',
      role: 'Indie Folk Band',
      image: '/profile-beirut.jpg',
      profileUrl: 'https://open.spotify.com/artist/6pmxr66tMAePxzOLfjGNcX?si=9LReIM8JSxOqBzkauEmIyg'
    },
    {
      id: 5,
      name: 'Monument Valley',
      role: 'Mobile Game',
      image: '/profile-monument-valley.png',
      profileUrl: 'https://www.monumentvalleygame.com/mv3'
    },
    {
      id: 6,
      name: 'Tom Hanks',
      role: 'Actor & Filmmaker',
      image: '/profile-tom-hanks.png',
      profileUrl: 'https://www.instagram.com/tomhanks/'
    },
    {
      id: 7,
      name: 'The Secret Life of Walter Mitty',
      role: 'Film',
      image: '/profile-the-secret-life-of-walter-mitty.png',
      profileUrl: 'https://www.imdb.com/pt/title/tt0359950/'
    }
  ];

  return (
    <div
      key={item.id}
      className="grid-box hall-of-fame-box"
      onClick={() => onSectionChange('Hall of Fame')}
    >
      <div className="header center">
        <h3>My Personal Hall of Fame</h3>
      </div>
      <div className="folks-list">
        {hallOfFame.map((person) => (
          <a
            key={person.id}
            href={person.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="person-item"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="person-image">
              <img src={person.image} alt={person.name} />
            </div>
            <div className="person-info">
              <h4 className="person-name">{person.name}</h4>
              <span className="person-role">{person.role}</span>
            </div>
            <div className="person-link-icon">
              <span>→</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}


