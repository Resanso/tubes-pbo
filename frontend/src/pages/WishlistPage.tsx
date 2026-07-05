import { useAuth } from "../hooks/useAuth";
import { useWishlist, useRemoveWishlist } from "../hooks/useWishlist";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Heart, Trash2, Plus, ShoppingBag, Loader2, AlertCircle, Package } from "lucide-react";
import { formatRupiah } from "../utils/format.utils";
import type { WishlistItem } from "../types/item.types";

export default function WishlistPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: wishlist, isLoading, error } = useWishlist(user?.id ?? null);
  const removeMutation = useRemoveWishlist();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
          <p className="text-slate-400">Memuat wishlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-red-400">
          <AlertCircle className="h-12 w-12" />
          <p className="text-lg font-semibold">Gagal memuat wishlist</p>
          <p className="text-slate-400 text-sm">Silakan coba lagi nanti</p>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("Hapus item ini dari wishlist?")) return;
    removeMutation.mutate({ id, customerId: user.id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/10 rounded-xl">
              <Heart className="h-6 w-6 text-teal-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Wishlist</h1>
              <p className="text-slate-400 text-sm mt-0.5">
                {wishlist?.length || 0} barang yang ingin kamu beli
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/add-item")}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white rounded-xl transition-colors font-medium text-sm"
          >
            <Plus className="h-4 w-4" />
            Tambah Barang
          </button>
        </div>

        {!wishlist || wishlist.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <Heart className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Wishlist Masih Kosong</h3>
            <p className="text-slate-400 text-sm mb-6">
              Tambahkan barang impianmu untuk dievaluasi!
            </p>
            <button
              onClick={() => navigate("/add-item")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-white rounded-xl transition-colors font-medium text-sm"
            >
              <Plus className="h-4 w-4" />
              Tambah Barang Sekarang
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlist.map((entry: WishlistItem) => {
              const itemData = entry.item;
              const category = itemData?.category;

              return (
                <div
                  key={entry.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all group"
                >
                  {/* Item info */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 bg-teal-500/10 rounded-lg">
                      <Package className="h-5 w-5 text-teal-400" />
                    </div>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="text-white font-semibold text-base truncate">
                    {itemData?.name || "Item tidak diketahui"}
                  </h3>

                  <p className="text-teal-400 font-medium text-lg mt-1">
                    {itemData?.price ? formatRupiah(itemData.price) : "-"}
                  </p>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {itemData?.priorityLabel && (
                      <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium">
                        {itemData.priorityLabel}
                      </span>
                    )}
                    {itemData?.itemType && (
                      <span className="px-2.5 py-0.5 bg-slate-700/50 text-slate-300 rounded-full text-xs font-medium">
                        {itemData.itemType}
                      </span>
                    )}
                    {itemData?.urgency && (
                      <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 rounded-full text-xs font-medium">
                        Urgensi: {itemData.urgency}/5
                      </span>
                    )}
                  </div>

                  {category && (
                    <p className="text-xs text-slate-500 mt-2">
                      {category.name}
                    </p>
                  )}

                  {/* Status badge */}
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        entry.status === "PENDING"
                          ? "bg-amber-500/10 text-amber-400"
                          : entry.status === "APPROVED"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : entry.status === "REJECTED"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => navigate(`/decision?itemId=${itemData?.id}&wishlistId=${entry.id}`)}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 rounded-xl transition-colors text-sm font-medium"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Evaluasi Keputusan
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
