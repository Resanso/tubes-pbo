# Mending Beli atau Nabung? 💸

Aplikasi web full-stack untuk membantu pengguna memutuskan apakah sebaiknya **membeli** suatu barang atau **menabung** terlebih dahulu, berdasarkan analisis keuangan otomatis.

**Tugas Besar PBO — Institut Teknologi Telkom Purwokerto**

---

## Konfigurasi Aplikasi

### Persyaratan Sistem
| Komponen | Versi |
|----------|-------|
| Java | 17+ |
| Maven | 3.8+ |
| Node.js | 18+ |
| npm | 9+ |

### Database (Neon PostgreSQL)

Aplikasi menggunakan **Neon DB** (PostgreSQL cloud). Tidak perlu instalasi database lokal.

Konfigurasi koneksi ada di `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://ep-quiet-rice-aojdwxuh-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
    username: neondb_owner
    password: npg_PEBj3Te2Izkm
```

> Skema tabel dibuat otomatis saat backend pertama kali dijalankan (`ddl-auto: update`).

### Menjalankan Aplikasi

**Backend (Spring Boot — port 8083):**
```bash
cd backend
mvn spring-boot:run
```

**Frontend (Vite React — port 5173):**
```bash
cd frontend
npm install
npm run dev
```

Akses aplikasi di: `http://localhost:5173`

---

## Akun yang Tersedia

### Role: CUSTOMER

| Username | Password | Keterangan |
|----------|----------|------------|
| `resan` | `resan123` | Akun utama (saldo: Rp 50.000) |
| `testuser` | *(gunakan Register)* | Akun tes tambahan |

> **Role Admin** belum diimplementasikan pada iterasi ini.

Untuk membuat akun baru, gunakan halaman **Register** (`/register`) dengan mengisi:
- Username
- Password
- Saldo awal (Rp)
- Penghasilan bulanan (Rp)

---

## Fitur Utama

| Fitur | Endpoint Frontend | Deskripsi |
|-------|-------------------|-----------|
| Login / Register | `/login`, `/register` | Autentikasi pengguna |
| Dashboard | `/` | Ringkasan item, wishlist, dan rencana tabungan |
| Evaluasi Keputusan | `/decision` | Analisis BELI vs NABUNG menggunakan regret score |
| Wishlist | `/wishlist` | Kelola daftar barang yang ingin dibeli |
| Riwayat Keputusan | `/history` | Rekap semua keputusan yang pernah dibuat |
| Tambah Barang | `/add-item` | Input barang baru ke sistem |

---

## Arsitektur

```
tubes-pbo/
├── backend/          # Spring Boot 3.x + JPA + Neon PostgreSQL
│   └── src/main/java/com/mendingnabung/
│       ├── controller/   # REST endpoints
│       ├── model/        # Entity + OOP logic
│       ├── service/      # Business logic (PurchaseAdvice)
│       ├── interfaces/   # PurchaseAdvice interface (Modul 6)
│       ├── repository/   # Spring Data JPA
│       └── dto/          # Data Transfer Objects
└── frontend/         # React + TypeScript + Vite
    └── src/
        ├── pages/        # Halaman-halaman utama
        ├── components/   # Komponen reusable
        ├── hooks/        # React Query hooks
        ├── api/          # Axios API calls
        └── contexts/     # AuthContext
```

## Konsep OOP yang Diimplementasikan

- **Modul 3 — Enkapsulasi**: `Recommendation.java`, `PurchaseDecision.java`, `Savings.java`
- **Modul 6 — Interface**: `PurchaseAdvice` interface, diimplementasikan oleh `RecommendationService`
- **Modul 7 — Lambda/Stream**: `DecisionController.getByCustomer()` mapping dengan Stream API
- **Modul 9 — Exception Handling**: try-catch-finally di `hitungSimulasi()`, `hitungSisaUang()`
