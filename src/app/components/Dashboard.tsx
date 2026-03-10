// src/components/Dashboard.tsx
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Plus, TrendingUp, Users, CheckCircle, Clock, Search, Filter } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { StatsCard } from "./StatsCard";
import { ReferralModal } from "./ReferralModal";
import { RecentActivity } from "./RecentActivity";
import { PerformanceChart } from "./PerformanceChart";
import { LoyaltyCardPreview } from "./LoyaltyCardPreview";
import { useIndicacoes, type StatusIndicacao } from "../../hooks/useIndicacoes";

export function Dashboard() {
  const { indicacoes, loading, adicionarIndicacao, atualizarStatus } = useIndicacoes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleAddReferral = async (data: {
    nomeResponsavel: string;
    nomeIndicado: string;
    whatsappIndicado: string;
  }) => {
    await adicionarIndicacao(data);
  };

  const handleStatusChange = async (id: string, newStatus: StatusIndicacao) => {
    await atualizarStatus(id, newStatus);
  };

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

  const stats = useMemo(() => ({
    total: indicacoes.length,
    aguardando: indicacoes.filter((i) => i.status === "Aguardando contato").length,
    emAvaliacao: indicacoes.filter((i) => i.status === "Em avaliação").length,
    matriculados: indicacoes.filter((i) => i.status === "Matriculado").length,
  }), [indicacoes]);

  const getStatusBadge = (status: StatusIndicacao) => {
    const styles = {
      "Aguardando contato": { bg: "#F3F4F6", text: "#6B7280", border: "#E5E7EB" },
      "Em avaliação": { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
      Matriculado: { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0" },
    };
    const colors = styles[status] ?? { bg: "#F3F4F6", text: "#6B7280", border: "#E5E7EB" };
    return (
      <span
        className="px-3 py-1 rounded-full text-xs font-semibold border"
        style={{
          fontFamily: "var(--font-body)",
          backgroundColor: colors.bg,
          color: colors.text,
          borderColor: colors.border,
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6FF" }}>
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
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
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 600,
                backgroundColor: "#FF5C00",
                boxShadow: "0 10px 25px -5px rgba(255, 92, 0, 0.4)",
              }}
            >
              <Plus size={18} />
              Nova Indicação
            </motion.button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard title="Total de Indicações" value={stats.total} icon={TrendingUp} color="#6B3FA0" trend={{ value: "12%", isPositive: true }} delay={0} />
          <StatsCard title="Aguardando Contato" value={stats.aguardando} icon={Clock} color="#6B7280" delay={0.1} />
          <StatsCard title="Em Avaliação" value={stats.emAvaliacao} icon={Users} color="#F5A800" delay={0.2} />
          <StatsCard title="Matriculados" value={stats.matriculados} icon={CheckCircle} color="#10B981" trend={{ value: "8%", isPositive: true }} delay={0.3} />
        </div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}
              >
                <option value="all">Todos os status</option>
                <option value="Aguardando contato">Aguardando contato</option>
                <option value="Em avaliação">Em avaliação</option>
                <option value="Matriculado">Matriculado</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tabela + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {loading ? (
                <div className="text-center py-12 text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
                  Carregando indicações...
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {["Indicado", "WhatsApp", "Responsável", "Data", "Status", "Ação"].map((h) => (
                          <th
                            key={h}
                            className="px-6 py-4 text-left text-gray-700"
                            style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600 }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIndicacoes.map((indicacao, index) => (
                        <motion.tr
                          key={indicacao.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * index }}
                          className="border-b border-gray-100 hover:bg-purple-50/30 transition-colors"
                        >
                          <td className="px-6 py-4 text-gray-900" style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 500 }}>
                            {indicacao.nomeIndicado}
                          </td>
                          <td className="px-6 py-4 text-gray-600" style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>
                            {indicacao.whatsappIndicado}
                          </td>
                          <td className="px-6 py-4 text-gray-600" style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>
                            {indicacao.nomeResponsavel}
                          </td>
                          <td className="px-6 py-4 text-gray-600" style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>
                            {new Date(indicacao.criadoEm).toLocaleDateString("pt-BR")}
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(indicacao.status)}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={indicacao.status}
                              onChange={(e) => handleStatusChange(indicacao.id, e.target.value as StatusIndicacao)}
                              className="text-xs px-2 py-1 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-400 transition-all"
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              <option value="Aguardando contato">Aguardando contato</option>
                              <option value="Em avaliação">Em avaliação</option>
                              <option value="Matriculado">Matriculado</option>
                            </select>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredIndicacoes.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-400" style={{ fontFamily: "var(--font-body)", fontSize: "15px" }}>
                        Nenhuma indicação encontrada.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          <div className="space-y-6">
            <RecentActivity />
            <PerformanceChart />
            <LoyaltyCardPreview />
          </div>
        </div>
      </div>

      <ReferralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReferral}
      />
    </div>
  );
}
