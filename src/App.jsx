import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Zone0Prototype } from "./zones/zone0/Zone0Prototype";
import { Zone1Prototype } from "./zones/zone1/Zone1Prototype";
import { Zone2Prototype } from "./zones/zone2/Zone2Prototype";
import { Zone3Prototype } from "./zones/zone3/Zone3Prototype";
import { Zone4Prototype } from "./zones/zone4/Zone4Prototype";

export default function App() {
  return (
    <>
      <ThemeSwitcher />
      <Routes>
        <Route path="/" element={<Navigate to="/zone0/login" replace />} />
        <Route path="/zone0/*" element={<Zone0Prototype />} />
        <Route path="/zone1/*" element={<Zone1Prototype />} />
        <Route path="/zone2/*" element={<Zone2Prototype />} />
        <Route path="/zone3/*" element={<Zone3Prototype />} />
        <Route path="/zone4/*" element={<Zone4Prototype />} />
        <Route path="*" element={<Navigate to="/zone0/login" replace />} />
      </Routes>
    </>
  );
}
