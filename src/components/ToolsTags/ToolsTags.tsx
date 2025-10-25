import './ToolsTags.css';

type ThemeMode = 'auto' | 'light' | 'dark' | 'goofy';

interface ToolsTagsProps {
  tools: string[];
  className?: string;
  theme?: ThemeMode;
  max?: number;
  seed?: string; // optional seed to vary order per context
}

// Cycle distinct, non-purple colors per array; same tool can differ across projects
const getStableToolColors = (tools: string[], seedStr = '') => {
  const colors = ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#06b6d4', '#f59e0b'];
  const darkColors = ['#1d4ed8', '#16a34a', '#ea580c', '#dc2626', '#0891b2', '#d97706'];

  const hashString = (str: string) => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return h >>> 0;
  };
  let s = hashString(seedStr);
  const rand = () => {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const shuffle = <T,>(arr: T[]): T[] => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const shuffledLight = shuffle(colors);
  const shuffledDark = shuffle(darkColors);

  return tools.map((_, idx) => ({
    light: shuffledLight[idx % shuffledLight.length],
    dark: shuffledDark[idx % shuffledDark.length],
  }));
};

export default function ToolsTags({ tools, className, theme = 'auto', max, seed = '' }: ToolsTagsProps) {
  const list = max ? tools.slice(0, max) : tools;
  const colors = getStableToolColors(list, seed);

  const currentTheme: ThemeMode = theme === 'auto'
    ? ((document.documentElement.getAttribute('data-theme') as ThemeMode) || 'light')
    : theme;

  return (
    <div className={`tools-list ${className || ''}`.trim()}>
      {list.map((tool, index) => {
        const bg = currentTheme === 'dark' ? colors[index].dark
          : currentTheme === 'goofy' ? (index % 2 === 0 ? '#dc2626' : '#2563eb')
          : colors[index].light;
        return (
          <span
            key={`${tool}-${index}`}
            className="tool-tag tool-tag-random"
            style={{ backgroundColor: bg }}
          >
            {tool}
          </span>
        );
      })}
    </div>
  );
}


