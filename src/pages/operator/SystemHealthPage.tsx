import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { KeyValueRow } from '../../components/common/KeyValueRow';
import { Badge } from '../../components/common/Badge';
import { INITIAL_SYSTEM_HEALTH } from '../../data/system';

export const SystemHealthPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="SAAS OPERATOR"
        title="System health"
        subtitle="Infrastructure uptime, microservice availability, and ingestion pipeline diagnostics."
      />

      <div className="reach-card" style={{ padding: '1.5rem', gap: '1.25rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, borderBottom: '2px solid var(--reach-border-solid)', paddingBottom: '0.75rem' }}>
          Subsystem Status
        </h2>
        <div className="key-value-list" style={{ padding: 0 }}>
          {INITIAL_SYSTEM_HEALTH.map((item) => (
            <KeyValueRow
              key={item.id}
              label={<span style={{ fontWeight: 700 }}>{item.service}</span>}
              value={
                <Badge
                  variant={
                    item.status === 'Healthy'
                      ? 'healthy'
                      : item.status === 'Degraded'
                      ? 'grace'
                      : 'unhealthy'
                  }
                >
                  {item.status}
                </Badge>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
