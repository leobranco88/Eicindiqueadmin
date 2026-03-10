import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";

const MOCK_DATA = [
  { mes: "Jan", indicacoes: 8 },
  { mes: "Fev", indicacoes: 12 },
  { mes: "Mar", indicacoes: 5 },
];

export function PerformanceChart() {
  const maxValue = Math.max(...MOCK_DATA.map((d) => d.indicacoes));

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
          style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600 }}
        >
          <TrendingUp size={20} />
          Desempenho Mensal
        </h3>
        <span
          className="text-green-600 px-3 py-1 rounded-full bg-green-50 text-xs font-semibold"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          +12% vs mês anterior
        </span>
      </div>

      <div className="flex items-end justify-between gap-4 h-32">
        {MOCK_DATA.map((data, index) => {
          const height = (data.indicacoes / maxValue) * 100;
          
          return (
            <div key={data.mes} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex items-end justify-center h-24">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 100 }}
                  className="w-full bg-gradient-to-t from-indigo-500 to-purple-400 rounded-t-lg relative group cursor-pointer hover:from-indigo-600 hover:to-purple-500 transition-all"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                      {data.indicacoes} indicações
                    </div>
                  </div>
                </motion.div>
              </div>
              <span
                className="text-gray-600"
                style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500 }}
              >
                {data.mes}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}