import { motion } from "motion/react";
import { Users, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useIndicacoes, calcularRanking } from "../../hooks/useIndicacoes";

const NIVEL_CORES: Record<string, { bg: string; text: string; border: string }> = {
  Ambassador: { bg: "#FFF3ED", text: "#FF5C00", border: "#FF5C00" },
  Ouro:       { bg: "#FFFBEB", text: "#F5A800", border: "#F5A800" },
  Prata:      { bg: "#F3F4F6", text: "#6B7280", border: "#9CA3AF" },
  Bronze:     { bg: "#FEF3C7", text: "#92400E", border: "#92400E" },
  Iniciante:  { bg: "#F5F3FF", text: "#6B3FA0", border: "#6B3FA0" },
  "Sem nível":{ bg: "#F9FAFB", text: "#9CA3AF", border: "#E5E7EB" },
};

const STATUS_CORES: Record<string, string> = {
  "Matriculado":          "bg-green-100 text-green-700",
  "Em avaliação":         "bg-yellow-100 text-yellow-700",
  "Aguardando contato":   "bg-gray-100 text-gray-600",
  "Aguardando confirmação": "bg-blue-100 text-blue-700",
};

export function Indicacoes() {
  const { indicacoes, loading } = useIndicacoes();
  const [expandido, setExpandido] = useState<string | null>(null);

  const ranking = calcularRanking(indicacoes).sort((a, b) => b.total - a.total);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6FF] flex items-center justify-center">
        <div className="text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
          Carregando...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6FF]">
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-[#070738]"
            style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 700 }}
          >
            Responsáveis
          </h1>
          <p className="text-gray-500 mt-1" style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>
            {ranking.length} responsável{ranking.length !== 1 ? "is" : ""} cadastrado{ranking.length !== 1 ? "s" : ""}
          </p>
        </div>

        {ranking.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-[#6B3FA0]" />
            </div>
            <p
              className="text-[#070738]"
              style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600 }}
            >
              Nenhum responsável ainda
            </p>
            <p className="text-gray-400 mt-2" style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>
              Cadastre a primeira indicação no Dashboard.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {ranking.map((resp, index) => {
              const FALLBACK_COR = { bg: "#F9FAFB", text: "#9CA3AF", border: "#E5E7EB" };
              const cores = NIVEL_CORES[resp.nivel] ?? FALLBACK_COR;
              const isOpen = expandido === resp.responsavelId;
              const fidelidadeUrl = `https://eicfidelidade.vercel.app/f/${resp.responsavelId}`;

              return (
                <motion.div
                  key={resp.responsavelId}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  {/* Linha principal */}
                  <div
                    className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandido(isOpen ? null : resp.responsavelId)}
                  >
                    {/* Ranking */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                      style={{ background: "linear-gradient(135deg, #FF5C00, #6B3FA0)" }}
                    >
                      {index + 1}
                    </div>

                    {/* Nome */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[#070738]"
                        style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 600 }}
                      >
                        {resp.nomeResponsavel}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
                        {resp.responsavelId}
                      </p>
                    </div>

                    {/* Nível */}
                    <div
                      className="px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0"
                      style={{ backgroundColor: cores.bg, color: cores.text, borderColor: cores.border }}
                    >
                      {resp.nivel}
                    </div>

                    {/* Stats */}
                    <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
                      {[
                        { label: "Total", value: resp.total },
                        { label: "Matriculados", value: resp.matriculados, color: "#10B981" },
                        { label: "Em avaliação", value: resp.emAvaliacao, color: "#F5A800" },
                        { label: "Aguardando", value: resp.aguardando, color: "#9CA3AF" },
                      ].map((s) => (
                        <div key={s.label} className="text-center">
                          <p
                            className="font-bold"
                            style={{ fontFamily: "var(--font-body)", fontSize: "18px", color: s.color ?? "#070738" }}
                          >
                            {s.value}
                          </p>
                          <p className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-body)" }}>
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Link portal + chevron */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={fidelidadeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg hover:bg-purple-50 transition-colors"
                        title="Ver portal do responsável"
                      >
                        <ExternalLink size={16} className="text-[#6B3FA0]" />
                      </a>
                      {isOpen ? (
                        <ChevronUp size={18} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Indicações expandidas */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-4">
                        <p
                          className="text-gray-500 mb-3"
                          style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
                        >
                          Indicações
                        </p>
                        <div className="space-y-2">
                          {resp.indicacoes.map((ind) => (
                            <div
                              key={ind.id}
                              className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50"
                            >
                              <div>
                                <p
                                  className="text-[#070738]"
                                  style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 500 }}
                                >
                                  {ind.nomeIndicado}
                                </p>
                                <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
                                  {ind.whatsappIndicado}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_CORES[ind.status] ?? "bg-gray-100 text-gray-600"}`}
                              >
                                {ind.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
