// src/app/App.tsx
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { FidelityPage } from "./components/FidelityPage";

function NotFound() {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#F8F6FF" }}>
      <div className="text-center">
        <p style={{ color: "#070738", fontFamily: "DM Sans, sans-serif", fontSize: 18, fontWeight: 600 }}>
          Link não encontrado
        </p>
        <p style={{ color: "#6B7280", fontFamily: "DM Sans, sans-serif", fontSize: 14, marginTop: 8 }}>
          Verifique o link enviado pela EIC.
        </p>
      </div>
    </div>
  );
}

function FidelidadeRoute() {
  const { responsavelId } = useParams<{ responsavelId: string }>();
  return <FidelityPage responsavelId={responsavelId ?? ""} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/f/:responsavelId" element={<FidelidadeRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
