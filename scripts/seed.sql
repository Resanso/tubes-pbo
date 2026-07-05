-- ============================================================
-- SEED DATA untuk Mending Nabung? — PostgreSQL (Neon)
-- Jalankan setelah tabel dibuat otomatis oleh JPA/Hibernate
-- ============================================================

-- === CATEGORIES ===
INSERT INTO categories (name) VALUES
  ('Elektronik'),
  ('Fashion'),
  ('Makanan & Minuman'),
  ('Kesehatan'),
  ('Transportasi'),
  ('Hiburan'),
  ('Pendidikan')
ON CONFLICT (name) DO NOTHING;

-- === ITEMS (BarangPrimer, BarangSekunder, BarangTersier) ===
-- Semua item dimasukkan ke tabel items (single-table inheritance)
-- Kolom dtype = 'PRIMER', 'SEKUNDER', atau 'TERSIER'

-- Barang Primer (kebutuhan pokok)
INSERT INTO items (dtype, name, price, urgency, priority_label, category_id) VALUES
  ('PRIMER', 'Beras 5kg', 75000, 5, 'Primer', (SELECT id FROM categories WHERE name = 'Makanan & Minuman')),
  ('PRIMER', 'Minyak Goreng 2L', 35000, 4, 'Primer', (SELECT id FROM categories WHERE name = 'Makanan & Minuman')),
  ('PRIMER', 'Telur 1kg', 30000, 5, 'Primer', (SELECT id FROM categories WHERE name = 'Makanan & Minuman')),
  ('PRIMER', 'Gula Pasir 1kg', 15000, 3, 'Primer', (SELECT id FROM categories WHERE name = 'Makanan & Minuman')),
  ('PRIMER', 'Masker Medis 50pcs', 25000, 4, 'Primer', (SELECT id FROM categories WHERE name = 'Kesehatan'));

-- Barang Sekunder
INSERT INTO items (dtype, name, price, urgency, priority_label, category_id) VALUES
  ('SEKUNDER', 'Kemeja Formal', 150000, 3, 'Sekunder', (SELECT id FROM categories WHERE name = 'Fashion')),
  ('SEKUNDER', 'Sepatu Olahraga', 350000, 2, 'Sekunder', (SELECT id FROM categories WHERE name = 'Fashion')),
  ('SEKUNDER', 'Tas Ransel', 200000, 3, 'Sekunder', (SELECT id FROM categories WHERE name = 'Fashion')),
  ('SEKUNDER', 'Buku Paket Semester 1', 120000, 4, 'Sekunder', (SELECT id FROM categories WHERE name = 'Pendidikan')),
  ('SEKUNDER', 'Helm Standar SNI', 180000, 4, 'Sekunder', (SELECT id FROM categories WHERE name = 'Transportasi'));

-- Barang Tersier
INSERT INTO items (dtype, name, price, urgency, priority_label, category_id) VALUES
  ('TERSIER', 'Smartphone X', 5500000, 2, 'Tersier', (SELECT id FROM categories WHERE name = 'Elektronik')),
  ('TERSIER', 'Laptop Gaming', 15000000, 1, 'Tersier', (SELECT id FROM categories WHERE name = 'Elektronik')),
  ('TERSIER', 'Headphone Wireless', 750000, 2, 'Tersier', (SELECT id FROM categories WHERE name = 'Elektronik')),
  ('TERSIER', 'Smartwatch Pro', 2500000, 1, 'Tersier', (SELECT id FROM categories WHERE name = 'Elektronik')),
  ('TERSIER', 'Tiket Konser', 500000, 3, 'Tersier', (SELECT id FROM categories WHERE name = 'Hiburan')),
  ('TERSIER', 'Kacamata Hitam', 450000, 2, 'Tersier', (SELECT id FROM categories WHERE name = 'Fashion'));

-- === CUSTOMERS (khusus untuk role CUSTOMER) ===
-- Password: resan123 (encoded BCrypt)
INSERT INTO customers (username, password, role, saldo, penghasilan_bulanan)
VALUES (
  'resan',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'CUSTOMER',
  50000,
  3000000
)
ON CONFLICT (username) DO NOTHING;

-- Password: test123 (encoded BCrypt)
INSERT INTO customers (username, password, role, saldo, penghasilan_bulanan)
VALUES (
  'testuser',
  '$2a$10$k2Bk2d3Yd8Yd8Yd8Yd8Yd8Yd8Yd8Yd8Yd8Yd8Yd8Yd8Yd8Yd8Yd8',
  'CUSTOMER',
  100000,
  2500000
)
ON CONFLICT (username) DO NOTHING;
