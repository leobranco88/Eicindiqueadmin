import { motion } from "motion/react";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
    >
      <div>
        <h1
          className="text-gray-900"
          style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 600 }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-gray-600 mt-1"
            style={{ fontFamily: 'var(--font-body)', fontSize: '15px' }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </motion.div>
  );
}