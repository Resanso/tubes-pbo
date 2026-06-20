import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchItems } from '@/hooks/useItems';
import { useWishlist, useAddWishlist, useRemoveWishlist } from '@/hooks/useWishlist';
import { useSavings } from '@/hooks/useSavings';
import ItemCard from '@/components/item/ItemCard';
import SavingsPlanCard from '@/components/savings/SavingsPlanCard';
import { formatRupiah } from '@/utils/format.utils';
import type { Item } from '@/types/item.types';

const DashboardPage: React.FC = () => {
  const { customer } = useAuth();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // React Query queries
  const { data: items, isLoading: itemsLoading } = useSearchItems(keyword);
  const { data: wishlist, isLoading: wishlistLoading } = useWishlist(customer?.id ?? 0);
  const { data: savings, isLoading: savingsLoading } = useSavings(customer?.id ?? 0);

  // Mutations
  const addWishlistMutation = useAddWishlist();
  const removeWishlistMutation = useRemoveWishlist();

  // If customer is not loaded yet (just safety check)
  if (!customer) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading user profile...</p>
      </div>
    );
  }

  const handleAddToWishlist = (item: Item) => {
    setSuccessMsg(null);
    setErrorMsg(null);
    addWishlistMutation.mutate(
      { customerId: customer.id, itemId: item.id, itemDetails: item },
      {
        onSuccess: () => {
          setSuccessMsg(`Berhasil menambahkan "${item.name}" ke wishlist.`);
          setTimeout(() => setSuccessMsg(null), 3000);
        },
        onError: (err: any) => {
          setErrorMsg(err.message || 'Gagal menambahkan barang ke wishlist.');
          setTimeout(() => setErrorMsg(null), 3000);
        },
      }
    );
  };

  const handleRemoveFromWishlist = (wishlistId: number, itemName: string) => {
    setSuccessMsg(null);
    removeWishlistMutation.mutate(
      { id: wishlistId, customerId: customer.id },
      {
        onSuccess: () => {
          setSuccessMsg(`Berhasil menghapus "${itemName}" dari wishlist.`);
          setTimeout(() => setSuccessMsg(null), 3000);
        },
      }
    );
  };

  const handleEvaluate = (item: Item) => {
    // Redirect to evaluate page with item ID
    navigate(`/decision?itemId=${item.id}`, { state: { itemId: item.id } });
  };

  const renderStatusBadge = (status: string) => {
    let customStyle = {};
    switch (status) {
      case 'PENDING':
        customStyle = { background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.2)' };
        break;
      case 'APPROVED':
        customStyle = { background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.2)' };
        break;
      case 'REJECTED':
        customStyle = { background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.2)' };
        break;
      case 'PURCHASED':
        customStyle = { background: 'rgba(167, 139, 250, 0.1)', color: '#c084fc', borderColor: 'rgba(167, 139, 250, 0.2)' };
        break;
      default:
        break;
    }
    return (
      <span className="badge" style={customStyle}>
        {status}
      </span>
    );
  };

  return (
    <main className="app-container fade-in-up">
      {/* Header section */}
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', fontWeight: 800 }}>
          Halo, {customer.username}!
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Kelola keinginan belanjamu dan tentukan keputusan finansial terbaik: Mending Beli atau Nabung?
        </p>
      </header>

      {/* Notifications */}
      {successMsg && (
        <div
          style={{
            background: 'var(--color-beli-glow)',
            color: 'var(--color-beli)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px',
            fontSize: '0.9rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px',
            fontSize: '0.9rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {errorMsg}
        </div>
      )}

      {/* Financial Overview stats */}
      <section className="stats-container">
        <div className="card-glass stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Saldo Anda</span>
            <span className="stat-value" style={{ color: 'var(--accent-secondary)' }}>
              {formatRupiah(customer.balance)}
            </span>
          </div>
        </div>

        <div className="card-glass stat-card">
          <div className="stat-icon" style={{ color: 'var(--color-beli)', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">Pendapatan Bulanan</span>
            <span className="stat-value" style={{ color: 'var(--color-beli)' }}>
              {formatRupiah(customer.monthlyIncome)}
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="dashboard-grid">
        {/* Left Side: Product Catalog */}
        <section>
          <div className="items-header">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Katalog Barang</h2>
            
            <div className="search-wrapper">
              <input
                type="text"
                className="input-control"
                placeholder="Cari barang impian..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: '100%', paddingLeft: '40px' }}
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="2.5"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {itemsLoading ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>
              Memuat katalog barang...
            </p>
          ) : items && items.length > 0 ? (
            <div className="items-grid">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onAddToWishlist={handleAddToWishlist}
                  onEvaluate={handleEvaluate}
                />
              ))}
            </div>
          ) : (
            <div
              className="card-glass"
              style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}
            >
              Barang tidak ditemukan. Coba ketik kata kunci lain.
            </div>
          )}
        </section>

        {/* Right Side: Sidebar Panels (Wishlist & Savings) */}
        <aside className="sidebar-panel">
          {/* Wishlist Panel */}
          <div className="card-glass" style={{ padding: '20px' }}>
            <h2 className="sidebar-title">Wishlist Saya</h2>

            {wishlistLoading ? (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Memuat wishlist...</p>
            ) : wishlist && wishlist.length > 0 ? (
              <div className="list-container">
                {wishlist.map((wi) => (
                  <div key={wi.id} className="list-item-glass">
                    <div className="list-item-info">
                      <span className="list-item-title">{wi.item.name}</span>
                      <span className="list-item-subtitle">
                        {formatRupiah(wi.item.price)}
                      </span>
                      <div style={{ marginTop: '6px' }}>
                        {renderStatusBadge(wi.status)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromWishlist(wi.id, wi.item.name)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      title="Hapus dari wishlist"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic', textAlign: 'center', padding: '10px 0' }}>
                Belum ada wishlist. Tambahkan barang dari katalog!
              </p>
            )}
          </div>

          {/* Savings Panel */}
          <div>
            <h2 className="sidebar-title">Rencana Menabung</h2>
            {savingsLoading ? (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Memuat rencana menabung...</p>
            ) : savings && savings.length > 0 ? (
              <div className="list-container">
                {savings.map((plan) => (
                  <SavingsPlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            ) : (
              <div className="card-glass" style={{ padding: '20px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  Belum ada rencana menabung aktif.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default DashboardPage;
