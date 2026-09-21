import React, { useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { KeyValueRow } from '../../components/common/KeyValueRow';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useApp } from '../../context/AppContext';
import { CreditCard, CheckCircle } from 'lucide-react';

export const BillingPlanPage: React.FC = () => {
  const { institutions, paymentHistory, recordPayment } = useApp();
  const currentInstitution = institutions[0];
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePay = () => {
    recordPayment('$1,450.00');
    setPayModalOpen(false);
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SectionHeader
        eyebrow="Institution - Greenfield Estate"
        tag={currentInstitution.code}
        title="Billing and Plan"
        subtitle="Manage subscription tier, direct payment methods, and historical invoices."
      />

      {paymentSuccess && (
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
          <span>Payment of $1,450.00 processed successfully. Invoiced under REACH Full Plan.</span>
        </div>
      )}

      {/* Desktop 2-Column Grid */}
      <div className="desktop-two-col">
        {/* Subscription Detail Card */}
        <div className="reach-card" style={{ padding: '1.5rem', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Subscription Plan</h2>
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
            <KeyValueRow label="Grace Period" value={currentInstitution.gracePeriod} />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
            <Button variant="primary" onClick={() => setPayModalOpen(true)}>
              <CreditCard size={16} />
              Pay Now
            </Button>
            <Button variant="ghost" onClick={() => alert('Payment method updated to corporate card ending in 4102.')}>
              Update Payment Method
            </Button>
          </div>
        </div>

        {/* Payment History Card */}
        <div className="reach-card" style={{ padding: '1.5rem', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Payment History</h2>
          <div className="key-value-list" style={{ padding: 0 }}>
            {paymentHistory.map((item) => (
              <KeyValueRow
                key={item.id}
                label={`${item.date} - ${item.code}`}
                value={
                  <span style={{ color: 'var(--status-success-text)', fontWeight: 700 }}>
                    {item.status}
                  </span>
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pay Now Modal */}
      <Modal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        title="Confirm Payment"
        footer={
          <>
            <Button variant="ghost" onClick={() => setPayModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePay}>
              Confirm $1,450.00 Payment
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ color: 'var(--reach-text-secondary)', lineHeight: 1.5 }}>
            You are about to charge the default institutional payment method for{' '}
            <strong>Greenfield Estate ({currentInstitution.code})</strong>.
          </p>
          <div
            style={{
              background: 'var(--reach-bg-card)',
              padding: '1rem',
              borderRadius: 'var(--reach-radius-md)',
              fontSize: '0.9rem',
            }}
          >
            <p><strong>Plan:</strong> REACH Full Institutional Tier</p>
            <p><strong>Covered Members:</strong> {currentInstitution.coverageCount} residents & staff</p>
            <p><strong>Total Amount:</strong> $1,450.00 / month</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
