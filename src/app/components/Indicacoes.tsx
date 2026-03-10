import { Users } from "lucide-react";
import { EmptyState } from "./EmptyState";

export function Indicacoes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EmptyState
        icon={Users}
        title="Página de Indicações"
        description="Esta seção está em desenvolvimento. Em breve você poderá visualizar todas as indicações detalhadamente."
      />
    </div>
  );
}