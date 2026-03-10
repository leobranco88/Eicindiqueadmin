import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";
import { useIndicacoes } from "../../hooks/useIndicacoes";

export function PerformanceChart() {
  const { indicacoes } = useIndicacoes();

  // Agrupa indicações por mês (últimos 3 meses)
  const now = new Date();
  const meses = Array.from({ length: 3 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (2 - i), 1);
    return {
      label: d.toLocaleString("pt-BR", { month: "short" }).replace(".", ""),
      year: d.getFullYear(),
      month: d.getMonth(),
      count: 0,
    };
  });

  for (const ind of indicacoes) {
    const d = new Date(ind.criadoEm);
    const mes = meses.find((m) => m.month === d.getMonth() && m.year === d.getFullYear());
    if (mes) mes.count++;
  }

  const maxValue = Math.max(...meses.map((m) => m.count), 1);

  // Variação vs mês anterior
  const atual = meses[2].count;
  const anterior = meses[1].count;
  const variacao = anterior === 0 ? null : Math.round(((atual - anterior) / anterior) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-gray-900 flex items-center gap-2"
          style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600 }}
        >
          <TrendingUp size={20} />
          Desempenho Mensal
        </h3>
        {variacao !== null && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${variacao >= 0 ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {variacao >= 0 ? "+" : ""}{variacao}% vs mês anterior
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-4 h-32">
        {meses.map((data, index) => {
          const height = maxValue === 0 ? 0 : (data.count / maxValue) * 100;
          return (
            <div key={data.label} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex items-end justify-center h-24">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(height, data.count > 0 ? 8 : 0)}%` }}
                  transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 100 }}
                  className="w-full rounded-t-lg relative group cursor-pointer transition-all"
                  style={{ background: "linear-gradient(to top, #6B3FA0, #A78BFA)" }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                      {data.count} indicaç{data.count === 1 ? "ão" : "ões"}
                    </div>
                  </div>
                </motion.div>
              </div>
              <span className="text-gray-600 capitalize" style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 500 }}>
                {data.label}
              </span>
            </div>
          );
        })}
      </div>

      {indicacoes.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-2" style={{ fontFamily: "var(--font-body)" }}>
          Nenhuma indicação ainda.
        </p>
      )}
    </motion.div>
  );
}
