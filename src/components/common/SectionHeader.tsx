import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  tag,
  title,
  subtitle,
  actions,
  className = '',
}) => {
  return (
    <div className={`page-intro ${className}`}>
      {(eyebrow || tag) && (
        <div className="page-intro__eyebrow">
          {eyebrow && <span>{eyebrow}</span>}
          {tag && <span className="page-intro__tag">{tag}</span>}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div className="page-intro__title-group">
          <h1 className="page-intro__title">{title}</h1>
          {subtitle && <p className="page-intro__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="page-intro__actions">{actions}</div>}
      </div>
    </div>
  );
};
