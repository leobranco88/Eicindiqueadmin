import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export type StatusResgate = "pendente" | "aprovado" | "pago" | "recusado";
export type TipoResgate = "pix" | "material_didatico";

export interface Resgate {
  id: string;
  responsavelId: string;
  nomeResponsavel: string;
  tipo: TipoResgate;
  valor: number;
  chavePix: string | null;
  status: StatusResgate;
  criadoEm: string;
  pagamentoEm: string | null;
  pagoEm: string | null;
}

export function useResgates() {
  const [resgates, setResgates] = useState<Resgate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "resgates"), orderBy("criadoEm", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        criadoEm: d.data().criadoEm?.toDate?.()?.toISOString() ?? new Date().toISOString(),
        pagamentoEm: d.data().pagamentoEm?.toDate?.()?.toISOString() ?? null,
        pagoEm: d.data().pagoEm?.toDate?.()?.toISOString() ?? null,
      })) as Resgate[];
      setResgates(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const aprovarResgate = async (id: string) => {
    await updateDoc(doc(db, "resgates", id), {
      status: "aprovado",
      pagamentoEm: serverTimestamp(),
    });
  };

  const recusarResgate = async (id: string) => {
    await updateDoc(doc(db, "resgates", id), {
      status: "recusado",
    });
  };

  const confirmarPagamento = async (id: string) => {
    await updateDoc(doc(db, "resgates", id), {
      status: "pago",
      pagoEm: serverTimestamp(),
    });
  };

  const pendentes = resgates.filter((r) => r.status === "pendente");
  const aprovados = resgates.filter((r) => r.status === "aprovado");
  const pagos = resgates.filter((r) => r.status === "pago");

  return { resgates, loading, pendentes, aprovados, pagos, aprovarResgate, recusarResgate, confirmarPagamento };
}
