import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    title: 'Analisis Cerdas',
    desc: 'Keputusan BELI vs NABUNG berdasarkan regret score, simulasi keuangan real-time, dan prioritas kebutuhanmu.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    ),
    title: 'Wishlist Pintar',
    desc: 'Catat barang impianmu, pantau statusnya, dan dapatkan rekomendasi kapan waktu terbaik untuk membeli.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    ),
    title: 'Rencana Tabungan',
    desc: 'Simulasi otomatis berapa lama kamu perlu menabung untuk mencapai target, lengkap dengan sisa uang bulanan.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
    title: 'Riwayat Keputusan',
    desc: 'Lihat kembali semua keputusan belanja masa lalu dan evaluasi pola pengeluaranmu.',
  },
];

const howItWorks = [
  { step: '1', title: 'Buat Akun', desc: 'Daftar dengan username, saldo awal, dan pendapatan bulanan.' },
  { step: '2', title: 'Tambah Barang', desc: 'Masukkan barang impian beserta harga dan tingkat urgensi.' },
  { step: '3', title: 'Dapatkan Keputusan', desc: 'Sistem akan menganalisis: Mending BELI atau NABUNG dulu?' },
  { step: '4', title: 'Kelola Wishlist', desc: 'Pantau dan evaluasi wishlist-mu untuk pengelolaan keuangan yang lebih baik.' },
];

const LandingPage: React.FC = () => {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '80px 24px 60px',
          textAlign: 'center',
        }}
      >
        {/* subtle background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 820, margin: '0 auto' }}>
          {/* Logo / icon */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              borderRadius: 20,
              background: 'rgba(45,212,191,0.12)',
              border: '1px solid rgba(45,212,191,0.25)',
              color: 'var(--accent-primary)',
              marginBottom: 24,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16,
              color: '#ffffff',
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
              margin: '0 auto 36px',
              lineHeight: 1.7,
            }}
          >
            Aplikasi pintar yang membantu kamu mengambil keputusan finansial terbaik.
            Analisis otomatis berdasarkan saldo, pendapatan, dan prioritas.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/register"
              className="btn btn-primary"
              style={{
                padding: '14px 36px',
                fontSize: '1.05rem',
                borderRadius: 'var(--radius-md)',
              }}
            >
              Mulai Sekarang
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link
              to="/login"
              className="btn btn-outline"
              style={{
                padding: '14px 36px',
                fontSize: '1.05rem',
                borderRadius: 'var(--radius-md)',
              }}
            >
              Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section style={{ padding: '60px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 48,
            color: '#ffffff',
          }}
        >
          Kenapa <span style={{ color: 'var(--accent-primary)' }}>MendingNabung</span>?
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="card-glass fade-in-up"
              style={{
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'rgba(45,212,191,0.1)',
                  border: '1px solid rgba(45,212,191,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)',
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>{f.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section
        style={{
          padding: '60px 24px 80px',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 48,
            color: '#ffffff',
          }}
        >
          Cara Kerja
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {howItWorks.map((item, i) => (
            <div
              key={i}
              className="card-glass fade-in-up"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '20px 24px',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(45,212,191,0.15)',
                  border: '2px solid var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-title)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: 'var(--accent-primary)',
                  flexShrink: 0,
                }}
              >
                {item.step}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: 2 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section
        style={{
          textAlign: 'center',
          padding: '60px 24px 80px',
          borderTop: '1px solid var(--border-glass)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: 12,
          }}
        >
          Siap Mengelola Keuangan Lebih Baik?
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            marginBottom: 28,
            maxWidth: 500,
            margin: '0 auto 28px',
          }}
        >
          Daftar gratis dan mulai buat keputusan finansial yang lebih cerdas sekarang.
        </p>
        <Link
          to="/register"
          className="btn btn-primary"
          style={{
            padding: '14px 40px',
            fontSize: '1.05rem',
            borderRadius: 'var(--radius-md)',
          }}
        >
          Daftar Gratis
        </Link>

        <p style={{ marginTop: 40, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Tugas Besar PBO — Telkom University
        </p>
      </section>
    </main>
  );
};

export default LandingPage;
