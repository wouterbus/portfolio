# Wouter Bus Portfolio Website

React + Vite + TypeScript portfolio website with strict 10px spacing system and theme switcher.

## Design System

### Spacing
- **All margins, paddings, and gaps**: exactly `10px`
- **All border-radius**: exactly `20px` (for images and containers)

This is enforced via CSS variables:
```css
--spacing: 10px;
--border-radius: 20px;
```

### Theme Switcher
Toggle between light and dark themes using the button in the header. Theme preference is saved to localStorage.

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx       # Header with theme toggle
│   ├── ExpandableSection.tsx  # Collapsible sections
│   └── PortfolioGrid.tsx      # Project grid with filters
├── contexts/
│   └── ThemeContext.tsx # Theme management
├── lib/
│   └── sanity.ts        # Sanity client configuration
└── App.tsx              # Main app component
```

## Future: Sanity.io Integration

### Setup Steps

1. **Install Sanity Client**
   ```bash
   npm install @sanity/client @sanity/image-url
   ```

2. **Create Sanity Config** (`src/lib/sanity.ts`)
   ```typescript
   import { createClient } from '@sanity/client';
   import imageUrlBuilder from '@sanity/image-url';

   export const client = createClient({
     projectId: 'YOUR_PROJECT_ID',
     dataset: 'production',
     apiVersion: '2024-01-01',
     useCdn: true,
   });

   const builder = imageUrlBuilder(client);
   export const urlFor = (source: any) => builder.image(source);
   ```

3. **Create Sanity Schemas**
   - Project schema with fields: title, category, image, description
   - PersonalInfo schema for devotion/loathing lists

4. **Replace Mock Data**
   Update components to fetch from Sanity:
   ```typescript
   // Example in App.tsx
   const [projects, setProjects] = useState<Project[]>([]);
   
   useEffect(() => {
     client.fetch('*[_type == "project"]').then(setProjects);
   }, []);
   ```

5. **Image Optimization**
   ```typescript
   // Use Sanity image URLs with transformations
   <img src={urlFor(project.image).width(400).url()} />
   ```

## Data Structure (Ready for Sanity)

The `Project` interface in `PortfolioGrid.tsx` is structured for easy Sanity integration:

```typescript
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
}
```

All data is now dynamically fetched from Sanity CMS.
