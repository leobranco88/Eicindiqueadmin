import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useParams, Link } from "react-router";
import { LoyaltyCard } from "./LoyaltyCard";
import { ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Indicacao {
  id: string;
  nomeResponsavel: string;
  nomeIndicado: string;
  whatsappIndicado: string;
  status: "Aguardando contato" | "Em avaliação" | "Matriculado";
  criadoEm: string;
  responsavelId: string;
}

export function LoyaltyCardPage() {
  const { id } = useParams();
  const [indicacoes, setIndicacoes] = useState<Indicacao[]>([]);
  const [responsavelNome, setResponsavelNome] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("indicacoes");
    if (stored) {
      const data: Indicacao[] = JSON.parse(stored);
      setIndicacoes(data);

      // Encontrar o responsável
      const userIndicacoes = data.filter((ind) => ind.responsavelId === id);
      if (userIndicacoes.length > 0) {
        setResponsavelNome(userIndicacoes[0].nomeResponsavel);
      }
    }
  }, [id]);

  const userIndicacoes = indicacoes.filter((ind) => ind.responsavelId === id);
  const matriculados = userIndicacoes.filter((ind) => ind.status === "Matriculado").length;

  const getStatusIcon = (status: Indicacao["status"]) => {
    switch (status) {
      case "Matriculado":
        return <CheckCircle size={16} className="text-green-600" />;
      case "Em avaliação":
        return <Clock size={16} className="text-orange-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F6FF' }}>
      {/* Header fixo */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600 }}
            >
              <ArrowLeft size={18} />
              Voltar ao Dashboard
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {responsavelNome ? (
          <>
            {/* Cartão Fidelidade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <LoyaltyCard
                responsavelNome={responsavelNome}
                totalIndicacoes={userIndicacoes.length}
                matriculados={matriculados}
              />
            </motion.div>

            {/* Lista de indicações */}
            {userIndicacoes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
              >
                <h2
                  className="text-gray-900 mb-6"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600 }}
                >
                  Suas Indicações
                </h2>
                
                <div className="space-y-3">
                  {userIndicacoes.map((ind, index) => (
                    <motion.div
                      key={ind.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          ind.status === "Matriculado" 
                            ? "bg-green-100" 
                            : ind.status === "Em avaliação"
                            ? "bg-orange-100"
                            : "bg-gray-200"
                        }`}>
                          {getStatusIcon(ind.status)}
                        </div>
                        <div>
                          <p
                            className="text-gray-900"
                            style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600 }}
                          >
                            {ind.nomeIndicado}
                          </p>
                          <p
                            className="text-gray-500"
                            style={{ fontFamily: 'var(--font-body)', fontSize: '13px' }}
                          >
                            {new Date(ind.criadoEm).toLocaleDateString("pt-BR", { 
                              day: '2-digit', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-semibold ${
                          ind.status === "Matriculado"
                            ? "bg-green-100 text-green-700"
                            : ind.status === "Em avaliação"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {ind.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100"
          >
            <p
              className="text-gray-600"
              style={{ fontFamily: 'var(--font-body)', fontSize: '16px' }}
            >
              Responsável não encontrado.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}