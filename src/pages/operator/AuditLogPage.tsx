import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { KeyValueRow } from '../../components/common/KeyValueRow';
import { INITIAL_AUDIT_LOG } from '../../data/system';

export const AuditLogPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="SAAS OPERATOR"
        title="Audit log"
        subtitle="Immutable security trail recording every automated AI route, operator event, and desk action."
      />

      <div className="reach-card" style={{ padding: '1.5rem', gap: '1.25rem' }}>
        <div className="key-value-list" style={{ padding: 0 }}>
          {INITIAL_AUDIT_LOG.map((log) => (
            <KeyValueRow
              key={log.id}
              label={
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, color: 'var(--reach-brand)' }}>
                    {log.time}
                  </span>
                  <span style={{ color: 'var(--reach-text-secondary)', fontWeight: 600 }}>
                    — {log.actor}
                  </span>
                </div>
              }
              value={
                <span style={{ fontWeight: 600, color: 'var(--reach-text-primary)' }}>
                  {log.action}
                </span>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
