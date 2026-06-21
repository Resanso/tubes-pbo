import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryApi, itemApi } from '@/api/item.api';
import type { Category, ItemType } from '@/types/item.types';

const ITEM_TYPES: { value: ItemType; label: string; desc: string }[] = [
  { value: 'PRIMER',   label: 'Primer',   desc: 'Kebutuhan pokok (skor penyesalan tinggi)' },
  { value: 'SEKUNDER', label: 'Sekunder', desc: 'Kebutuhan pendukung (skor penyesalan sedang)' },
  { value: 'TERSIER',  label: 'Tersier',  desc: 'Keinginan / hiburan (skor penyesalan rendah)' },
];

const AddItemPage: React.FC = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName]           = useState('');
  const [price, setPrice]         = useState('');
  const [urgency, setUrgency]     = useState(3);
  const [itemType, setItemType]   = useState<ItemType>('SEKUNDER');
  const [categoryId, setCategoryId] = useState<string>('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [success, setSuccess]     = useState(false);

  useEffect(() => {
    categoryApi.getAll().then(setCategories).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !price) { setError('Nama dan harga wajib diisi.'); return; }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) { setError('Harga tidak valid.'); return; }

    setLoading(true);
    try {
      await itemApi.create({
        name: name.trim(),
        price: parsedPrice,
        urgency,
        itemType,
        categoryId: categoryId ? parseInt(categoryId) : null,
      });
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch {
      setError('Gagal menambahkan barang. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Tambah Barang</h1>
        <p className="page-subtitle">Tambahkan barang baru ke katalog untuk dianalisa</p>
      </div>

      <form className="add-item-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Nama Barang</label>
          <input
            id="name"
            className="form-input"
            type="text"
            placeholder="Contoh: Laptop Gaming"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="price">Harga (Rp)</label>
          <input
            id="price"
            className="form-input"
            type="number"
            min="0"
            placeholder="Contoh: 500000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Urgensi: {urgency} / 5</label>
          <div className="urgency-slider-wrap">
            <span className="urgency-hint">Tidak Mendesak</span>
            <input
              className="urgency-slider"
              type="range"
              min={1}
              max={5}
              value={urgency}
              onChange={(e) => setUrgency(parseInt(e.target.value))}
              disabled={loading}
            />
            <span className="urgency-hint">Sangat Mendesak</span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Jenis Barang</label>
          <div className="item-type-grid">
            {ITEM_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                className={`item-type-card ${itemType === t.value ? 'selected' : ''}`}
                onClick={() => setItemType(t.value)}
                disabled={loading}
              >
                <span className="item-type-label">{t.label}</span>
                <span className="item-type-desc">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="category">Kategori (opsional)</label>
          <select
            id="category"
            className="form-input form-select"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={loading}
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {error && <p className="text-error">{error}</p>}

        {success && (
          <div className="add-item-success">
            Barang berhasil ditambahkan! Mengalihkan...
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '0.5rem' }}
          disabled={loading || success}
        >
          {loading ? 'Menyimpan...' : 'Tambah Barang'}
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
