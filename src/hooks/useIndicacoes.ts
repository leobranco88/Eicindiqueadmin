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
  | "Aguardando confirmação"
  | "Aguardando contato"
  | "Em avaliação"
  | "Matriculado";

export interface Indicacao {
  id: string;
  nomeIndicado: string;
  whatsappIndicado: string;
  nomeResponsavel: string;
  responsavelId: string;
  status: StatusIndicacao;
  criadoEm: string;
  origem: "admin" | "pai";
}

export interface Responsavel {
  id: string;
  nome: string;
  whatsapp: string;
  nomeFilho: string;
  responsavelId: string;
  criadoEm: string;
}

export type Nivel = "iniciante" | "bronze" | "prata" | "ouro" | "ambassador";

export function gerarResponsavelId(nome: string): string {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function calcularNivel(matriculados: number): Nivel {
  if (matriculados >= 4) return "ambassador";
  if (matriculados >= 3) return "ouro";
  if (matriculados >= 2) return "prata";
  if (matriculados >= 1) return "bronze";
  return "iniciante";
}

export function calcularRanking(
  responsaveis: Responsavel[],
  indicacoes: Indicacao[]
): Array<Responsavel & { totalIndicacoes: number; matriculados: number; nivel: Nivel }> {
  return (responsaveis ?? [])
    .map((r) => {
      const inds = (indicacoes ?? []).filter((i) => i.responsavelId === r.responsavelId);
      const matriculados = inds.filter((i) => i.status === "Matriculado").length;
      return {
        ...r,
        totalIndicacoes: inds.length,
        matriculados,
        nivel: calcularNivel(matriculados),
      };
    })
    .sort((a, b) => b.matriculados - a.matriculados);
}

export function useIndicacoes() {
  const [indicacoes, setIndicacoes] = useState<Indicacao[]>([]);
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const [loadingIndicacoes, setLoadingIndicacoes] = useState(true);
  const [loadingResponsaveis, setLoadingResponsaveis] = useState(true);
  const [cadastrando, setCadastrando] = useState(false);

  useEffect(() => {
    const q1 = query(collection(db, "indicacoes"), orderBy("criadoEm", "desc"));
    const unsub1 = onSnapshot(q1, (snap) => {
      setIndicacoes(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          criadoEm: doc.data().criadoEm?.toDate?.()?.toISOString() ?? new Date().toISOString(),
        })) as Indicacao[]
      );
      setLoadingIndicacoes(false);
    });

    const q2 = query(collection(db, "responsaveis"), orderBy("criadoEm", "desc"));
    const unsub2 = onSnapshot(q2, (snap) => {
      setResponsaveis(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          criadoEm: doc.data().criadoEm?.toDate?.()?.toISOString() ?? new Date().toISOString(),
        })) as Responsavel[]
      );
      setLoadingResponsaveis(false);
    });

    return () => { unsub1(); unsub2(); };
  }, []);

  const cadastrarResponsavel = async (dados: { nome: string; whatsapp: string; nomeFilho: string }) => {
    setCadastrando(true);
    try {
      const responsavelId = gerarResponsavelId(dados.nome);
      await addDoc(collection(db, "responsaveis"), {
        nome: dados.nome,
        whatsapp: dados.whatsapp,
        nomeFilho: dados.nomeFilho,
        responsavelId,
        criadoEm: serverTimestamp(),
      });
      return responsavelId;
    } finally {
      setCadastrando(false);
    }
  };

  const adicionarIndicacao = async (dados: {
    nomeIndicado: string;
    whatsappIndicado: string;
    nomeResponsavel?: string;
    responsavelId?: string;
    status?: StatusIndicacao;
  }) => {
    await addDoc(collection(db, "indicacoes"), {
      nomeIndicado: dados.nomeIndicado,
      whatsappIndicado: dados.whatsappIndicado,
      nomeResponsavel: dados.nomeResponsavel ?? "",
      responsavelId: dados.responsavelId ?? "",
      status: dados.status ?? "Aguardando contato",
      origem: "admin",
      criadoEm: serverTimestamp(),
    });
  };

  const atualizarStatus = async (id: string, status: StatusIndicacao) => {
    await updateDoc(doc(db, "indicacoes", id), { status });
  };

  const loading = loadingIndicacoes || loadingResponsaveis;

  return {
    indicacoes: indicacoes ?? [],
    responsaveis: responsaveis ?? [],
    loading,
    cadastrando,
    cadastrarResponsavel,
    adicionarIndicacao,
    atualizarStatus,
    ranking: calcularRanking(responsaveis ?? [], indicacoes ?? []),
  };
}
