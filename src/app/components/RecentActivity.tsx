import { motion } from "motion/react";
import { Clock, UserPlus, CheckCircle, AlertCircle, Bell } from "lucide-react";
import { useIndicacoes } from "../../hooks/useIndicacoes";

export function RecentActivity() {
  const { indicacoes } = useIndicacoes();

  // Pega as 5 indicações mais recentes e gera atividades
  const activities = [...indicacoes]
    .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
    .slice(0, 5)
    .map((ind) => {
      const type =
        ind.status === "Matriculado"
          ? "enrolled"
          : ind.status === "Em avaliação"
          ? "evaluation"
          : "new";

      const message =
        ind.status === "Matriculado"
          ? `${ind.nomeIndicado} foi matriculado(a)`
          : ind.status === "Em avaliação"
          ? `${ind.nomeIndicado} entrou em avaliação`
          : `Nova indicação: ${ind.nomeIndicado}`;

      const diff = Date.now() - new Date(ind.criadoEm).getTime();
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const days = Math.floor(hours / 24);
      const time =
        days > 0
          ? `Há ${days} dia${days > 1 ? "s" : ""}`
          : hours > 0
          ? `Há ${hours} hora${hours > 1 ? "s" : ""}`
          : "Agora mesmo";

      return { id: ind.id, type, message, time };
    });

  const getIcon = (type: string) => {
    switch (type) {
      case "new": return <UserPlus size={16} className="text-gray-600" />;
      case "evaluation": return <AlertCircle size={16} className="text-purple-500" />;
      case "enrolled": return <CheckCircle size={16} className="text-green-500" />;
      default: return <Bell size={16} className="text-gray-400" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "new": return "#6B7280";
      case "evaluation": return "#A78BFA";
      case "enrolled": return "#10B981";
      default: return "#6B7280";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
    >
      <h3
        className="text-gray-900 mb-4 flex items-center gap-2"
        style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600 }}
      >
        <Clock size={20} />
        Atividades Recentes
      </h3>

      {activities.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4" style={{ fontFamily: "var(--font-body)" }}>
          Nenhuma atividade ainda.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${getColor(activity.type)}15` }}
              >
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900" style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 500 }}>
                  {activity.message}
                </p>
                <p className="text-gray-400 mt-1" style={{ fontFamily: "var(--font-body)", fontSize: "12px" }}>
                  {activity.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
