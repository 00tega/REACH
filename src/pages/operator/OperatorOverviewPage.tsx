import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { StatCard } from '../../components/common/StatCard';
import { KeyValueRow } from '../../components/common/KeyValueRow';
import { INITIAL_LIVE_FEED } from '../../data/system';
import { useApp } from '../../context/AppContext';

export const OperatorOverviewPage: React.FC = () => {
  const { incidents, institutions } = useApp();
  const openCount = incidents.filter((i) => i.status !== 'Resolved').length;
  const graceCount = institutions.filter((i) => i.status === 'Grace').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="SAAS OPERATOR"
        title="Platform Overview"
        subtitle="Watch institutions and health. AI routes to desks — you do not approve emergencies."
      />

      {/* Operator Stat Cards */}
      <div className="stat-card-grid">
        <StatCard label="Institutions (Grace)" value={`18 (${graceCount})`} />
        <StatCard label="Open" value={openCount} />
        <StatCard label="Desks online" value={16} />
      </div>

      {/* Live Feed Container */}
      <div className="reach-card" style={{ padding: '1.5rem', gap: '1.25rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Live Feed</h2>
        <div className="key-value-list" style={{ padding: 0 }}>
          {INITIAL_LIVE_FEED.map((feed) => (
            <KeyValueRow
              key={feed.id}
              label={
                <span style={{ fontWeight: 700, color: 'var(--reach-brand)' }}>
                  {feed.time}
                </span>
              }
              value={
                <span style={{ fontWeight: 600, color: 'var(--reach-text-primary)' }}>
                  {feed.message}
                </span>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
