import React, { useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { MediaChips } from '../../components/incidents/MediaChips';
import { Modal } from '../../components/common/Modal';
import { useApp } from '../../context/AppContext';
import { Phone, CheckCircle, ShieldAlert, ArrowRight } from 'lucide-react';

export const ResponseDeskPage: React.FC = () => {
  const { incidents, updateIncidentStatus } = useApp();
  
  // Choose the active incident for response desk triage (first non-resolved or fallback)
  const activeIncident =
    incidents.find((inc) => inc.status !== 'Resolved') || incidents[0];

  const [callModalOpen, setCallModalOpen] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleAction = (status: typeof activeIncident.status, message: string) => {
    updateIncidentStatus(activeIncident.id, status);
    setActionFeedback(message);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="Security Desk -Zone C"
        title="Response Desk"
        subtitle="Review real-time AI telemetry, inspect evidence clips, confirm dispatch or mobilize responders."
      />

      {actionFeedback && (
        <div
          style={{
            background: 'var(--status-success-bg)',
            color: 'var(--status-success-text)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--reach-radius-md)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <CheckCircle size={20} />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Main Response Desk Card */}
      <div className="reach-card" style={{ gap: '1.75rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ color: 'var(--reach-text-secondary)', fontWeight: 600 }}>
              {activeIncident.code}
            </p>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: 'var(--reach-text-primary)',
              }}
            >
              {activeIncident.type}
            </h2>
            <p
              style={{
                fontFamily: 'monospace',
                color: 'var(--reach-text-secondary)',
                fontSize: '0.95rem',
              }}
            >
              AI {activeIncident.status.toUpperCase()} - {activeIncident.aiDetails.channel} - conf{' '}
              {activeIncident.aiDetails.confidence} - {activeIncident.aiDetails.fpCode}
            </p>

            {/* Evidence Chips */}
            <div style={{ marginTop: '0.5rem' }}>
              <MediaChips evidence={activeIncident.evidence} />
            </div>
          </div>

          <Badge
            variant={
              activeIncident.status === 'Verifying'
                ? 'verifying'
                : activeIncident.status === 'Responding'
                ? 'responding'
                : activeIncident.status === 'On Scene'
                ? 'success'
                : 'resolved'
            }
          >
            {activeIncident.status}
          </Badge>
        </div>

        {/* Action Controls */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--reach-border-card)',
          }}
        >
          <Button
            variant="dark"
            onClick={() => handleAction('Resolved', `Incident ${activeIncident.code} marked as Resolved.`)}
          >
            Resolve
          </Button>
          <Button
            variant="dark"
            onClick={() => setCallModalOpen(true)}
          >
            <Phone size={16} />
            Call to confirm
          </Button>
          <Button
            variant="dark"
            onClick={() => handleAction('Responding', `Incident ${activeIncident.code} accepted - Responders mobilized.`)}
          >
            <ShieldAlert size={16} />
            Accept - Mobilize
          </Button>
          <Button
            variant="dark"
            onClick={() => handleAction('On Scene', `Incident ${activeIncident.code} updated: Team On Scene.`)}
          >
            <ArrowRight size={16} />
            On scene
          </Button>
        </div>
      </div>

      {/* Call Confirmation Dialog Modal */}
      <Modal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        title="Call Reporter to Confirm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setCallModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setCallModalOpen(false);
                handleAction('Responding', 'Call placed to reporter. Emergency verified and responders dispatched.');
              }}
            >
              Start Call
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ color: 'var(--reach-text-secondary)', lineHeight: 1.5 }}>
            You are connecting to the reporter for <strong>{activeIncident.type}</strong> via secure VoIP relay.
          </p>
          <div
            style={{
              background: 'var(--reach-bg-card)',
              padding: '1rem',
              borderRadius: 'var(--reach-radius-md)',
              fontSize: '0.9rem',
            }}
          >
            <p><strong>Reporter:</strong> Resident Contact (Apt 4B)</p>
            <p><strong>Channel:</strong> Direct Audio Mesh Uplink</p>
            <p><strong>Estimated Response ETA:</strong> 3 mins</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
