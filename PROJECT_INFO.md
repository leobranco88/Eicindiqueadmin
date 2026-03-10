# EIC - Dashboard Indique um Amigo

Dashboard administrativo para gerenciar o programa "Indique um Amigo" da EIC (Escola de Idiomas e Cultura) em Cotia/SP.

## 🎨 Identidade Visual

- **Marrom escuro**: `#573000` (primário)
- **Laranja**: `#EC5800` (ação/destaque)
- **Azul petróleo**: `#070738` (detalhes)
- **Cinza escuro**: `#3D3D3D` (texto)
- **Fundo**: `#F5F2EE` (bege claro quente)
- **Cards**: `#FFFFFF` (branco)

## 🔤 Tipografia

- **Display/Títulos**: Cormorant Garamond (serif elegante)
- **Corpo/UI**: Inter (sans-serif limpa)

## 📐 Layout

**Dashboard Layout** com:
- Top navigation horizontal
- Page header com título + ação
- Stats cards (4 KPIs)
- Barra de filtros
- Tabela principal (2/3 da largura)
- Sidebar com widgets (1/3 da largura)

## 🗂️ Estrutura de Componentes

```
/src/app/components/
├── TopNavigation.tsx     → Menu horizontal superior
├── PageHeader.tsx        → Cabeçalho de página
├── StatsCard.tsx         → Cards de estatísticas
├── ReferralModal.tsx     → Modal para nova indicação
├── Dashboard.tsx         → Página principal do dashboard
├── RecentActivity.tsx    → Widget de atividades recentes
├── PerformanceChart.tsx  → Gráfico de desempenho mensal
├── EmptyState.tsx        → Estado vazio para páginas
├── Indicacoes.tsx        → Página de indicações (placeholder)
├── Relatorios.tsx        → Página de relatórios (placeholder)
├── Configuracoes.tsx     → Página de configurações (placeholder)
├── NotFound.tsx          → Página 404
└── RootLayout.tsx        → Layout raiz com navegação
```

## 🚀 Funcionalidades

- ✅ Visualização de todas as indicações
- ✅ Filtros por status e busca
- ✅ Adicionar nova indicação via modal
- ✅ Atualizar status de indicação
- ✅ Dashboard com métricas em tempo real
- ✅ Gráfico de desempenho mensal
- ✅ Timeline de atividades recentes
- ✅ Design responsivo (mobile-first)
- ✅ Animações sutis com Motion
- ✅ Persistência local (localStorage)

## 💾 Estrutura de Dados

```typescript
interface Indicacao {
  id: string;
  nomeResponsavel: string;
  nomeIndicado: string;
  whatsappIndicado: string;
  status: "Aguardando contato" | "Em avaliação" | "Matriculado";
  criadoEm: string;
  responsavelId: string;
}
```

## 🔄 Rotas

- `/` - Dashboard principal
- `/indicacoes` - Lista de indicações (em desenvolvimento)
- `/relatorios` - Relatórios e análises (em desenvolvimento)
- `/configuracoes` - Configurações do sistema (em desenvolvimento)
- `*` - Página 404

## 🎯 Próximos Passos Sugeridos

- Integrar com Supabase para persistência real
- Implementar autenticação de usuários
- Adicionar página de relatórios com gráficos avançados
- Criar sistema de notificações
- Exportar dados para Excel/PDF
- Dashboard personalizado por responsável
