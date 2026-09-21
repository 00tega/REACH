import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { StatCard } from '../../components/common/StatCard';
import { KeyValueRow } from '../../components/common/KeyValueRow';
import { INITIAL_AI_DECISIONS } from '../../data/system';

export const AiPerformancePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="SAAS OPERATOR"
        title="AI Performance"
        subtitle="Read-only model telemetry. Routing decisions are executed autonomously from AI → desk."
      />

      {/* AI Telemetry Stats */}
      <div className="stat-card-grid">
        <StatCard label="Pack" value="1.4.1" compact />
        <StatCard label="Auto-push rate" value="100%" compact />
        <StatCard label="Avg conf" value="0.74" compact />
      </div>

      {/* Desktop 2-Column Grid */}
      <div className="desktop-two-col">
        {/* Routing Rules Card */}
        <div className="reach-card" style={{ padding: '1.5rem', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Routing rules</h2>
          <div className="key-value-list" style={{ padding: 0 }}>
            <div style={{ borderBottom: '1px solid var(--reach-border-solid)', paddingBottom: '0.75rem' }}>
              <p style={{ fontWeight: 600, color: 'var(--reach-text-primary)' }}>
                High conf + audio + visual → auto-push to security desk with evidence.
              </p>
            </div>
            <div style={{ borderBottom: '1px solid var(--reach-border-solid)', paddingBottom: '0.75rem' }}>
              <p style={{ fontWeight: 600, color: 'var(--reach-text-primary)' }}>
                Lower conf / SMS-only → VERIFYING on desk (call/confirm).
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--reach-text-primary)' }}>
                Operator does not approve AI outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Decisions Card */}
        <div className="reach-card" style={{ padding: '1.5rem', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Recent decisions</h2>
          <div className="key-value-list" style={{ padding: 0 }}>
            {INITIAL_AI_DECISIONS.map((dec) => (
              <KeyValueRow
                key={dec.id}
                label={<span style={{ fontWeight: 800, color: 'var(--reach-brand)' }}>{dec.code}</span>}
                value={<span style={{ fontWeight: 600 }}>{dec.description}</span>}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
