import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { StatCard } from '../../components/common/StatCard';

export const RelayHealthPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="SAAS OPERATOR"
        title="Relay health"
        subtitle="Store-and-forward path for offline mesh devices and intermittent cellular conditions."
      />

      {/* Relay Stats */}
      <div className="stat-card-grid">
        <StatCard label="Ingest" value="Okay" compact />
        <StatCard label="Queued" value={0} />
        <StatCard label="Avg Hops" value="-" />
      </div>

      {/* Recent Relay Packets Container */}
      <div className="reach-card" style={{ padding: '1.5rem', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, borderBottom: '1px solid var(--reach-border-solid)', paddingBottom: '0.75rem' }}>
          Recent relay packets
        </h2>
        <p style={{ color: 'var(--reach-text-secondary)', fontWeight: 600 }}>
          No relay packets yet — run Resident → Relay path.
        </p>
      </div>
    </div>
  );
};
