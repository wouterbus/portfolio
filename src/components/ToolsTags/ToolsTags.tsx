import './ToolsTags.css';

type ThemeMode = 'auto' | 'light' | 'dark' | 'goofy';

interface ToolsTagsProps {
  tools: string[];
  className?: string;
  theme?: ThemeMode;
  max?: number;
}

// Stable color generator based on tool name (copied from page usage)
const getStableToolColors = (tools: string[]) => {
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1',
    '#14b8a6', '#f43f5e', '#8b5a2b', '#1e40af', '#059669'
  ];

  const darkColors = [
    '#1d4ed8', '#047857', '#d97706', '#dc2626', '#7c3aed',
    '#0891b2', '#ea580c', '#65a30d', '#db2777', '#4f46e5',
    '#0F766E', '#e11d48', '#92400e', '#1e3a8a', '#065f46'
  ];

  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32-bit int
    }
    return Math.abs(hash);
  };

  const assignedLight: string[] = [];
  const assignedDark: string[] = [];

  for (let i = 0; i < tools.length; i++) {
    const seed = hashString(tools[i].toLowerCase());
    let li = seed % colors.length;
    let di = seed % darkColors.length;

    if (i > 0 && colors[li] === assignedLight[i - 1]) {
      for (let j = 0; j < colors.length; j++) {
        const t = (seed + j) % colors.length;
        if (colors[t] !== assignedLight[i - 1]) { li = t; break; }
      }
    }

    if (i > 0 && darkColors[di] === assignedDark[i - 1]) {
      for (let j = 0; j < darkColors.length; j++) {
        const t = (seed + j) % darkColors.length;
        if (darkColors[t] !== assignedDark[i - 1]) { di = t; break; }
      }
    }

    assignedLight.push(colors[li]);
    assignedDark.push(darkColors[di]);
  }

  return tools.map((_, idx) => ({ light: assignedLight[idx], dark: assignedDark[idx] }));
};

export default function ToolsTags({ tools, className, theme = 'auto', max }: ToolsTagsProps) {
  const list = max ? tools.slice(0, max) : tools;
  const colors = getStableToolColors(list);

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


