# Panduan Pengembangan — Mending Beli atau Nabung?

Dokumen ini adalah panduan lengkap untuk semua anggota tim agar dapat mengembangkan fitur, mengimplementasi kelas, dan menjalankan testing secara mandiri.

---

## Daftar Isi

1. [Persiapan Lingkungan](#1-persiapan-lingkungan)
2. [Struktur Proyek](#2-struktur-proyek)
3. [Menjalankan Aplikasi](#3-menjalankan-aplikasi)
4. [Koneksi Neon DB](#4-koneksi-neon-db)
5. [Panduan Implementasi Backend](#5-panduan-implementasi-backend)
6. [Panduan Implementasi Frontend](#6-panduan-implementasi-frontend)
7. [Standar OOP & Konvensi Kode](#7-standar-oop--konvensi-kode)
8. [Panduan Testing](#8-panduan-testing)
9. [Alur Kontribusi (Git)](#9-alur-kontribusi-git)
10. [Pembagian Fitur & Kelas](#10-pembagian-fitur--kelas)

---

## 1. Persiapan Lingkungan

### Prasyarat

| Tool | Versi Minimum | Cek |
|---|---|---|
| Java JDK | 21 | `java -version` |
| Maven | 3.9+ (atau gunakan `./mvnw`) | `mvn -version` |
| Node.js | 20 LTS | `node -version` |
| npm | 10+ | `npm -version` |
| Git | 2.x | `git --version` |

### Setup Pertama Kali

```bash
# 1. Clone repo
git clone <repo-url>
cd tubes-pbo

# 2. Buat file .env dari template
cp .env.example .env

# 3. Isi nilai di .env (minta ke ketua tim untuk kredensial Neon DB)
#    DATABASE_URL=jdbc:postgresql://...
#    DATABASE_USERNAME=...
#    DATABASE_PASSWORD=...
#    JWT_SECRET=...

# 4. Source env vars
source .env   # Linux/Mac
# atau di Windows: set the vars manually in System Properties

# 5. Install frontend dependencies
cd frontend && npm install && cd ..
```

---

## 2. Struktur Proyek

```
tubes-pbo/
├── backend/                         ← Spring Boot (Java 21)
│   ├── pom.xml
│   └── src/main/java/com/mendingnabung/
│       ├── MendingNabungApplication.java
│       ├── config/
│       │   └── CorsConfig.java
│       ├── interfaces/
│       │   └── PurchaseAdvice.java    ← Interface (jangan diubah)
│       ├── model/
│       │   ├── user/
│       │   │   ├── User.java          ← Abstract class
│       │   │   ├── Admin.java
│       │   │   └── Customer.java
│       │   ├── item/
│       │   │   ├── Item.java          ← Abstract class
│       │   │   ├── BarangPrimer.java
│       │   │   ├── BarangSekunder.java
│       │   │   └── BarangTersier.java
│       │   ├── Category.java
│       │   ├── Wishlist.java
│       │   ├── History.java
│       │   ├── Savings.java
│       │   └── PurchaseDecision.java
│       ├── repository/               ← JPA Repositories (sudah selesai)
│       ├── service/
│       │   └── RecommendationService.java  ← IMPLEMENTASI DI SINI
│       ├── controller/               ← REST Controllers
│       └── dto/                      ← Data Transfer Objects
│
├── frontend/                        ← React + TypeScript (Vite)
│   └── src/
│       ├── api/          ← HTTP calls ke backend
│       ├── components/   ← Reusable UI components
│       ├── contexts/     ← React Context (Auth)
│       ├── hooks/        ← Custom hooks (React Query)
│       ├── pages/        ← Halaman utama
│       ├── types/        ← TypeScript interfaces
│       └── utils/        ← Helper functions
│
├── scripts/
│   ├── start-all.sh     ← Jalankan backend + frontend sekaligus
│   └── stop-all.sh      ← Hentikan semua service
├── logs/                ← Log files (auto-created, jangan di-commit)
└── .env.example         ← Template env vars
```

---

## 3. Menjalankan Aplikasi

### Cara Cepat (direkomendasikan)

```bash
# Dari root proyek
source .env   # pastikan env vars ter-load
./scripts/start-all.sh
```

Setelah berhasil:
- **Frontend** → http://localhost:5173
- **Backend API** → http://localhost:8080/api
- **Log backend** → `tail -f logs/backend.log`
- **Log frontend** → `tail -f logs/frontend.log`

```bash
# Untuk menghentikan semua service
./scripts/stop-all.sh
```

### Cara Manual (jika perlu debug terpisah)

```bash
# Terminal 1 — Backend
cd backend
source ../.env
./mvnw spring-boot:run

# Terminal 2 — Frontend
cd frontend
npm run dev
```

---

## 4. Koneksi Neon DB

1. Buka [console.neon.tech](https://console.neon.tech)
2. Pilih project → **Connection Details**
3. Pilih koneksi tipe **JDBC**
4. Salin URL ke `.env`:
   ```
   DATABASE_URL=jdbc:postgresql://ep-xxxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   DATABASE_USERNAME=neondb_owner
   DATABASE_PASSWORD=xxxxxxxxxxxx
   ```
5. Saat aplikasi pertama kali dijalankan, Hibernate (`ddl-auto: update`) akan **otomatis membuat semua tabel** berdasarkan entity JPA.

> **Tips:** Gunakan Neon DB branch untuk development agar tidak mengganggu data teman lain.

---

## 5. Panduan Implementasi Backend

### Aturan Umum

- **Jangan mengubah signature method yang sudah ada.** Hanya isi body-nya.
- **Jangan mengubah anotasi JPA** di abstract class (`User`, `Item`) tanpa diskusi tim.
- Semua method yang perlu diimplementasi ditandai `// TODO: To be implemented by team`.
- Gunakan `@Transactional` di service layer, bukan di controller.

---

### 5.1 Mengimplementasi Abstract Method di Model

**Contoh: `BarangPrimer.java`**

```java
// File: model/item/BarangPrimer.java

@Override
public double calculateRegretScore() {
    // Barang primer = kebutuhan pokok, skor penyesalan sangat tinggi jika tidak dibeli
    // Formula: urgency * 20 (skala 0-100)
    return getUrgency() * 20.0;
}

@Override
public String getPriorityLabel() {
    return "Kebutuhan Pokok";
}
```

Terapkan logika berbeda untuk `BarangSekunder` dan `BarangTersier` sesuai prioritasnya.

---

### 5.2 Mengimplementasi RecommendationService

File: `service/RecommendationService.java`

```java
@Override
public PurchaseDecision giveAdvice(Customer customer, Item item) {
    // Langkah-langkah yang disarankan:
    // 1. Hitung sisa saldo jika membeli: remainingBalance = customer.balance - item.price
    // 2. Hitung regret score dari item: item.calculateRegretScore()
    // 3. Tentukan status: jika saldo cukup DAN regretScore tinggi → BELI, selain itu → NABUNG
    // 4. Simpan ke database via purchaseDecisionRepository.save(...)
    // 5. Return PurchaseDecision yang sudah disimpan
}
```

---

### 5.3 Mengimplementasi Controller

File: `controller/DecisionController.java`

```java
@PostMapping
public ResponseEntity<DecisionResponseDto> evaluate(@Valid @RequestBody DecisionRequestDto request) {
    // 1. Load Customer dari CustomerRepository
    // 2. Load Item dari ItemRepository
    // 3. Panggil recommendationService.giveAdvice(customer, item)
    // 4. Map hasil ke DecisionResponseDto
    // 5. Return ResponseEntity.ok(dto)
}
```

> Gunakan `ResponseEntity.notFound().build()` jika customer/item tidak ditemukan.

---

### 5.4 Menambah Service Baru

1. Buat file di `service/`, contoh: `WishlistService.java`
2. Anotasi dengan `@Service`
3. Inject repository via constructor (`@RequiredArgsConstructor`)
4. Daftarkan di controller yang relevan

---

## 6. Panduan Implementasi Frontend

### 6.1 Menambah Halaman Baru

1. Buat file di `src/pages/NamaHalaman.tsx`
2. Daftarkan di `src/App.tsx` dalam `<Routes>`
3. Tambahkan link di `Navbar.tsx`

**Template halaman:**
```tsx
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const NamaHalaman: React.FC = () => {
  const { customer } = useAuth();

  return (
    <main>
      <h1>Judul Halaman</h1>
      {/* Konten */}
    </main>
  );
};

export default NamaHalaman;
```

---

### 6.2 Melakukan HTTP Call ke Backend

Gunakan fungsi yang sudah ada di `src/api/`. Jika perlu endpoint baru, tambahkan di file api yang relevan.

```ts
// src/api/decision.api.ts
evaluate: (data: DecisionRequest) =>
  apiClient.post<DecisionResponse>('/decisions', data).then((r) => r.data),
```

Gunakan dengan React Query di komponen:
```tsx
import { useEvaluate } from '@/hooks/useDecision';

const { mutate, isPending, data } = useEvaluate();
mutate({ customerId: 1, itemId: 5 });
```

---

### 6.3 Menambah Tipe Baru

Tambahkan interface di `src/types/` sesuai kategori (user, item, decision). Jangan deklarasikan tipe inline di komponen.

---

## 7. Standar OOP & Konvensi Kode

### Backend (Java)

| Prinsip | Penerapan |
|---|---|
| **Encapsulation** | Semua field `private`, akses via getter/setter Lombok |
| **Inheritance** | `Admin` dan `Customer` extends `User`; `Barang*` extends `Item` |
| **Polymorphism** | `calculateRegretScore()` dan `getPriorityLabel()` di-override tiap subclass |
| **Abstraction** | Controller bergantung pada interface `PurchaseAdvice`, bukan `RecommendationService` langsung |

### Penamaan

- Class: `PascalCase`
- Method/variable: `camelCase`
- Konstanta: `UPPER_SNAKE_CASE`
- Package: semua lowercase

### Frontend (TypeScript)

- Komponen: `PascalCase`
- Hook: `useNamaHook`
- Tipe: `PascalCase`, suffix `Dto`/`Request`/`Response` untuk API contracts
- Hindari `any` — gunakan tipe eksplisit

---

## 8. Panduan Testing

### 8.1 Backend — Unit Test

File test ada di `src/test/java/com/mendingnabung/`.

```bash
# Jalankan semua test backend
cd backend
./mvnw test

# Jalankan satu test class
./mvnw test -Dtest=RecommendationServiceTest
```

**Menulis test untuk service:**

```java
// src/test/java/com/mendingnabung/service/RecommendationServiceTest.java
@ExtendWith(MockitoExtension.class)
class RecommendationServiceTest {

    @Mock
    private PurchaseDecisionRepository purchaseDecisionRepository;

    @InjectMocks
    private RecommendationService service;

    @Test
    void giveAdvice_whenBalanceSufficient_shouldReturnBeli() {
        // Arrange
        Customer customer = new Customer("ali", "pass",
            new BigDecimal("5000000"), new BigDecimal("3000000"));
        Item item = new BarangPrimer("Beras", new BigDecimal("100000"), 5);

        // Act
        PurchaseDecision result = service.giveAdvice(customer, item);

        // Assert
        assertThat(result.getDecisionStatus()).isEqualTo(DecisionStatus.BELI);
    }
}
```

---

### 8.2 Backend — Integration Test dengan Database

```java
@SpringBootTest
@Transactional  // rollback otomatis setelah setiap test
class CustomerRepositoryTest {

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    void findByUsername_shouldReturnCustomer() {
        Customer c = new Customer("budi", "pass",
            BigDecimal.TEN, BigDecimal.TEN);
        customerRepository.save(c);

        Optional<Customer> found = customerRepository.findByUsername("budi");
        assertThat(found).isPresent();
    }
}
```

> Pastikan variabel `DATABASE_URL` ter-set saat menjalankan integration test.

---

### 8.3 Frontend — Type Check & Lint

```bash
cd frontend

# Type checking
npm run type-check

# Linting
npm run lint

# Build (akan gagal jika ada type error)
npm run build
```

---

### 8.4 Uji Manual API dengan curl

```bash
# Daftarkan customer baru
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"andi","password":"123","balance":5000000,"monthlyIncome":3000000}'

# Minta rekomendasi
curl -X POST http://localhost:8080/api/decisions \
  -H "Content-Type: application/json" \
  -d '{"customerId":1,"itemId":1}'
```

---

## 9. Alur Kontribusi (Git)

```bash
# 1. Selalu mulai dari branch terbaru
git checkout main && git pull

# 2. Buat branch untuk fitur kamu
git checkout -b feature/nama-fitur
# Contoh: feature/recommendation-logic
#         feature/wishlist-page
#         fix/cors-error

# 3. Commit perubahan
git add .
git commit -m "feat: implementasi logika kalkulasi regret score"

# 4. Push dan buat Pull Request
git push origin feature/nama-fitur
```

### Konvensi Commit Message

| Prefix | Kapan digunakan |
|---|---|
| `feat:` | Fitur baru |
| `fix:` | Bug fix |
| `refactor:` | Perubahan kode tanpa tambah fitur/fix |
| `test:` | Menambah atau memperbaiki test |
| `docs:` | Perubahan dokumentasi |

---

## 10. Pembagian Fitur & Kelas

Gunakan tabel ini sebagai panduan pembagian tugas antar anggota tim. Sesuaikan dengan kesepakatan kelompok.

### Backend

| Komponen | File Utama | Prioritas |
|---|---|---|
| Logika Rekomendasi | `RecommendationService.java` | ★★★★★ |
| Regret Score — Primer | `BarangPrimer.java` | ★★★★☆ |
| Regret Score — Sekunder | `BarangSekunder.java` | ★★★★☆ |
| Regret Score — Tersier | `BarangTersier.java` | ★★★★☆ |
| Decision Controller | `DecisionController.java` | ★★★★★ |
| User Controller | `UserController.java` | ★★★★☆ |
| Item Controller | `ItemController.java` | ★★★☆☆ |
| Wishlist Controller | `WishlistController.java` | ★★★☆☆ |
| Auth (login/JWT) | `config/SecurityConfig.java` (buat sendiri) | ★★★★☆ |
| Admin.getRole() | `Admin.java` | ★★☆☆☆ |
| Customer.getRole() | `Customer.java` | ★★☆☆☆ |

### Frontend

| Halaman / Komponen | File Utama | Prioritas |
|---|---|---|
| Halaman Login | `pages/LoginPage.tsx` | ★★★★★ |
| Halaman Register | `pages/RegisterPage.tsx` | ★★★★☆ |
| Dashboard | `pages/DashboardPage.tsx` | ★★★★☆ |
| Halaman Keputusan | `pages/DecisionPage.tsx` | ★★★★★ |
| Halaman Wishlist | `pages/WishlistPage.tsx` | ★★★☆☆ |
| Riwayat Keputusan | `pages/HistoryPage.tsx` | ★★★☆☆ |
| Navbar | `components/common/Navbar.tsx` | ★★★☆☆ |
| Item Card | `components/item/ItemCard.tsx` | ★★★☆☆ |
| Hasil Keputusan | `components/decision/DecisionResult.tsx` | ★★★★☆ |
| Kartu Rencana Nabung | `components/savings/SavingsPlanCard.tsx` | ★★★☆☆ |
