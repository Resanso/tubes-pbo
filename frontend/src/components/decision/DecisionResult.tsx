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
        <span className="result-icon">{isBeli ? '✓' : '✗'}</span>
        <h3 className="result-label">{isBeli ? 'BELI' : 'NABUNG DULU'}</h3>
      </div>

      <div className="result-details">
        <div className="result-row">
          <span className="result-key">Regret Score</span>
          {/* Skor penyesalan: semakin tinggi, semakin disarankan beli */}
          <span className="result-val">{result.regretScore.toFixed(1)}</span>
        </div>

        <div className="result-row">
          <span className="result-key">Sisa Saldo</span>
          {/* Saldo yang tersisa jika item dibeli */}
          <span className="result-val">{formatRupiah(result.remainingBalance)}</span>
        </div>

        <div className="result-row">
          <span className="result-key">Saran</span>
          <span className="result-val">{result.advice}</span>
        </div>
      </div>

      {/* Jika keputusan NABUNG, tampilkan rencana tabungan */}
      {!isBeli && result.savingsPlan && (
        <SavingsPlanCard plan={result.savingsPlan} />
      )}
    </div>
  );
};

export default DecisionResult;
