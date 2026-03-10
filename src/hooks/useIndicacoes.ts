// src/hooks/useIndicacoes.ts
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export type StatusIndicacao =
  | "Aguardando contato"
  | "Em avaliação"
  | "Matriculado";

export interface Indicacao {
  id: string;
  nomeResponsavel: string;
  nomeIndicado: string;
  whatsappIndicado: string;
  status: StatusIndicacao;
  criadoEm: string;
  responsavelId: string;
}

// Calcula o nível de fidelidade baseado em matrículas confirmadas
export function calcularNivel(matriculados: number): {
  nivel: string;
  cor: string;
  proximoNivel: string | null;
  faltam: number;
  beneficio: string;
} {
  if (matriculados >= 4) {
    return {
      nivel: "Ambassador",
      cor: "#FF5C00",
      proximoNivel: null,
      faltam: 0,
      beneficio: "R$50 por matrícula acumulado",
    };
  } else if (matriculados === 3) {
    return {
      nivel: "Ouro",
      cor: "#F5A800",
      proximoNivel: "Ambassador",
      faltam: 1,
      beneficio: "1 mensalidade grátis (R$320)",
    };
  } else if (matriculados === 2) {
    return {
      nivel: "Prata",
      cor: "#9CA3AF",
      proximoNivel: "Ouro",
      faltam: 1,
      beneficio: "Badge + reconhecimento",
    };
  } else if (matriculados === 1) {
    return {
      nivel: "Bronze",
      cor: "#92400E",
      proximoNivel: "Prata",
      faltam: 1,
      beneficio: "Badge + reconhecimento",
    };
  } else {
    return {
      nivel: "Sem nível",
      cor: "#6B7280",
      proximoNivel: "Bronze",
      faltam: 1,
      beneficio: "—",
    };
  }
}

// Agrupa indicações por responsável e calcula nível
export function calcularRanking(indicacoes: Indicacao[]) {
  const mapa: Record<
    string,
    {
      responsavelId: string;
      nomeResponsavel: string;
      total: number;
      matriculados: number;
      emAvaliacao: number;
      aguardando: number;
      indicacoes: Indicacao[];
    }
  > = {};

  for (const ind of indicacoes) {
    if (!mapa[ind.responsavelId]) {
      mapa[ind.responsavelId] = {
        responsavelId: ind.responsavelId,
        nomeResponsavel: ind.nomeResponsavel,
        total: 0,
        matriculados: 0,
        emAvaliacao: 0,
        aguardando: 0,
        indicacoes: [],
      };
    }
    mapa[ind.responsavelId].total++;
    mapa[ind.responsavelId].indicacoes.push(ind);
    if (ind.status === "Matriculado") mapa[ind.responsavelId].matriculados++;
    if (ind.status === "Em avaliação") mapa[ind.responsavelId].emAvaliacao++;
    if (ind.status === "Aguardando contato") mapa[ind.responsavelId].aguardando++;
  }

  return Object.values(mapa).map((r) => ({
    ...r,
    ...calcularNivel(r.matriculados),
  }));
}

export function useIndicacoes() {
  const [indicacoes, setIndicacoes] = useState<Indicacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "indicacoes"),
      orderBy("criadoEm", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        criadoEm:
          doc.data().criadoEm?.toDate?.()?.toISOString() ??
          new Date().toISOString(),
      })) as Indicacao[];

      setIndicacoes(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const adicionarIndicacao = async (data: {
    nomeResponsavel: string;
    nomeIndicado: string;
    whatsappIndicado: string;
  }) => {
    const responsavelId = data.nomeResponsavel
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

    await addDoc(collection(db, "indicacoes"), {
      ...data,
      responsavelId,
      status: "Aguardando contato",
      criadoEm: serverTimestamp(),
    });
  };

  const atualizarStatus = async (id: string, status: StatusIndicacao) => {
    await updateDoc(doc(db, "indicacoes", id), { status });
  };

  return { indicacoes, loading, adicionarIndicacao, atualizarStatus };
}
