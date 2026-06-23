import React from 'react';
import type { DecisionResponse } from '@/types/decision.types';
import { formatRupiah } from '@/utils/format.utils';
import SavingsPlanCard from '@/components/savings/SavingsPlanCard';

// Modul 10: Komponen UI — menerima result dari backend sebagai props dan menampilkannya
interface Props {
  result: DecisionResponse;
}

const DecisionResult: React.FC<Props> = ({ result }) => {
  // Cek status dari PurchaseDecision.DecisionStatus (BELI / NABUNG)
  const isBeli = result.decisionStatus === 'BELI';

  return (
    <div className={`decision-result ${isBeli ? 'result-beli' : 'result-nabung'}`}>
      {/* Status utama: BELI (hijau) atau NABUNG (merah) */}
      <div className="result-status">
        <span
          className="result-icon"
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isBeli ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 113, 133, 0.15)',
            color: isBeli ? 'var(--color-beli)' : 'var(--color-rejected)',
            fontSize: '1.5rem',
          }}
        >
          {isBeli ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </span>
        <div>
          <h3 className="result-label" style={{ margin: 0 }}>{isBeli ? 'BELI' : 'NABUNG DULU'}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            {isBeli
              ? 'Saran kami: barang ini layak dibeli sekarang!'
              : 'Saran kami: sebaiknya ditabung dulu.'}
          </p>
        </div>
      </div>

      <div className="result-details">
        <div className="result-row">
          <span className="result-key">Regret Score</span>
          {/* Skor penyesalan: semakin tinggi, semakin disarankan beli */}
          <span className="result-val" style={{ color: isBeli ? 'var(--color-beli)' : 'var(--color-rejected)' }}>
            {result.regretScore.toFixed(1)}
            <span style={{ fontSize: '0.75rem', opacity: 0.6 }}> / 100</span>
          </span>
        </div>

        <div className="result-row">
          <span className="result-key">Sisa Saldo (jika dibeli)</span>
          {/* Saldo yang tersisa jika item dibeli */}
          <span className="result-val" style={{ color: result.remainingBalance >= 0 ? 'var(--color-beli)' : 'var(--color-rejected)' }}>
            {formatRupiah(result.remainingBalance)}
          </span>
        </div>

        <div className="result-row" style={{ borderBottom: 'none' }}>
          <span className="result-key">Saran</span>
          <span className="result-val" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
            {result.advice}
          </span>
        </div>
      </div>

      {/* Jika keputusan NABUNG, tampilkan rencana tabungan */}
      {!isBeli && result.savingsPlan && (
        <div style={{ marginTop: '1rem' }}>
          <SavingsPlanCard plan={result.savingsPlan} />
        </div>
      )}
    </div>
  );
};

export default DecisionResult;
