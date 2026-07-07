import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* ── NAVBAR LANDING ── */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 40px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(11,12,22,0.7)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: 30, height: 30 }}
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span style={{ fontFamily: 'var(--font-title)', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
            MendingNabung
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link
            to="/login"
            style={{
              padding: '10px 24px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#fff',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            }}
          >
            Masuk
          </Link>
          <Link
            to="/register"
            style={{
              padding: '10px 24px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#fff',
              background: 'var(--accent-primary)',
              boxShadow: '0 4px 15px rgba(45,212,191,0.35)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#14b8a6';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(45,212,191,0.5)';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(45,212,191,0.35)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Daftar
          </Link>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '60px 24px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Logo / illustration */}
        <div style={{ marginBottom: 32, position: 'relative' }}>
          <img
            src="/Saving Money.svg"
            alt="MendingNabung Illustration"
            style={{ width: 220, height: 'auto', filter: 'drop-shadow(0 0 40px rgba(45,212,191,0.2))' }}
            onError={(e) => {
              // Fallback SVG if image doesn't load
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 800,
          }}
        >
          Mending <span style={{ color: 'var(--accent-primary)' }}>Beli</span> atau{' '}
          <span style={{ color: 'var(--color-nabung)' }}>Nabung</span>?
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: 600,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Bantu kami menganalisis kondisi keuanganmu. Dapatkan rekomendasi cerdas
          apakah kamu sebaiknya membeli barang incaran sekarang atau menabung
          untuk masa depan yang lebih aman.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            to="/register"
            style={{
              padding: '16px 40px',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '1.05rem',
              color: '#fff',
              background: 'var(--accent-primary)',
              boxShadow: '0 6px 20px rgba(45,212,191,0.4)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#14b8a6';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(45,212,191,0.55)';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(45,212,191,0.4)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Mulai Sekarang — Gratis
          </Link>

          <Link
            to="/login"
            style={{
              padding: '16px 36px',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: '1.05rem',
              color: '#fff',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
          >
            Sudah Punya Akun? Masuk
          </Link>
        </div>

        {/* Stats/Trust row */}
        <div
          style={{
            display: 'flex',
            gap: 48,
            marginTop: 64,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { icon: '📊', value: 'Analisis Cerdas', label: 'Regret Score & Rekomendasi' },
            { icon: '💰', value: 'Kelola Wishlist', label: 'Atur prioritas belanja' },
            { icon: '🎯', value: 'Rencana Nabung', label: 'Simulasi masa depan' },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center', minWidth: 140 }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{item.value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section
        style={{
          padding: '80px 24px',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-glass)',
          borderBottom: '1px solid var(--border-glass)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#fff',
              textAlign: 'center',
              marginBottom: 48,
            }}
          >
            Kenapa Harus <span style={{ color: 'var(--accent-primary)' }}>MendingNabung</span>?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
                title: 'Analisis Keuangan Real-Time',
                desc: 'Masukkan pendapatan dan saldo, dapatkan kalkulasi otomatis apakah barang layak dibeli sekarang atau ditunda.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-nabung)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                ),
                title: 'Regret Score Prediction',
                desc: 'Menggunakan metode regret score untuk memprediksi apakah kamu akan menyesal jika membeli sekarang vs menabung.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-beli)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
                title: 'Wishlist & Prioritas',
                desc: 'Atur wishlist, urutkan berdasarkan urgensi, dan pantau status keputusan setiap barang incaran.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="card-glass"
                style={{
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#fff',
              textAlign: 'center',
              marginBottom: 48,
            }}
          >
            Cara Kerjanya
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            {[
              { step: '1', title: 'Daftar & Atur Profil', desc: 'Buat akun gratis, isi saldo dan pendapatan bulanan kamu.' },
              { step: '2', title: 'Cari Barang Impian', desc: 'Telusuri katalog atau tambahkan barang yang ingin kamu beli.' },
              { step: '3', title: 'Dapatkan Rekomendasi', desc: 'Sistem akan menghitung regret score dan memberikan rekomendasi BELI atau NABUNG.' },
              { step: '4', title: 'Pantau & Evaluasi', desc: 'Lihat riwayat keputusan, atur wishlist, dan rencanakan tabunganmu.' },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 14,
                  padding: 24,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(45,212,191,0.2)';
                  e.currentTarget.style.transform = 'translateX(6px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'var(--border-glass)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--accent-primary-glow)',
                    border: '2px solid var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    color: 'var(--accent-primary)',
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: '80px 24px',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-glass)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: 16,
            }}
          >
            Siap Mengelola Keuangan Lebih Bijak?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 32, lineHeight: 1.7 }}>
            Bergabung gratis dan mulai dapatkan rekomendasi cerdas untuk setiap keputusan belanjamu.
          </p>
          <Link
            to="/register"
            style={{
              display: 'inline-flex',
              padding: '16px 44px',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#fff',
              background: 'var(--accent-primary)',
              boxShadow: '0 6px 20px rgba(45,212,191,0.4)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#14b8a6';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(45,212,191,0.55)';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(45,212,191,0.4)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Daftar Gratis Sekarang
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: '32px 24px',
          textAlign: 'center',
          borderTop: '1px solid var(--border-glass)',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
        }}
      >
        <p>
          <strong style={{ color: '#fff' }}>MendingNabung</strong> — Tugas Besar PBO Telkom University
        </p>
        <p style={{ marginTop: 4 }}>© {new Date().getFullYear()} Tim PBO. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
