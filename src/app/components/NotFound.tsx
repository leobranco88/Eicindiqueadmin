import { motion } from "motion/react";
import { Link } from "react-router";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1
          className="text-transparent bg-clip-text mb-4"
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '72px', 
            fontWeight: 600,
            background: 'linear-gradient(135deg, #FF5C00, #6B3FA0)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text'
          }}
        >
          404
        </h1>
        <h2
          className="text-gray-900 mb-6"
          style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600 }}
        >
          Página não encontrada
        </h2>
        <p
          className="text-gray-600 mb-8"
          style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: '1.6' }}
        >
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl shadow-lg"
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '16px', 
              fontWeight: 600,
              background: 'linear-gradient(135deg, #FF5C00, #6B3FA0)',
              boxShadow: '0 20px 50px -10px rgba(255, 92, 0, 0.4)'
            }}
          >
            <Home size={20} />
            Voltar para o Dashboard
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}