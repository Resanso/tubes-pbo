import { useAuth } from "../hooks/useAuth";
import { useDecisionHistory } from "../hooks/useDecision";
import { formatDate, formatRupiah } from "../utils/format.utils";
import { Clock, Calendar, TrendingUp, ShoppingBag, PiggyBank, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HistoryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: decisions, isLoading, error } = useDecisionHistory(user?.id ?? null);

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
          <p className="text-slate-400">Memuat riwayat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-red-400">
          <AlertCircle className="h-12 w-12" />
          <p className="text-lg font-semibold">Gagal memuat riwayat</p>
          <p className="text-slate-400 text-sm">Silakan coba lagi nanti</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-teal-500/10 rounded-xl">
            <Clock className="h-6 w-6 text-teal-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Riwayat Keputusan</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Semua keputusan yang pernah kamu buat
            </p>
          </div>
        </div>

        {!decisions || decisions.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <Clock className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Belum Ada Riwayat</h3>
            <p className="text-slate-400 text-sm">
              Kamu belum membuat keputusan apapun. Yuk evaluasi barang di wishlist-mu!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {decisions.map((entry) => {
              const decision = entry.purchaseDecision;
              const isBuy = decision?.decisionStatus === "BELI";

              return (
                <div
                  key={entry.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-white font-semibold text-lg">
                          Keputusan #{entry.id}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isBuy
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {isBuy ? (
                            <><ShoppingBag className="h-3 w-3" /> BELI</>
                          ) : (
                            <><PiggyBank className="h-3 w-3" /> NABUNG</>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-400 flex-wrap">
                        {decision?.remainingBalance !== undefined && (
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3.5 w-3.5" />
                            Sisa: {formatRupiah(decision.remainingBalance)}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(entry.decisionDate)}
                        </span>
                      </div>

                      <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                        {entry.result || decision?.advice}
                      </p>

                      {decision?.savingsPlan && (
                        <div className="mt-3 p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                          <p className="text-xs text-amber-400 font-medium mb-1">
                            💡 Rencana Tabungan
                          </p>
                          <p className="text-sm text-slate-300">
                            {decision.savingsPlan.result}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right: Score indicator */}
                    {decision?.regretScore !== undefined && (
                      <div className="flex-shrink-0 text-right">
                        <div className="text-xs text-slate-500 mb-1">Regret Score</div>
                        <div
                          className={`text-lg font-bold ${
                            decision.regretScore < 30
                              ? "text-emerald-400"
                              : decision.regretScore < 60
                              ? "text-amber-400"
                              : "text-red-400"
                          }`}
                        >
                          {decision.regretScore.toFixed(0)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
