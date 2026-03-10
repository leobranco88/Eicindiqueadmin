import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Dashboard } from "./components/Dashboard";
import { Indicacoes } from "./components/Indicacoes";
import { Relatorios } from "./components/Relatorios";
import { Configuracoes } from "./components/Configuracoes";
import { LoyaltyCardPage } from "./components/LoyaltyCardPage";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "indicacoes", Component: Indicacoes },
      { path: "relatorios", Component: Relatorios },
      { path: "configuracoes", Component: Configuracoes },
      { path: "*", Component: NotFound },
    ],
  },
  // Rota separada para o cartão fidelidade (sem layout do dashboard)
  {
    path: "/cartao/:id",
    Component: LoyaltyCardPage,
  },
]);