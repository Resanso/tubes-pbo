import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useEvaluate } from '@/hooks/useDecision';
import { itemApi } from '@/api/item.api';
import { formatRupiah } from '@/utils/format.utils';
import DecisionResult from '@/components/decision/DecisionResult';
import type { DecisionResponse } from '@/types/decision.types';

// Modul 10-11: MVC — Page ini berperan sebagai Controller di sisi frontend
// Mengambil data dari backend (Model) dan menampilkannya lewat komponen (View)
const DecisionPage: React.FC = () => {
  // Ambil data customer yang sedang login (Modul 14: Session)
  const { customer } = useAuth();

  // Modul 10: JavaScript — variabel state untuk menyimpan pilihan user dan hasil keputusan
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [result, setResult] = useState<DecisionResponse | null>(null);

  // Ambil semua item dari backend (Modul 12: JDBC Read → REST API → React Query)
  const { data: items, isLoading: itemsLoading } = useQuery({
    queryKey: ['items'],
    queryFn: itemApi.getAll,
  });

  // Hook untuk memanggil POST /api/decisions (evaluasi keputusan BELI atau NABUNG)
  const { mutate: evaluate, isPending, isError } = useEvaluate();

  const handleEvaluasi = () => {
    if (!customer) {
      alert('Sesi habis, silakan login ulang.');
      return;
    }
    if (!selectedItemId) return;

    // Kirim customerId dan itemId ke backend untuk mendapatkan rekomendasi
    evaluate(
      { customerId: customer.id, itemId: selectedItemId },
      {
        onSuccess: (data) => {
          // Simpan hasil keputusan untuk ditampilkan di DecisionResult
          setResult(data);
        },
      }
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Mending Beli atau Nabung?</h2>
        {customer && (
          <p className="page-subtitle">
            Saldo kamu: <strong>{formatRupiah(customer.balance)}</strong>
          </p>
        )}
      </div>

      <div className="decision-form">
        <label className="form-label">Pilih Item yang Ingin Dievaluasi</label>

        {/* Tampilkan loading saat item sedang dimuat */}
        {itemsLoading && <p className="text-muted">Memuat daftar item...</p>}

        {/* Daftar item dalam bentuk cards yang bisa dipilih */}
        {!itemsLoading && items && (
          <div className="item-list">
            {items.length === 0 && (
              <p className="text-muted">Belum ada item tersedia.</p>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                className={`item-option ${selectedItemId === item.id ? 'selected' : ''}`}
                onClick={() => {
                  // Pilih item dan reset hasil sebelumnya
                  setSelectedItemId(item.id);
                  setResult(null);
                }}
              >
                <div className="item-option-info">
                  <span className="item-option-name">{item.name}</span>
                  <span className="item-option-meta">
                    {formatRupiah(item.price)} · {item.priorityLabel} · Urgensi {item.urgency}/5
                  </span>
                </div>
                {selectedItemId === item.id && (
                  <span className="item-check">✓</span>
                )}
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-error">Gagal mendapatkan rekomendasi. Coba lagi.</p>
        )}

        {/* Tombol evaluasi aktif hanya saat item sudah dipilih */}
        <button
          className="btn-primary"
          onClick={handleEvaluasi}
          disabled={!selectedItemId || isPending}
        >
          {isPending ? 'Menganalisis...' : 'Evaluasi Keputusan'}
        </button>
      </div>

      {/* Tampilkan hasil keputusan menggunakan komponen DecisionResult */}
      {result && <DecisionResult result={result} />}
    </div>
  );
};

export default DecisionPage;
