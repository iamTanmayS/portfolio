import React from 'react';
import './GlassIcons.css';

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
  onClick?: () => void;
  href?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const gradientMapping: Record<string, string> = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))',
  pink: 'linear-gradient(hsl(320, 90%, 50%), hsl(305, 90%, 50%))',
  cyan: 'linear-gradient(hsl(180, 90%, 40%), hsl(165, 90%, 40%))',
};

export const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  const renderContent = (item: GlassIconsItem) => (
    <>
      <span className="icon-btn__back" style={getBackgroundStyle(item.color)}></span>
      <span className="icon-btn__front">
        <span className="icon-btn__icon" aria-hidden="true">
          {item.icon}
        </span>
      </span>
      <span className="icon-btn__label">{item.label}</span>
    </>
  );

  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => {
        if (item.href) {
            return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`icon-btn ${item.customClass || ''}`}
                  aria-label={item.label}
                  onClick={item.onClick}
                >
                  {renderContent(item)}
                </a>
            );
        }
        return (
            <button 
                key={index} 
                type="button" 
                className={`icon-btn ${item.customClass || ''}`} 
                aria-label={item.label}
                onClick={item.onClick}
            >
             {renderContent(item)}
            </button>
        );
      })}
    </div>
  );
};
