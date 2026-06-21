import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDecisionHistory } from '@/hooks/useDecision';
import { formatRupiah } from '@/utils/format.utils';
import { Loader2, AlertTriangle, Inbox, CalendarDays, Lightbulb, Check, X } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const { customer } = useAuth();
  const { data: history, isLoading, isError } = useDecisionHistory(customer?.id ?? 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Riwayat Keputusan</h2>
        <p className="page-subtitle">Rekap semua keputusan beli vs nabung yang pernah kamu buat</p>
      </div>

      {isLoading && (
        <div className="history-empty">
          <span className="history-empty-icon"><Loader2 size={40} className="animate-spin" /></span>
          <p className="text-muted">Memuat riwayat...</p>
        </div>
      )}

      {isError && (
        <div className="history-empty">
          <span className="history-empty-icon"><AlertTriangle size={40} /></span>
          <p className="text-error">Gagal memuat riwayat. Coba lagi nanti.</p>
        </div>
      )}

      {!isLoading && !isError && history?.length === 0 && (
        <div className="history-empty">
          <span className="history-empty-icon"><Inbox size={40} /></span>
          <p className="text-muted">Belum ada riwayat keputusan.</p>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Coba evaluasi item di halaman Beli vs Nabung.
          </p>
        </div>
      )}

      <div className="history-list">
        {history?.map((h, index) => {
          const isBeli = (h.purchaseDecision?.decisionStatus ?? h.result) === 'BELI';
          const status = h.purchaseDecision?.decisionStatus ?? h.result;
          const balancePositive = (h.purchaseDecision?.remainingBalance ?? 0) >= 0;

          return (
            <div key={h.id} className={`history-card ${isBeli ? 'history-beli' : 'history-nabung'}`}>

              {/* Header: nomor urut, tanggal, badge status */}
              <div className="history-card-header">
                <div className="history-meta">
                  <span className="history-index">#{index + 1}</span>
                  <span className="history-date">
                    <CalendarDays size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                    {h.decisionDate}
                  </span>
                </div>
                <span className={`history-badge ${isBeli ? 'badge-beli' : 'badge-nabung'}`}>
                  {isBeli
                    ? <Check size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} />
                    : <X size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} />
                  }
                  {status}
                </span>
              </div>

              {/* Stats: regret score + sisa saldo */}
              {h.purchaseDecision && (
                <div className="history-stats">
                  <div className="history-stat">
                    <span className="history-stat-label">Regret Score</span>
                    <span className={`history-stat-value ${isBeli ? 'value-success' : 'value-danger'}`}>
                      {h.purchaseDecision.regretScore?.toFixed(1)}
                      <span className="history-stat-unit"> / 100</span>
                    </span>
                  </div>
                  <div className="history-stat-divider" />
                  <div className="history-stat">
                    <span className="history-stat-label">Sisa Saldo</span>
                    <span className={`history-stat-value ${balancePositive ? 'value-success' : 'value-danger'}`}>
                      {formatRupiah(h.purchaseDecision.remainingBalance)}
                    </span>
                  </div>
                </div>
              )}

              {/* Saran */}
              {h.purchaseDecision?.advice && (
                <div className="history-advice">
                  <span className="history-advice-icon"><Lightbulb size={16} /></span>
                  <p className="history-advice-text">{h.purchaseDecision.advice}</p>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPage;
