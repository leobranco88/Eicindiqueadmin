import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
  delay?: number;
}

export function StatsCard({ title, value, icon: Icon, trend, color = "#573000", delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
        
        {trend && (
          <div
            className={`px-2 py-1 rounded-md text-xs font-semibold ${
              trend.isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {trend.isPositive ? "+" : ""}{trend.value}
          </div>
        )}
      </div>

      <div>
        <div
          className="text-[#3D3D3D] mb-1"
          style={{ fontFamily: 'var(--font-body)', fontSize: '13px' }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            fontWeight: 600,
            color: color,
          }}
        >
          {value}
        </div>
      </div>
    </motion.div>
  );
}
