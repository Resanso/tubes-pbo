import React from 'react';
import type { SavingsPlan } from '@/types/decision.types';
import { formatRupiah } from '@/utils/format.utils';

// Modul 10: Komponen UI yang menerima props (seperti parameter fungsi di JavaScript)
interface Props {
  plan: SavingsPlan;
}

const SavingsPlanCard: React.FC<Props> = ({ plan }) => {
  const monthlySavings = plan.targetAmount / plan.duration;

  return (
    <div className="card-glass fade-in-up" style={{ padding: '16px 20px' }}>
      <div className="savings-plan-inner">
        <div className="savings-plan-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-nabung)',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="8" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Rencana Menabung</div>
          </div>
          <span className="badge badge-nabung">{plan.duration} Bulan</span>
        </div>

        <div>
          <div className="savings-plan-detail" style={{ marginBottom: '4px' }}>
            Target Tabungan:
          </div>
          <div className="savings-plan-value">{formatRupiah(plan.targetAmount)}</div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-glass)',
            paddingTop: '10px',
            marginTop: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Estimasi / bulan:
            </div>
            <div style={{ fontWeight: 700, color: 'var(--color-nabung)', fontSize: '1rem' }}>
              {formatRupiah(monthlySavings)}
            </div>
          </div>
        </div>

        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            marginTop: '2px',
          }}
        >
          {plan.result}
        </p>
      </div>
    </div>
  );
};

export default SavingsPlanCard;
