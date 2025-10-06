import type { Project } from '../types';

// Mock data - ready to be replaced with Sanity.io data
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Seriguela',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop',
    tools: ['React', 'TypeScript', 'Stripe'],
    link: 'https://seriguela.com',
    body: `
      <p>Seriguela is a modern e-commerce platform built with cutting-edge web technologies. This project showcases the power of React and TypeScript in creating scalable, maintainable web applications.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>Responsive Design:</strong> Optimized for all devices and screen sizes</li>
        <li><strong>Payment Integration:</strong> Secure checkout process with Stripe</li>
        <li><strong>Real-time Updates:</strong> Live inventory and pricing updates</li>
        <li><strong>User Authentication:</strong> Secure login and registration system</li>
      </ul>
      
      <h3>Technical Implementation</h3>
      <p>The application leverages React's component-based architecture for modular development, while TypeScript ensures type safety and better developer experience. The integration with Stripe provides a seamless payment experience for users.</p>
      
      <blockquote>
        <p>"This project demonstrates the perfect balance between functionality and user experience, creating an intuitive shopping platform that users love."</p>
      </blockquote>
      
      <h3>Results</h3>
      <p>The platform successfully handles thousands of transactions monthly with a 99.9% uptime and excellent user satisfaction scores.</p>
    `,
  },
  {
    id: '2',
    title: 'Custom Magento Theme',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    tools: ['PHP', 'Magento', 'SCSS'],
  },
  {
    id: '3',
    title: 'Ana Saude',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    tools: ['Figma', 'Adobe XD', 'Principle'],
  },
  {
    id: '4',
    title: 'Layout E-Commerce',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    tools: ['Sketch', 'InVision', 'Zeplin'],
  },
  {
    id: '5',
    title: 'Appic',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    tools: ['Figma', 'After Effects', 'Lottie'],
  },
  {
    id: '6',
    title: 'Project Management App',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    tools: ['Vue.js', 'Node.js', 'MongoDB'],
  },
  {
    id: '7',
    title: 'Helder',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    tools: ['Figma', 'Photoshop', 'Illustrator'],
  },
  {
    id: '8',
    title: 'Borimbora',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop',
    tools: ['Next.js', 'Tailwind', 'Vercel'],
  },
  {
    id: '9',
    title: 'Webshop Redesign',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    tools: ['Sketch', 'Figma', 'Webflow'],
  },
  {
    id: '10',
    title: 'LP Snapshots',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    tools: ['Photoshop', 'Illustrator', 'InDesign'],
  },
  {
    id: '11',
    title: 'Bulkdesks',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    tools: ['Illustrator', 'Photoshop', 'Blender'],
  },
  {
    id: '12',
    title: 'Portrait Gallery',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    tools: ['Lightroom', 'Photoshop', 'Capture One'],
  },
  {
    id: '13',
    title: 'Custom Typeface',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop',
    tools: ['Glyphs', 'FontForge', 'Illustrator'],
  },
];

export const devotionItems = [
  'Figma',
  'Footvolley',
  'Eating Tons of Gummy Candy',
  'The Game Monument Valley',
  'Arts & Crafts',
  'Any Type of Boardgame',
  'Ipanema Beach',
];

export const loathingItems = [
  'Tomatoes',
  'The Robots Taking Over',
  'Scrolling',
  'Throlling',
  '9/11',
  'Sing and Song Writers',
  'Gossip',
  'Heights',
  'Podcasts',
];

