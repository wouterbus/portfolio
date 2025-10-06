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
    number?: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function HallOfFame({ item, onSectionChange }: HallOfFameProps) {
  const hallOfFame: Person[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      profileUrl: 'https://twitter.com/sarahjohnson'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      profileUrl: 'https://github.com/michaelchen'
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'UX Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      profileUrl: 'https://dribbble.com/emmawilliams'
    },
    {
      id: 4,
      name: 'David Martinez',
      role: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      profileUrl: 'https://linkedin.com/in/davidmartinez'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'Brand Strategist',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
      profileUrl: 'https://twitter.com/lisaanderson'
    },
    {
      id: 6,
      name: 'James Taylor',
      role: 'Motion Designer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      profileUrl: 'https://behance.net/jamestaylor'
    }
  ];

  return (
    <div
      key={item.id}
      className="grid-box hall-of-fame-box"
      onClick={() => onSectionChange('Hall of Fame')}
    >
      <div className="box-header">
        <span className="box-number">{item.number}</span>
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


