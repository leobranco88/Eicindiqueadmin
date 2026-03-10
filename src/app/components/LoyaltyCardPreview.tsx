import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { LoyaltyCard } from "./LoyaltyCard";

export function LoyaltyCardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-gray-900"
          style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600 }}
        >
          Cartão Fidelidade
        </h3>
        <Link to="/cartao/maria-silva">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 transition-colors"
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '13px', 
              fontWeight: 600,
              color: '#6B3FA0'
            }}
          >
            Ver completo
            <ExternalLink size={14} />
          </motion.button>
        </Link>
      </div>

      <div className="scale-90 origin-top">
        <LoyaltyCard
          responsavelNome="Maria Silva"
          totalIndicacoes={2}
          matriculados={1}
        />
      </div>
    </motion.div>
  );
}