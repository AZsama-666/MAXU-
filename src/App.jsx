import { Navigate, Route, Routes } from "react-router-dom";
import { Zone0Prototype } from "./zones/zone0/Zone0Prototype";
import { Zone1Prototype } from "./zones/zone1/Zone1Prototype";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/zone0/login" replace />} />
      <Route path="/zone0/*" element={<Zone0Prototype />} />
      <Route path="/zone1/*" element={<Zone1Prototype />} />
      <Route path="*" element={<Navigate to="/zone0/login" replace />} />
    </Routes>
  );
}
