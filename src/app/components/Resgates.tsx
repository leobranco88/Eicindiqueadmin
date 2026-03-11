import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { collection, onSnapshot, updateDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Banknote, ShoppingBag, Clock, CheckCircle, XCircle, Copy, BadgeCheck } from "lucide-react";

interface Resgate {
  id: string;
  responsavelId: string;
  nomeResponsavel: string;
  tipo: "pix" | "material_didatico";
  valor: number;
  chavePix?: string;
  status: "pendente" | "aprovado" | "pago" | "recusado";
  criadoEm: string;
  pagoEm?: string;
}

const STATUS_CONFIG = {
  pendente:  { label: "Pendente",   bg: "#FEF3C7", text: "#92400E", icon: Clock },
  aprovado:  { label: "Aprovado",   bg: "#DBEAFE", text: "#1E40AF", icon: CheckCircle },
  pago:      { label: "Pago ✓",     bg: "#D1FAE5", text: "#065F46", icon: BadgeCheck },
  recusado:  { label: "Recusado",   bg: "#FEE2E2", text: "#991B1B", icon: XCircle },
};

export function Resgates() {
  const [resgates, setResgates] = useState<Resgate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<"todos" | "pendente" | "aprovado" | "pago" | "recusado">("pendente");
  const [atualizando, setAtualizando] = useState<string | null>(null);
  const [copiado, setCopiado] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "resgates"), orderBy("criadoEm", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        criadoEm: d.data().criadoEm?.toDate?.()?.toISOString() ?? new Date().toISOString(),
        pagoEm: d.data().pagoEm?.toDate?.()?.toISOString() ?? null,
      })) as Resgate[];
      setResgates(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const atualizarStatus = async (id: string, status: "aprovado" | "recusado") => {
    setAtualizando(id);
    await updateDoc(doc(db, "resgates", id), { status });
    setAtualizando(null);
  };

  const confirmarPagamento = async (id: string) => {
    setAtualizando(id);
    await updateDoc(doc(db, "resgates", id), {
      status: "pago",
      pagoEm: serverTimestamp(),
    });
    setAtualizando(null);
  };

  const copiarPix = (chave: string, id: string) => {
    navigator.clipboard.writeText(chave);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const filtrados = resgates.filter((r) => filtro === "todos" || r.status === filtro);
  const pendentes = resgates.filter((r) => r.status === "pendente").length;
  const aprovadosAguardando = resgates.filter((r) => r.status === "aprovado").length;

  return (
    <div className="min-h-screen bg-[#F8F6FF]">
      <div className="max-w-screen-2xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#070738]" style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 700 }}>
              Resgates
            </h1>
            <p className="text-gray-500 mt-1" style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>
              Gerencie as solicitações de resgate dos embaixadores
            </p>
          </div>
          <div className="flex gap-2">
            {pendentes > 0 && (
              <div className="px-4 py-2 rounded-xl text-white font-semibold text-sm" style={{ backgroundColor: "#FF5C00" }}>
                {pendentes} pendente{pendentes > 1 ? "s" : ""}
              </div>
            )}
            {aprovadosAguardando > 0 && (
              <div className="px-4 py-2 rounded-xl text-white font-semibold text-sm" style={{ backgroundColor: "#1E40AF" }}>
                {aprovadosAguardando} aguardando PIX
              </div>
            )}
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6">
          {(["pendente", "aprovado", "pago", "recusado", "todos"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize"
              style={{
                backgroundColor: filtro === f ? "#070738" : "white",
                color: filtro === f ? "white" : "#6B7280",
                border: "1px solid",
                borderColor: filtro === f ? "#070738" : "#E5E7EB",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400 text-center py-12" style={{ fontFamily: "var(--font-body)" }}>Carregando...</p>
        ) : filtrados.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Banknote size={40} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
              Nenhum resgate {filtro !== "todos" ? filtro : ""} encontrado.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtrados.map((r, i) => {
              const sc = STATUS_CONFIG[r.status];
              const StatusIcon = sc.icon;
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Info */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: r.tipo === "pix" ? "#FFF3ED" : "#F5F3FF" }}
                      >
                        {r.tipo === "pix"
                          ? <Banknote size={24} style={{ color: "#FF5C00" }} />
                          : <ShoppingBag size={24} style={{ color: "#6B3FA0" }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#070738]" style={{ fontFamily: "var(--font-body)", fontSize: "15px" }}>
                          {r.nomeResponsavel}
                        </p>
                        <p className="text-gray-500 text-sm mt-0.5">
                          {r.tipo === "pix" ? "Resgate em dinheiro (PIX)" : "Material Didático"}
                          {" · "}
                          <span className="font-semibold" style={{ color: "#FF5C00" }}>R$ {r.valor}</span>
                        </p>

                        {r.chavePix && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-400">PIX:</span>
                            <span className="text-xs font-mono text-gray-600 bg-gray-50 px-2 py-0.5 rounded">
                              {r.chavePix}
                            </span>
                            <button onClick={() => copiarPix(r.chavePix!, r.id)} className="p-1 rounded hover:bg-gray-100 transition-colors">
                              {copiado === r.id
                                ? <CheckCircle size={14} className="text-green-500" />
                                : <Copy size={14} className="text-gray-400" />}
                            </button>
                          </div>
                        )}

                        <p className="text-gray-400 text-xs mt-2">
                          Solicitado em {new Date(r.criadoEm).toLocaleDateString("pt-BR", {
                            day: "2-digit", month: "2-digit", year: "numeric",
                            hour: "2-digit", minute: "2-digit"
                          })}
                          {r.tipo === "pix" && r.status !== "pago" && " · Pagamento dia 30"}
                        </p>

                        {/* Selo de pago */}
                        {r.status === "pago" && r.pagoEm && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <BadgeCheck size={14} style={{ color: "#065F46" }} />
                            <span className="text-xs font-semibold" style={{ color: "#065F46" }}>
                              PIX enviado em {new Date(r.pagoEm).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        )}
                        {r.status === "pago" && r.tipo === "material_didatico" && r.pagoEm && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <BadgeCheck size={14} style={{ color: "#065F46" }} />
                            <span className="text-xs font-semibold" style={{ color: "#065F46" }}>
                              Material entregue em {new Date(r.pagoEm).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status + Ações */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <div
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: sc.bg, color: sc.text }}
                      >
                        <StatusIcon size={12} />
                        {sc.label}
                      </div>

                      {/* Ações para pendente */}
                      {r.status === "pendente" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => atualizarStatus(r.id, "recusado")}
                            disabled={atualizando === r.id}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
                            style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}
                          >
                            Recusar
                          </button>
                          <button
                            onClick={() => atualizarStatus(r.id, "aprovado")}
                            disabled={atualizando === r.id}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
                            style={{ backgroundColor: "#DBEAFE", color: "#1E40AF" }}
                          >
                            Aprovar
                          </button>
                        </div>
                      )}

                      {/* Botão confirmar pagamento para aprovados */}
                      {r.status === "aprovado" && (
                        <button
                          onClick={() => confirmarPagamento(r.id)}
                          disabled={atualizando === r.id}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 shadow-sm"
                          style={{ backgroundColor: "#10B981", color: "white" }}
                        >
                          <BadgeCheck size={14} />
                          {r.tipo === "pix" ? "Confirmar PIX enviado" : "Confirmar entrega"}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
