import { Settings } from "lucide-react";
import { EmptyState } from "./EmptyState";

export function Configuracoes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EmptyState
        icon={Settings}
        title="Configurações"
        description="Configure as preferências do sistema, notificações e parâmetros do programa de indicações."
      />
    </div>
  );
}