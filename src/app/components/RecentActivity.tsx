import { motion } from "motion/react";
import { Clock, UserPlus, CheckCircle, AlertCircle } from "lucide-react";

interface Activity {
  id: string;
  type: "new" | "evaluation" | "enrolled";
  message: string;
  time: string;
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    type: "enrolled",
    message: "João Costa foi matriculado",
    time: "Há 2 horas",
  },
  {
    id: "2",
    type: "evaluation",
    message: "Ana Paula Oliveira entrou em avaliação",
    time: "Há 5 horas",
  },
  {
    id: "3",
    type: "new",
    message: "Nova indicação: Pedro Mendes",
    time: "Há 1 dia",
  },
  {
    id: "4",
    type: "enrolled",
    message: "Beatriz Lima foi matriculada",
    time: "Há 2 dias",
  },
];

export function RecentActivity() {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "new":
        return <UserPlus size={16} className="text-gray-600" />;
      case "evaluation":
        return <AlertCircle size={16} className="text-purple-500" />;
      case "enrolled":
        return <CheckCircle size={16} className="text-green-500" />;
    }
  };

  const getColor = (type: Activity["type"]) => {
    switch (type) {
      case "new":
        return "#6B7280";
      case "evaluation":
        return "#A78BFA";
      case "enrolled":
        return "#10B981";
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
        style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600 }}
      >
        <Clock size={20} />
        Atividades Recentes
      </h3>

      <div className="space-y-4">
        {MOCK_ACTIVITIES.map((activity, index) => (
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
              <p
                className="text-gray-900"
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500 }}
              >
                {activity.message}
              </p>
              <p
                className="text-gray-400 mt-1"
                style={{ fontFamily: 'var(--font-body)', fontSize: '12px' }}
              >
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}