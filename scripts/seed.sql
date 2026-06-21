-- ── Categories ────────────────────────────────────────────────────────────────
INSERT INTO categories (name) VALUES
  ('Makanan & Minuman'),
  ('Elektronik'),
  ('Pakaian'),
  ('Kesehatan'),
  ('Hiburan'),
  ('Transportasi')
ON CONFLICT (name) DO NOTHING;

-- ── Items (parent table) ──────────────────────────────────────────────────────
-- item_type: PRIMER | SEKUNDER | TERSIER
INSERT INTO items (name, price, urgency, category_id, item_type) VALUES
  -- PRIMER
  ('Beras 5kg',          75000,   5, (SELECT id FROM categories WHERE name='Makanan & Minuman'), 'PRIMER'),
  ('Obat Demam',         35000,   5, (SELECT id FROM categories WHERE name='Kesehatan'),         'PRIMER'),
  ('Ongkos Kos Bulan Ini', 1500000, 5, (SELECT id FROM categories WHERE name='Transportasi'),   'PRIMER'),
  -- SEKUNDER
  ('Sepatu Kuliah',      350000,  3, (SELECT id FROM categories WHERE name='Pakaian'),           'SEKUNDER'),
  ('Mouse Wireless',     180000,  3, (SELECT id FROM categories WHERE name='Elektronik'),        'SEKUNDER'),
  ('Jaket Musim Hujan',  250000,  4, (SELECT id FROM categories WHERE name='Pakaian'),           'SEKUNDER'),
  -- TERSIER
  ('Headphone Gaming',   850000,  2, (SELECT id FROM categories WHERE name='Elektronik'),        'TERSIER'),
  ('Jersey Bola',        300000,  1, (SELECT id FROM categories WHERE name='Hiburan'),           'TERSIER'),
  ('Smartwatch',        1200000,  2, (SELECT id FROM categories WHERE name='Elektronik'),        'TERSIER'),
  ('Action Figure',      450000,  1, (SELECT id FROM categories WHERE name='Hiburan'),           'TERSIER');

-- ── Subclass tables (JOINED inheritance — wajib ada row di sini) ──────────────
INSERT INTO barang_primer (item_id)
  SELECT id FROM items WHERE item_type = 'PRIMER'
  ON CONFLICT (item_id) DO NOTHING;

INSERT INTO barang_sekunder (item_id)
  SELECT id FROM items WHERE item_type = 'SEKUNDER'
  ON CONFLICT (item_id) DO NOTHING;

INSERT INTO barang_tersier (item_id)
  SELECT id FROM items WHERE item_type = 'TERSIER'
  ON CONFLICT (item_id) DO NOTHING;
