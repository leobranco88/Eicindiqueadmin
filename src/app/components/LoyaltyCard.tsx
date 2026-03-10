import { motion } from "motion/react";
import { Award, Users, TrendingUp, Gift, Heart, Sparkles } from "lucide-react";
import logoSvg from "../../imports/logo.svg";

interface LoyaltyCardProps {
  responsavelNome: string;
  totalIndicacoes: number;
  matriculados: number;
}

export function LoyaltyCard({ responsavelNome, totalIndicacoes, matriculados }: LoyaltyCardProps) {
  // Definir níveis com cores EIC
  const getNivel = (count: number) => {
    if (count >= 10) return { nome: "Ouro", cor: "#F5A800", icon: Award };      // Amarelo EIC
    if (count >= 5) return { nome: "Prata", cor: "#9CA3AF", icon: TrendingUp };
    return { nome: "Bronze", cor: "#FF5C00", icon: Users };                     // Laranja EIC
  };

  const nivel = getNivel(matriculados);
  const NivelIcon = nivel.icon;

  // Taxa de conversão
  const taxaConversao = totalIndicacoes > 0 
    ? Math.round((matriculados / totalIndicacoes) * 100) 
    : 0;

  // Progresso para próximo nível
  const getProgresso = (count: number) => {
    if (count >= 10) return 100;
    if (count >= 5) return ((count - 5) / 5) * 100;
    return (count / 5) * 100;
  };

  const progresso = getProgresso(matriculados);
  
  const proximoNivel = matriculados >= 10 ? "Máximo" : matriculados >= 5 ? "Ouro" : "Prata";
  const faltam = matriculados >= 10 ? 0 : matriculados >= 5 ? 10 - matriculados : 5 - matriculados;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
    >
      {/* Header com gradiente EIC oficial: Laranja → Roxo → Azul */}
      <div className="relative px-8 py-6 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5C00] via-[#6B3FA0] to-[#070738] opacity-5"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <img src={logoSvg.paths} alt="EIC" className="h-12" />
            
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: nivel.cor }}></div>
              <span className="text-[#070738]" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
                Nível {nivel.nome}
              </span>
            </div>
          </div>

          <div>
            <p className="text-[#3D3D3D] mb-1" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500 }}>
              Programa Indique um Amigo
            </p>
            <h2
              className="text-[#070738]"
              style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 600 }}
            >
              {responsavelNome}
            </h2>
          </div>
        </div>
      </div>

      {/* Frase Motivacional */}
      <div className="px-8 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 justify-center">
          <Heart size={22} className="text-[#6B3FA0] fill-[#6B3FA0]" />
          <p
            className="text-[#070738] text-center uppercase tracking-wide"
            style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700 }}
          >
            Quem aprende junto, cresce junto
          </p>
          <Heart size={22} className="text-[#6B3FA0] fill-[#6B3FA0]" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Total Indicações - Laranja EIC */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#FF5C00', boxShadow: '0 10px 25px -5px rgba(255, 92, 0, 0.3)' }}>
              <Users size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <div
              className="text-[#070738] mb-1"
              style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 600 }}
            >
              {totalIndicacoes}
            </div>
            <p className="text-[#3D3D3D]" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500 }}>
              Indicações
            </p>
          </div>

          {/* Matriculados - Roxo EIC */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#6B3FA0', boxShadow: '0 10px 25px -5px rgba(107, 63, 160, 0.3)' }}>
              <Award size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <div
              className="text-[#070738] mb-1"
              style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 600 }}
            >
              {matriculados}
            </div>
            <p className="text-[#3D3D3D]" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500 }}>
              Matriculados
            </p>
          </div>

          {/* Taxa de Conversão - Amarelo EIC */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#F5A800', boxShadow: '0 10px 25px -5px rgba(245, 168, 0, 0.3)' }}>
              <TrendingUp size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <div
              className="text-[#070738] mb-1"
              style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 600 }}
            >
              {taxaConversao}%
            </div>
            <p className="text-[#3D3D3D]" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500 }}>
              Conversão
            </p>
          </div>
        </div>
      </div>

      {/* Progresso */}
      <div className="px-8 pb-8">
        <div className="bg-[#F8F6FF] rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-[#6B3FA0]" />
            <p className="text-[#070738]" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600 }}>
              {matriculados >= 10 
                ? "Parabéns! Você atingiu o nível máximo!" 
                : `Faltam ${faltam} matriculado${faltam !== 1 ? 's' : ''} para o nível ${proximoNivel}`}
            </p>
          </div>
          
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progresso}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(to right, #FF5C00, #6B3FA0)' }}
            />
          </div>
          
          <div className="flex items-center justify-between gap-1 mt-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all`}
                style={{ 
                  background: i < matriculados 
                    ? 'linear-gradient(to right, #FF5C00, #6B3FA0)' 
                    : '#E5E7EB'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}