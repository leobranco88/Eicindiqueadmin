import { useState } from "react";
import { motion } from "motion/react";
import {
  Users, Trophy, Star, Crown, Rocket, ChevronDown, ChevronUp,
  ExternalLink, UserPlus, X, Loader2, Copy, CheckCircle2, Phone
} from "lucide-react";
import { useIndicacoes, type Nivel, type Responsavel } from "../../hooks/useIndicacoes";

const BASE_URL = "https://eicfidelidade.vercel.app/f";

function getCores(nivel: Nivel) {
  if (nivel === "ambassador") return { bg: "#EDE7F6", text: "#6B3FA0", border: "#C4B5FD" };
  if (nivel === "ouro")       return { bg: "#FEF9C3", text: "#92400E", border: "#FDE68A" };
  if (nivel === "prata")      return { bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" };
  if (nivel === "bronze")     return { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" };
  return { bg: "#F9FAFB", text: "#6B7280", border: "#E5E7EB" };
}

function getNivelIcon(nivel: Nivel) {
  if (nivel === "ambassador") return Crown;
  if (nivel === "ouro")       return Trophy;
  if (nivel === "prata")      return Star;
  if (nivel === "bronze")     return Star;
  return Rocket;
}

// ——— Modal Novo Responsável ———
function ModalNovoResponsavel({
  onClose,
  onCadastrar,
  cadastrando,
}: {
  onClose: () => void;
  onCadastrar: (d: { nome: string; whatsapp: string; nomeFilho: string }) => Promise<string>;
  cadastrando: boolean;
}) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [nomeFilho, setNomeFilho] = useState("");
  const [linkGerado, setLinkGerado] = useState("");
  const [copiado, setCopiado] = useState(false);

  const handleCadastrar = async () => {
    if (!nome.trim() || !whatsapp.trim() || !nomeFilho.trim()) return;
    const id = await onCadastrar({ nome: nome.trim(), whatsapp: whatsapp.trim(), nomeFilho: nomeFilho.trim() });
    setLinkGerado(`${BASE_URL}/${id}`);
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(linkGerado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#070738" }}>
            Novo Responsável
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {linkGerado ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "#EDE7F6" }}>
              <CheckCircle2 size={32} style={{ color: "#6B3FA0" }} />
            </div>
            <p className="font-semibold text-lg mb-1" style={{ color: "#070738", fontFamily: "var(--font-display)" }}>
              Responsável cadastrado!
            </p>
            <p className="text-sm text-gray-500 mb-6">Link exclusivo gerado com sucesso.</p>

            <div className="rounded-xl p-4 mb-4 text-left" style={{ backgroundColor: "#F8F6FF", border: "1px solid #C4B5FD" }}>
              <p className="text-xs text-gray-500 mb-1">Link do portal</p>
              <p className="text-sm font-mono break-all" style={{ color: "#6B3FA0" }}>{linkGerado}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={copiarLink}
                className="flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm transition-all"
                style={{ backgroundColor: copiado ? "#D1FAE5" : "#EDE7F6", color: copiado ? "#065F46" : "#6B3FA0" }}>
                {copiado ? <><CheckCircle2 size={16} /> Copiado!</> : <><Copy size={16} /> Copiar link</>}
              </button>
              <button onClick={onClose}
                className="flex-1 py-3 rounded-xl font-semibold text-sm text-white"
                style={{ backgroundColor: "#FF5C00" }}>
                Fechar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#070738", fontFamily: "var(--font-body)" }}>
                  Nome do responsável
                </label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Gabriela Silva"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 text-sm"
                  style={{ fontFamily: "var(--font-body)" }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#070738", fontFamily: "var(--font-body)" }}>
                  WhatsApp
                </label>
                <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 text-sm"
                  style={{ fontFamily: "var(--font-body)" }} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#070738", fontFamily: "var(--font-body)" }}>
                  Nome do filho(a)
                </label>
                <input type="text" value={nomeFilho} onChange={(e) => setNomeFilho(e.target.value)}
                  placeholder="Ex: Noah"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 text-sm"
                  style={{ fontFamily: "var(--font-body)" }} />
              </div>
            </div>

            <button onClick={handleCadastrar}
              disabled={cadastrando || !nome.trim() || !whatsapp.trim() || !nomeFilho.trim()}
              className="w-full py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: "#6B3FA0", fontFamily: "var(--font-body)" }}>
              {cadastrando ? <Loader2 size={20} className="animate-spin" /> : <><UserPlus size={20} /> Cadastrar e gerar link</>}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ——— Card do Responsável ———
function ResponsavelCard({
  resp,
  indicacoesDoResp,
}: {
  resp: Responsavel & { totalIndicacoes: number; matriculados: number; nivel: Nivel };
  indicacoesDoResp: ReturnType<typeof useIndicacoes>["indicacoes"];
}) {
  const [expandido, setExpandido] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const cores = getCores(resp.nivel);
  const Icon = getNivelIcon(resp.nivel);
  const link = `${BASE_URL}/${resp.responsavelId}`;

  const copiarLink = () => {
    navigator.clipboard.writeText(link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const getStatusColor = (status: string) => {
    if (status === "Matriculado") return { bg: "#D1FAE5", text: "#065F46" };
    if (status === "Em avaliação") return { bg: "#FEF3C7", text: "#92400E" };
    if (status === "Aguardando confirmação") return { bg: "#DBEAFE", text: "#1E40AF" };
    return { bg: "#F3F4F6", text: "#6B7280" };
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border p-5 shadow-sm" style={{ borderColor: cores.border }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cores.bg }}>
            <Icon size={20} style={{ color: cores.text }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate" style={{ color: "#070738", fontFamily: "var(--font-body)", fontSize: "15px" }}>
              {resp.nome}
            </p>
            <p className="text-xs text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
              Filho(a): {resp.nomeFilho}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize" style={{ backgroundColor: cores.bg, color: cores.text }}>
            {resp.nivel}
          </span>
          <button onClick={() => setExpandido(!expandido)} className="p-1 rounded-lg hover:bg-gray-100">
            {expandido ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Stats rápidos */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="rounded-lg p-2 text-center" style={{ backgroundColor: "#F8F6FF" }}>
          <p className="font-bold text-sm" style={{ color: "#070738", fontFamily: "var(--font-body)" }}>{resp.totalIndicacoes}</p>
          <p className="text-xs text-gray-500">Indicações</p>
        </div>
        <div className="rounded-lg p-2 text-center" style={{ backgroundColor: "#F0FDF4" }}>
          <p className="font-bold text-sm" style={{ color: "#065F46", fontFamily: "var(--font-body)" }}>{resp.matriculados}</p>
          <p className="text-xs text-gray-500">Matriculados</p>
        </div>
        <div className="rounded-lg p-2 text-center" style={{ backgroundColor: "#FFF3ED" }}>
          <p className="font-bold text-sm" style={{ color: "#FF5C00", fontFamily: "var(--font-body)" }}>
            {resp.nivel === "bronze" ? "R$50" : resp.nivel === "prata" ? "R$100" : resp.nivel === "ambassador" ? `R$${(resp.matriculados - 3) * 50}` : resp.nivel === "ouro" ? "1 mês" : "—"}
          </p>
          <p className="text-xs text-gray-500">Benefício</p>
        </div>
      </div>

      {/* Expandido */}
      {expandido && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          {/* Link + ações */}
          <div className="rounded-lg p-3" style={{ backgroundColor: "#F8F6FF" }}>
            <p className="text-xs text-gray-500 mb-2" style={{ fontFamily: "var(--font-body)" }}>Link do portal</p>
            <p className="text-xs font-mono text-purple-600 mb-3 break-all">{link}</p>
            <div className="flex gap-2">
              <button onClick={copiarLink}
                className="flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                style={{ backgroundColor: copiado ? "#D1FAE5" : "#EDE7F6", color: copiado ? "#065F46" : "#6B3FA0" }}>
                {copiado ? <><CheckCircle2 size={14} /> Copiado</> : <><Copy size={14} /> Copiar link</>}
              </button>
              <a href={link} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                style={{ backgroundColor: "#070738", color: "white" }}>
                <ExternalLink size={14} /> Abrir portal
              </a>
              <a href={`https://wa.me/55${resp.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center"
                style={{ backgroundColor: "#22C55E", color: "white" }}>
                <Phone size={14} />
              </a>
            </div>
          </div>

          {/* Indicações */}
          {indicacoesDoResp.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-2">Nenhuma indicação ainda.</p>
          ) : (
            <div className="space-y-2">
              {indicacoesDoResp.map((ind) => {
                const sc = getStatusColor(ind.status);
                return (
                  <div key={ind.id} className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ backgroundColor: "#F9FAFB" }}>
                    <p className="text-sm" style={{ color: "#070738", fontFamily: "var(--font-body)" }}>{ind.nomeIndicado}</p>
                    <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ backgroundColor: sc.bg, color: sc.text }}>
                      {ind.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ——— Página Principal ———
export function Indicacoes() {
  const { indicacoes, responsaveis, loading, cadastrando, cadastrarResponsavel, ranking } = useIndicacoes();
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState("");

  const rankingFiltrado = (ranking ?? []).filter((r) =>
    r.nome.toLowerCase().includes(busca.toLowerCase()) ||
    r.nomeFilho.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6FF] flex items-center justify-center">
        <p className="text-gray-400" style={{ fontFamily: "var(--font-body)" }}>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6FF]">
      <div className="max-w-screen-2xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[#070738]" style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 700 }}>
              Indicações
            </h1>
            <p className="text-gray-500 mt-1" style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>
              {responsaveis.length} responsável{responsaveis.length !== 1 ? "is" : ""} cadastrado{responsaveis.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button onClick={() => setModalAberto(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: "#6B3FA0", fontFamily: "var(--font-body)" }}>
            <UserPlus size={18} /> Novo Responsável
          </button>
        </div>

        {/* Busca */}
        <div className="mb-6">
          <input type="text" value={busca} onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome do responsável ou filho..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-purple-400 text-sm"
            style={{ fontFamily: "var(--font-body)" }} />
        </div>

        {/* Stats resumo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Responsáveis", value: responsaveis.length, color: "#6B3FA0", bg: "#EDE7F6" },
            { label: "Indicações", value: indicacoes.length, color: "#FF5C00", bg: "#FFF3ED" },
            { label: "Matriculados", value: indicacoes.filter(i => i.status === "Matriculado").length, color: "#22C55E", bg: "#F0FDF4" },
            { label: "Ambassadors", value: (ranking ?? []).filter(r => r.nivel === "ambassador").length, color: "#F5A800", bg: "#FEF9C3" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 flex items-center gap-3" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                <Users size={20} style={{ color: s.color }} />
              </div>
              <div>
                <p className="font-bold text-lg" style={{ color: "#070738", fontFamily: "var(--font-body)" }}>{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lista */}
        {rankingFiltrado.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <UserPlus size={40} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
              {busca ? "Nenhum resultado encontrado." : "Nenhum responsável cadastrado ainda."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {rankingFiltrado.map((resp) => (
              <ResponsavelCard
                key={resp.id}
                resp={resp}
                indicacoesDoResp={indicacoes.filter(i => i.responsavelId === resp.responsavelId)}
              />
            ))}
          </div>
        )}
      </div>

      {modalAberto && (
        <ModalNovoResponsavel
          onClose={() => setModalAberto(false)}
          onCadastrar={async (d) => {
            const id = await cadastrarResponsavel(d);
            return id;
          }}
          cadastrando={cadastrando}
        />
      )}
    </div>
  );
}
