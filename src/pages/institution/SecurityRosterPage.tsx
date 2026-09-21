import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../context/AppContext';

export const SecurityRosterPage: React.FC = () => {
  const { staff, institutions } = useApp();
  const currentInstitution = institutions[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="Institution - Greenfield Estate"
        tag={currentInstitution.code}
        title="Security roster"
        subtitle="Security guards, responders, and shift supervisors deployed on estate grounds."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {staff.map((member) => (
          <div
            key={member.id}
            className="reach-card"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <p style={{ color: 'var(--reach-text-secondary)', fontSize: '0.95rem' }}>
                {member.role}
              </p>
              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: 'var(--reach-text-primary)',
                }}
              >
                {member.name}
              </p>
            </div>
            <Badge
              variant={
                member.status === 'On Duty'
                  ? 'on-duty'
                  : member.status === 'On Task'
                  ? 'responding'
                  : 'danger'
              }
            >
              {member.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
