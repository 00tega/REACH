import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { StatCard } from '../../components/common/StatCard';
import { KeyValueRow } from '../../components/common/KeyValueRow';
import { useApp } from '../../context/AppContext';

export const OverviewPage: React.FC = () => {
  const { institutions, incidents } = useApp();
  const currentInstitution = institutions[0]; // Greenfield Estate
  const openCount = incidents.filter((i) => i.status !== 'Resolved').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="Institution - Greenfield Estate"
        tag={currentInstitution.code}
        title="Overview"
        subtitle="One plan. AI routes to your desk. Members never pay."
      />

      {/* Metric Cards Grid */}
      <div className="stat-card-grid">
        <StatCard label="Plan" value={currentInstitution.plan} compact />
        <StatCard label="Status" value={currentInstitution.status} compact />
        <StatCard label="Open" value={openCount} />
        <StatCard label="Residents" value={currentInstitution.residentsCount} />
        <StatCard label="Staffs" value={currentInstitution.staffCount} />
        <StatCard label="Security" value={currentInstitution.securityCount} />
        <StatCard label="Total Coverage" value={currentInstitution.coverageCount} />
      </div>

      {/* Desktop 2-Column Cards Grid */}
      <div className="desktop-two-col">
        {/* Subscription Summary Card */}
        <div className="reach-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Subscription
          </h2>
          <div className="key-value-list" style={{ padding: 0 }}>
            <KeyValueRow
              label="Subscription"
              value={
                <span style={{ color: 'var(--status-success-text)', fontWeight: 700 }}>
                  {currentInstitution.status}
                </span>
              }
            />
            <KeyValueRow label="Plan" value={currentInstitution.plan} />
            <KeyValueRow label="Next Charge" value={currentInstitution.nextCharge} />
            <KeyValueRow label="Payment API" value={currentInstitution.paymentApi} />
          </div>
        </div>

        {/* Security Desk Operational Status Card */}
        <div className="reach-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Security Desk
          </h2>
          <div className="key-value-list" style={{ padding: 0 }}>
            <KeyValueRow
              label="Status"
              value={
                <span style={{ color: 'var(--status-success-text)', fontWeight: 700 }}>
                  Online - Ai Auto-push On
                </span>
              }
            />
            <KeyValueRow label="Relay" value="Accepting Uplinks" />
            <KeyValueRow label="Lead" value="Amadi Okonkwo" />
          </div>
        </div>
      </div>
    </div>
  );
};
