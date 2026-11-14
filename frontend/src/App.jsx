
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Oficinas from "./pages/Oficinas/Oficinas.jsx";
import Agendamento from "./pages/Agendamento/Agendamento.jsx";
import MinhasReservas from "./pages/MinhasReservas/MinhasReservas.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Pagamento from "./pages/Pagamentos/Pagamento.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oficinas" element={<Oficinas />} />
          <Route path="/agendamento/:oficinaId" element={<Agendamento />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/minhas-reservas" element={<MinhasReservas />} />
          <Route path="/login" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
