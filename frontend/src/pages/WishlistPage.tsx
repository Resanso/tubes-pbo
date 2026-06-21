import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlistByCustomer, useRemoveWishlist } from '@/hooks/useWishlist';
import { formatDate, formatRupiah } from '@/utils/format.utils';

const WishlistPage: React.FC = () => {
  const { customer } = useAuth();
  const customerId = customer?.id ?? 0;

  const { data: wishlists, isLoading } = useWishlistByCustomer(customerId);
  const removeWishlist = useRemoveWishlist();

  if (isLoading) {
    return <div>Memuat...</div>;
  }

  if (!wishlists || wishlists.length === 0) {
    return <div>Belum ada wishlist</div>;
  }

  return (
    <div>
      <h1>Wishlist Saya</h1>
      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Item</th>
            <th>Harga</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {wishlists.map((wishlist) => (
            <tr key={wishlist.id}>
              <td>{formatDate(wishlist.date)}</td>
              <td>{wishlist.item.name}</td>
              <td>{formatRupiah(wishlist.item.price)}</td>
              <td>{wishlist.status}</td>
              <td>
                <button
                  onClick={() => removeWishlist.mutate(wishlist.id)}
                  disabled={removeWishlist.isPending}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WishlistPage;