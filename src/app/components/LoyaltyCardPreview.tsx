import { motion } from "motion/react";
import { ExternalLink, Users } from "lucide-react";
import { useIndicacoes, calcularRanking } from "../../hooks/useIndicacoes";

export function LoyaltyCardPreview() {
  const { indicacoes } = useIndicacoes();

  const ranking = calcularRanking(indicacoes);
  const top = ranking.sort((a, b) => b.matriculados - a.matriculados)[0];

  if (!top) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
      >
        <h3 className="text-gray-900 mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600 }}>
          Cartão Fidelidade
        </h3>
        <p className="text-gray-400 text-sm text-center py-4" style={{ fontFamily: "var(--font-body)" }}>
          Nenhum responsável cadastrado ainda.
        </p>
      </motion.div>
    );
  }

  const fidelidadeUrl = `https://eicfidelidade.vercel.app/f/${top.responsavelId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900" style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600 }}>
          Top Indicador
        </h3>
        <a href={fidelidadeUrl} target="_blank" rel="noopener noreferrer">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 transition-colors"
            style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, color: "#6B3FA0" }}
          >
            Ver portal
            <ExternalLink size={14} />
          </motion.button>
        </a>
      </div>

      <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, #FF5C00 0%, #6B3FA0 50%, #070738 100%)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Users size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold" style={{ fontFamily: "var(--font-display)", fontSize: "16px" }}>
              {top.nomeResponsavel}
            </p>
            <p className="text-white/70 text-xs" style={{ fontFamily: "var(--font-body)" }}>
              {top.nivel}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Indicações", value: top.total },
            { label: "Matriculados", value: top.matriculados },
            { label: "Em avaliação", value: top.emAvaliacao },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-white font-bold text-lg">{item.value}</p>
              <p className="text-white/70 text-xs" style={{ fontFamily: "var(--font-body)" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
