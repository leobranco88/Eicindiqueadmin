import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Users, Phone } from "lucide-react";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { nomeResponsavel: string; nomeIndicado: string; whatsappIndicado: string }) => void;
}

export function ReferralModal({ isOpen, onClose, onSubmit }: ReferralModalProps) {
  const [formData, setFormData] = useState({
    nomeResponsavel: "",
    nomeIndicado: "",
    whatsappIndicado: "",
  });

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setFormData({ ...formData, whatsappIndicado: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nomeResponsavel: "", nomeIndicado: "", whatsappIndicado: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-gray-900"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600 }}
                >
                  Nova Indicação
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="nomeResponsavel"
                    className="flex items-center gap-2 text-gray-700"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}
                  >
                    <User size={16} />
                    Seu nome (responsável)
                  </label>
                  <input
                    id="nomeResponsavel"
                    type="text"
                    required
                    value={formData.nomeResponsavel}
                    onChange={(e) => setFormData({ ...formData, nomeResponsavel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}
                    placeholder="Nome do responsável"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="nomeIndicado"
                    className="flex items-center gap-2 text-gray-700"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}
                  >
                    <Users size={16} />
                    Nome do indicado
                  </label>
                  <input
                    id="nomeIndicado"
                    type="text"
                    required
                    value={formData.nomeIndicado}
                    onChange={(e) => setFormData({ ...formData, nomeIndicado: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}
                    placeholder="Nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="whatsappIndicado"
                    className="flex items-center gap-2 text-gray-700"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}
                  >
                    <Phone size={16} />
                    WhatsApp do indicado
                  </label>
                  <input
                    id="whatsappIndicado"
                    type="tel"
                    required
                    value={formData.whatsappIndicado}
                    onChange={handleWhatsAppChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600 }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-lg text-white transition-all shadow-lg"
                    style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: '14px', 
                      fontWeight: 600,
                      backgroundColor: '#FF5C00',
                      boxShadow: '0 10px 25px -5px rgba(255, 92, 0, 0.4)'
                    }}
                  >
                    Enviar Indicação
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}