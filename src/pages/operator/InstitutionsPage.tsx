import React, { useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { FilterPills } from '../../components/common/FilterPills';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../context/AppContext';

export const InstitutionsPage: React.FC = () => {
  const { institutions } = useApp();
  const [filter, setFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'Active', label: 'Active' },
    { id: 'Grace', label: 'Grace' },
    { id: 'Inactive', label: 'Inactive' },
  ];

  const filteredInstitutions = institutions.filter((inst) => {
    if (filter === 'all') return true;
    return inst.status === filter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="SAAS OPERATOR"
        title="Institutions"
        subtitle="Manage subscribed estates, campuses, and healthcare networks operating on REACH."
      />

      <FilterPills
        options={filterOptions}
        activeId={filter}
        onChange={setFilter}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredInstitutions.length === 0 ? (
          <div className="reach-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
            <p style={{ color: 'var(--reach-text-secondary)', fontWeight: 600 }}>
              No institutions with status "{filter}".
            </p>
          </div>
        ) : (
          filteredInstitutions.map((inst) => (
            <div
              key={inst.id}
              className="reach-card"
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <p style={{ color: 'var(--reach-text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
                  {inst.category}
                </p>
                <h2
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    color: 'var(--reach-text-primary)',
                  }}
                >
                  {inst.name}
                </h2>
                <p
                  style={{
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    color: 'var(--reach-text-secondary)',
                  }}
                >
                  {inst.plan.toUpperCase()}
                </p>
              </div>

              <Badge
                variant={
                  inst.status === 'Active'
                    ? 'active'
                    : inst.status === 'Grace'
                    ? 'grace'
                    : 'inactive'
                }
              >
                {inst.status}
              </Badge>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
