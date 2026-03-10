import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Plus, TrendingUp, Users, CheckCircle, Clock, Search, Filter } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { StatsCard } from "./StatsCard";
import { ReferralModal } from "./ReferralModal";
import { RecentActivity } from "./RecentActivity";
import { PerformanceChart } from "./PerformanceChart";
import { LoyaltyCardPreview } from "./LoyaltyCardPreview";

interface Indicacao {
  id: string;
  nomeResponsavel: string;
  nomeIndicado: string;
  whatsappIndicado: string;
  status: "Aguardando contato" | "Em avaliação" | "Matriculado";
  criadoEm: string;
  responsavelId: string;
}

const MOCK_INDICACOES: Indicacao[] = [
  {
    id: "1",
    nomeResponsavel: "Maria Silva",
    nomeIndicado: "João Costa",
    whatsappIndicado: "(11) 98888-7777",
    status: "Matriculado",
    criadoEm: "2026-02-15T10:00:00.000Z",
    responsavelId: "maria-silva",
  },
  {
    id: "2",
    nomeResponsavel: "Maria Silva",
    nomeIndicado: "Ana Paula Oliveira",
    whatsappIndicado: "(11) 97777-6666",
    status: "Em avaliação",
    criadoEm: "2026-02-20T14:30:00.000Z",
    responsavelId: "maria-silva",
  },
  {
    id: "3",
    nomeResponsavel: "Carlos Santos",
    nomeIndicado: "Pedro Mendes",
    whatsappIndicado: "(11) 96666-5555",
    status: "Aguardando contato",
    criadoEm: "2026-03-05T09:15:00.000Z",
    responsavelId: "carlos-santos",
  },
  {
    id: "4",
    nomeResponsavel: "Julia Fernandes",
    nomeIndicado: "Beatriz Lima",
    whatsappIndicado: "(11) 95555-4444",
    status: "Matriculado",
    criadoEm: "2026-01-10T16:45:00.000Z",
    responsavelId: "julia-fernandes",
  },
  {
    id: "5",
    nomeResponsavel: "Roberto Alves",
    nomeIndicado: "Fernanda Rocha",
    whatsappIndicado: "(11) 94444-3333",
    status: "Em avaliação",
    criadoEm: "2026-03-01T11:20:00.000Z",
    responsavelId: "roberto-alves",
  },
];

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indicacoes, setIndicacoes] = useState<Indicacao[]>(() => {
    const stored = localStorage.getItem("indicacoes");
    return stored ? JSON.parse(stored) : MOCK_INDICACOES;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleAddReferral = (data: { nomeResponsavel: string; nomeIndicado: string; whatsappIndicado: string }) => {
    const novaIndicacao: Indicacao = {
      id: Date.now().toString(),
      ...data,
      status: "Aguardando contato",
      criadoEm: new Date().toISOString(),
      responsavelId: data.nomeResponsavel.toLowerCase().replace(/\s+/g, "-"),
    };
    
    const updated = [...indicacoes, novaIndicacao];
    setIndicacoes(updated);
    localStorage.setItem("indicacoes", JSON.stringify(updated));
  };

  const handleStatusChange = (id: string, newStatus: Indicacao["status"]) => {
    const updated = indicacoes.map(ind => 
      ind.id === id ? { ...ind, status: newStatus } : ind
    );
    setIndicacoes(updated);
    localStorage.setItem("indicacoes", JSON.stringify(updated));
  };

  // Filtrar indicações
  const filteredIndicacoes = useMemo(() => {
    return indicacoes.filter((ind) => {
      const matchesSearch = 
        ind.nomeIndicado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ind.nomeResponsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ind.whatsappIndicado.includes(searchTerm);
      
      const matchesStatus = statusFilter === "all" || ind.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [indicacoes, searchTerm, statusFilter]);

  // Calcular estatísticas
  const stats = useMemo(() => {
    const total = indicacoes.length;
    const aguardando = indicacoes.filter(i => i.status === "Aguardando contato").length;
    const emAvaliacao = indicacoes.filter(i => i.status === "Em avaliação").length;
    const matriculados = indicacoes.filter(i => i.status === "Matriculado").length;
    
    return { total, aguardando, emAvaliacao, matriculados };
  }, [indicacoes]);

  const getStatusBadge = (status: Indicacao["status"]) => {
    const styles = {
      "Aguardando contato": { bg: "#F3F4F6", text: "#6B7280", border: "#E5E7EB" },
      "Em avaliação": { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
      "Matriculado": { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0" },
    };
    
    const colors = styles[status];
    
    return (
      <span
        className="px-3 py-1 rounded-full text-xs font-semibold border"
        style={{ 
          fontFamily: 'var(--font-body)',
          backgroundColor: colors.bg,
          color: colors.text,
          borderColor: colors.border
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F6FF' }}>
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        {/* Page Header */}
        <PageHeader
          title="Programa Indique um Amigo"
          subtitle="Gerencie todas as indicações e acompanhe o desempenho"
          action={
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-white px-5 py-2.5 rounded-lg transition-all shadow-lg"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: '14px', 
                fontWeight: 600,
                backgroundColor: '#FF5C00',
                boxShadow: '0 10px 25px -5px rgba(255, 92, 0, 0.4)'
              }}
            >
              <Plus size={18} />
              Nova Indicação
            </motion.button>
          }
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total de Indicações"
            value={stats.total}
            icon={TrendingUp}
            color="#6366F1"
            trend={{ value: "12%", isPositive: true }}
            delay={0}
          />
          <StatsCard
            title="Aguardando Contato"
            value={stats.aguardando}
            icon={Clock}
            color="#6B7280"
            delay={0.1}
          />
          <StatsCard
            title="Em Avaliação"
            value={stats.emAvaliacao}
            icon={Users}
            color="#A78BFA"
            delay={0.2}
          />
          <StatsCard
            title="Matriculados"
            value={stats.matriculados}
            icon={CheckCircle}
            color="#10B981"
            trend={{ value: "8%", isPositive: true }}
            delay={0.3}
          />
        </div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}
              >
                <option value="all">Todos os status</option>
                <option value="Aguardando contato">Aguardando contato</option>
                <option value="Em avaliação">Em avaliação</option>
                <option value="Matriculado">Matriculado</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Table - 2 columns on large screens */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th
                        className="px-6 py-4 text-left text-gray-700"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}
                      >
                        Indicado
                      </th>
                      <th
                        className="px-6 py-4 text-left text-gray-700 hidden md:table-cell"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}
                      >
                        WhatsApp
                      </th>
                      <th
                        className="px-6 py-4 text-left text-gray-700 hidden xl:table-cell"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}
                      >
                        Responsável
                      </th>
                      <th
                        className="px-6 py-4 text-left text-gray-700 hidden sm:table-cell"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}
                      >
                        Data
                      </th>
                      <th
                        className="px-6 py-4 text-left text-gray-700"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIndicacoes.map((indicacao, index) => (
                      <motion.tr
                        key={indicacao.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index }}
                        className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors"
                      >
                        <td
                          className="px-6 py-4 text-gray-900"
                          style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500 }}
                        >
                          {indicacao.nomeIndicado}
                        </td>
                        <td
                          className="px-6 py-4 text-gray-600 hidden md:table-cell"
                          style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}
                        >
                          {indicacao.whatsappIndicado}
                        </td>
                        <td
                          className="px-6 py-4 text-gray-600 hidden xl:table-cell"
                          style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}
                        >
                          {indicacao.nomeResponsavel}
                        </td>
                        <td
                          className="px-6 py-4 text-gray-600 hidden sm:table-cell"
                          style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}
                        >
                          {new Date(indicacao.criadoEm).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(indicacao.status)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredIndicacoes.length === 0 && (
                <div className="text-center py-12">
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '15px' }}
                  >
                    Nenhuma indicação encontrada.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar - 1 column on large screens */}
          <div className="space-y-6">
            <RecentActivity />
            <PerformanceChart />
            <LoyaltyCardPreview />
          </div>
        </div>
      </div>

      {/* Modal */}
      <ReferralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReferral}
      />
    </div>
  );
}