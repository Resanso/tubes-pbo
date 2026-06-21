import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistApi, itemApi } from '@/api/item.api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatRupiah } from '@/utils/format.utils';
import { Loader2, ShoppingCart } from 'lucide-react';

const statusStyle: Record<string, { bg: string; text: string; border: string }> = {
  PENDING:   { bg: 'rgba(245,158,11,0.12)',  text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  APPROVED:  { bg: 'rgba(16,185,129,0.12)',  text: '#10b981', border: 'rgba(16,185,129,0.3)' },
  REJECTED:  { bg: 'rgba(239,68,68,0.12)',   text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  PURCHASED: { bg: 'rgba(45,212,191,0.12)',  text: '#2dd4bf', border: 'rgba(45,212,191,0.3)' },
};

const WishlistPage: React.FC = () => {
  const { customer } = useAuth();
  const queryClient = useQueryClient();
  const [selectedItemId, setSelectedItemId] = React.useState('');

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ['wishlist', customer?.id],
    queryFn: () => wishlistApi.getByCustomer(customer!.id),
    enabled: !!customer,
  });

  const { data: items } = useQuery({
    queryKey: ['items'],
    queryFn: itemApi.getAll,
  });

  const addMutation = useMutation({
    mutationFn: () => wishlistApi.add(customer!.id, Number(selectedItemId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      setSelectedItemId('');
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => wishlistApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Wishlist</h2>
        <p className="page-subtitle">Daftar barang yang ingin kamu beli</p>
      </div>

      {/* Add row */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select
          className="form-input form-select"
          style={{ flex: 1 }}
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
        >
          <option value="">-- Pilih item untuk ditambahkan --</option>
          {items?.map((item) => (
            <option key={item.id} value={String(item.id)}>
              {item.name} — {formatRupiah(item.price)}
            </option>
          ))}
        </select>
        <button
          className="btn btn-primary"
          style={{ marginTop: 0, whiteSpace: 'nowrap' }}
          disabled={!selectedItemId || addMutation.isPending}
          onClick={() => addMutation.mutate()}
        >
          {addMutation.isPending ? 'Menambahkan...' : 'Tambah'}
        </button>
      </div>

      {addMutation.isError && (
        <p className="text-error">Gagal menambahkan item. Coba lagi.</p>
      )}

      {isLoading && (
        <div className="history-empty">
          <span className="history-empty-icon"><Loader2 size={40} className="animate-spin" /></span>
          <p className="text-muted">Memuat wishlist...</p>
        </div>
      )}

      {!isLoading && (!wishlist || wishlist.length === 0) && (
        <div className="history-empty">
          <span className="history-empty-icon"><ShoppingCart size={40} /></span>
          <p className="text-muted">Wishlist masih kosong.</p>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Pilih item di atas lalu klik Tambah.
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {wishlist?.map((w) => {
          const st = statusStyle[w.status] ?? statusStyle.PENDING;
          return (
            <div
              key={w.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-glass)',
                borderRadius: '12px',
                gap: '1rem',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {w.item.name}
                </p>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {formatRupiah(w.item.price)} — {w.item.priorityLabel}
                </p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Ditambahkan: {w.date}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                <span style={{
                  padding: '3px 10px', borderRadius: '99px',
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em',
                  background: st.bg, color: st.text, border: `1px solid ${st.border}`,
                }}>
                  {w.status}
                </span>
                <button
                  style={{
                    padding: '4px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: 'rgba(239,68,68,0.12)',
                    color: '#ef4444',
                    border: '1px solid rgba(239,68,68,0.3)',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => removeMutation.mutate(w.id)}
                  disabled={removeMutation.isPending}
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;
