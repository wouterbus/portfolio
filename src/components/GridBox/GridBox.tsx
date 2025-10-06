import React, { useState } from 'react';
import './GridBox.css';

interface GridBoxProps {
  item: {
    id: string;
    number?: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function GridBox({ item, onSectionChange }: GridBoxProps) {
  const [squareColors, setSquareColors] = useState<{ [key: number]: string }>(() => {
    // Initialize with border pattern
    const initialColors: { [key: number]: string } = {};
    for (let i = 0; i < 64; i++) {
      const row = Math.floor(i / 8);
      const col = i % 8;
      // Border pattern: accent color on edges, default color in center
      if (row === 0 || row === 7 || col === 0 || col === 7) {
        initialColors[i] = 'var(--accent)'; // Dynamic accent color for border
      } else {
        initialColors[i] = 'var(--bg-tertiary)'; // Default color for center
      }
    }
    return initialColors;
  });
  const [bouncingSquares, setBouncingSquares] = useState<number[]>([]);

  const handleSquareClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Get current color and toggle to the other one
    const currentColor = squareColors[index];
    const newColor = currentColor === 'var(--accent)' ? 'var(--bg-tertiary)' : 'var(--accent)';
    
    // Set new color immediately
    setSquareColors(prev => ({
      ...prev,
      [index]: newColor
    }));
    
    // Add bounce animation immediately after
    setBouncingSquares(prev => [...prev, index]);

    // Remove bounce animation after 600ms
    setTimeout(() => {
      setBouncingSquares(prev => prev.filter(i => i !== index));
    }, 600);
  };

  const renderGrid = () => {
    const squares = [];
    for (let i = 0; i < 64; i++) { // 8x8 = 64 squares
      const isBouncing = bouncingSquares.includes(i);
      const squareColor = squareColors[i];

      squares.push(
        <div
          key={i}
          className={`grid-square ${isBouncing ? 'bouncing' : ''}`}
          style={{ backgroundColor: squareColor }}
          onClick={(e) => handleSquareClick(i, e)}
        />
      );
    }
    return squares;
  };

  return (
    <div
      key={item.id}
      className="grid-box pixel-grid-box"
      onClick={() => onSectionChange('Grid')}
    >
      <div className="pixel-grid-container">
        <div className="pixel-grid">
          {renderGrid()}
        </div>
      </div>
    </div>
  );
}
