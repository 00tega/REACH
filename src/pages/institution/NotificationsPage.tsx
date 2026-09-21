import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { KeyValueRow } from '../../components/common/KeyValueRow';
import { INITIAL_NOTIFICATIONS } from '../../data/institutions';
import { useApp } from '../../context/AppContext';

export const NotificationsPage: React.FC = () => {
  const { institutions } = useApp();
  const currentInstitution = institutions[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="Institution - Greenfield Estate"
        tag={currentInstitution.code}
        title="Notifications"
        subtitle="System alerts, maintenance windows, and billing communications from REACH core."
      />

      <div className="reach-card" style={{ padding: '1.5rem' }}>
        <div className="key-value-list" style={{ padding: 0 }}>
          {INITIAL_NOTIFICATIONS.map((item) => (
            <KeyValueRow
              key={item.id}
              label={
                <span style={{ fontWeight: 600, color: 'var(--reach-text-secondary)' }}>
                  {item.date}
                </span>
              }
              value={
                <span style={{ fontWeight: 700, color: 'var(--reach-text-primary)' }}>
                  {item.text}
                </span>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
