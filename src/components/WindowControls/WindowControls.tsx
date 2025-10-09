import './WindowControls.css';

interface WindowControlsProps {
  onExpand?: () => void;
}

export default function WindowControls({
  onExpand
}: WindowControlsProps) {
  return (
    <div className="window-controls">
      <button
        className="window-control expand"
        onClick={onExpand}
        title="Expand"
      >
        <span className="control-icon expand-icon">
          ⧈
        </span>
      </button>
    </div>
  );
}
