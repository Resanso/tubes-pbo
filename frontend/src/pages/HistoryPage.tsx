import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDecisionHistory } from '@/hooks/useDecision';
import { formatDate } from '@/utils/format.utils';

const HistoryPage: React.FC = () => {
  const { customer } = useAuth();
  const customerId = customer?.id ?? 0;

  const { data: history, isLoading } = useDecisionHistory(customerId);

  if (isLoading) {
    return <div>Memuat...</div>;
  }

  if (!history || history.length === 0) {
    return <div>Belum ada riwayat</div>;
  }

  return (
    <div>
      <h1>Riwayat Keputusan</h1>
      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Hasil Keputusan</th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => (
            <tr key={entry.id}>
              <td>{formatDate(entry.decisionDate)}</td>
              <td>{entry.purchaseDecision?.decisionStatus ?? entry.result}</td>
              <td>{entry.purchaseDecision?.advice ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;