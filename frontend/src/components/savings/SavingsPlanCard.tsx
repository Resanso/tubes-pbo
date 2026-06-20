import React from 'react';
import type { SavingsPlan } from '@/types/decision.types';
import { formatRupiah } from '@/utils/format.utils';

// Modul 10: Komponen UI yang menerima props (seperti parameter fungsi di JavaScript)
interface Props {
  plan: SavingsPlan;
}

const SavingsPlanCard: React.FC<Props> = ({ plan }) => {
  // Hitung nabung per bulan = targetAmount / duration (sama seperti hitungSimulasi() di Savings.java)
  const perBulan = plan.targetAmount / plan.duration;

  return (
    <div className="savings-card">
      <h4 className="savings-title">Rencana Nabung</h4>

      <div className="savings-grid">
        <div className="savings-item">
          <span className="savings-label">Target</span>
          {/* Tampilkan target dalam format Rupiah */}
          <span className="savings-value">{formatRupiah(plan.targetAmount)}</span>
        </div>

        <div className="savings-item">
          <span className="savings-label">Durasi</span>
          <span className="savings-value">{plan.duration} bulan</span>
        </div>

        <div className="savings-item">
          <span className="savings-label">Nabung / Bulan</span>
          {/* Hasil pembagian: targetAmount dibagi durasi */}
          <span className="savings-value highlight">{formatRupiah(perBulan)}</span>
        </div>
      </div>

      {plan.result && (
        <p className="savings-result">{plan.result}</p>
      )}
    </div>
  );
};

export default SavingsPlanCard;
