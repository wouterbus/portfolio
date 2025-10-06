import './WindowControls.css';

interface WindowControlsProps {
  onExpand?: () => void;
  isFullscreen?: boolean;
}

export default function WindowControls({ 
  onExpand, 
  isFullscreen = false 
}: WindowControlsProps) {
  return (
    <div className="window-controls">
      <button 
        className={`window-control expand ${isFullscreen ? 'fullscreen' : ''}`} 
        onClick={onExpand}
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        <span className="control-icon expand-icon">
          {isFullscreen ? '⧉' : '⧈'}
        </span>
      </button>
    </div>
  );
}
