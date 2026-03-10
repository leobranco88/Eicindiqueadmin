import { BarChart3 } from "lucide-react";
import { EmptyState } from "./EmptyState";

export function Relatorios() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EmptyState
        icon={BarChart3}
        title="Relatórios e Análises"
        description="Em breve você terá acesso a relatórios completos sobre o desempenho do programa de indicações."
      />
    </div>
  );
}