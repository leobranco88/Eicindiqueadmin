import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4"
    >
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#EDE7F6' }}>
          <Icon size={40} style={{ color: '#6B3FA0' }} />
        </div>
        <h2
          className="text-gray-900 mb-3"
          style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600 }}
        >
          {title}
        </h2>
        <p
          className="text-gray-600"
          style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: '1.6' }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}