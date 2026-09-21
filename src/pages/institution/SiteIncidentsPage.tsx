import React from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { IncidentCard } from '../../components/incidents/IncidentCard';
import { useApp } from '../../context/AppContext';

export const SiteIncidentsPage: React.FC = () => {
  const { incidents, institutions } = useApp();
  const currentInstitution = institutions[0];

  // Incidents for this institution (e.g. Block 24, Block C, East Gate)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="Institution - Greenfield Estate"
        tag={currentInstitution.code}
        title="Site Incidents"
        subtitle="All emergencies and incidents reported or routed within Greenfield Estate boundary."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
};
